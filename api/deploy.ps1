# Deploys the Ask API (Lambda function URL + DynamoDB limits) with CloudFormation.
# Usage: ./api/deploy.ps1 [-Profile hackathon] [-Region us-east-1]
# First deploy needs -Salt <random string>; later deploys keep the existing one.
param(
  [string]$Profile = "hackathon",
  [string]$Region = "us-east-1",
  [string]$Stack = "portfolio-ask",
  [string]$Bucket = "portfolio-ask-artifacts-686112930486",
  [string]$Salt
)
$ErrorActionPreference = "Stop"
$env:AWS_PAGER = ""
$here = $PSScriptRoot

node (Join-Path $here "build-knowledge.mjs")

$packaged = Join-Path $env:TEMP "ask-packaged.yaml"
aws cloudformation package --template-file (Join-Path $here "template.yaml") `
  --s3-bucket $Bucket --s3-prefix ask --output-template-file $packaged `
  --profile $Profile --region $Region | Out-Null

# Pass the model every time: CloudFormation otherwise reuses a stack's old values
$params = @("--parameter-overrides", "ModelId=us.amazon.nova-2-lite-v1:0", "FoundationModel=amazon.nova-2-lite-v1:0")
if ($Salt) { $params += "IpSalt=$Salt" }
aws cloudformation deploy --template-file $packaged --stack-name $Stack `
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --no-fail-on-empty-changeset `
  --profile $Profile --region $Region @params

aws cloudformation describe-stacks --stack-name $Stack --profile $Profile --region $Region `
  --query "Stacks[0].Outputs[?OutputKey=='AskUrl'].OutputValue" --output text
