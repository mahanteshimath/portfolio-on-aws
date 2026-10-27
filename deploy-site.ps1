# Publishes index.html + assets/ to Amplify Hosting (manual deployment) and
# applies customHttp.yml as the app's custom headers.
# Usage: ./deploy-site.ps1 [-Profile hackathon]
param(
  [string]$Profile = "hackathon",
  [string]$Region = "us-east-1",
  [string]$AppId = "d1931ionu4gntw",
  [string]$Branch = "main"
)
$ErrorActionPreference = "Stop"
$env:AWS_PAGER = ""
$root = $PSScriptRoot
$zip = Join-Path $env:TEMP "portfolio-site.zip"

# Python's zipfile writes forward-slash paths, which Amplify requires
python -c @"
import os, sys, zipfile
root, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(os.path.join(root, 'index.html'), 'index.html')
    for base, _, files in os.walk(os.path.join(root, 'assets')):
        for f in files:
            p = os.path.join(base, f)
            z.write(p, os.path.relpath(p, root).replace(os.sep, '/'))
print(f"zipped {len(z.namelist())} files")
"@ $root $zip

aws amplify update-app --app-id $AppId --custom-headers (Get-Content -Raw (Join-Path $root "customHttp.yml")) `
  --profile $Profile --region $Region --query "app.appId" --output text

$dep = aws amplify create-deployment --app-id $AppId --branch-name $Branch --profile $Profile --region $Region | ConvertFrom-Json
curl.exe -s -f -X PUT -H "Content-Type: application/zip" --upload-file $zip $dep.zipUploadUrl
if ($LASTEXITCODE -ne 0) { throw "zip upload failed" }

aws amplify start-deployment --app-id $AppId --branch-name $Branch --job-id $dep.jobId `
  --profile $Profile --region $Region --query "jobSummary.status" --output text

do {
  Start-Sleep -Seconds 5
  $status = aws amplify get-job --app-id $AppId --branch-name $Branch --job-id $dep.jobId `
    --profile $Profile --region $Region --query "job.summary.status" --output text
} while ($status -in @("PENDING", "PROVISIONING", "RUNNING"))
"Job $($dep.jobId): $status"
