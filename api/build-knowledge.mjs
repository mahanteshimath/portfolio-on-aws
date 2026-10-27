// Builds api/src/knowledge.txt from the visible text of index.html, so the
// Ask box can only answer from what the site itself says.
// Run: node api/build-knowledge.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");

const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));

const text = main
  .replace(/<svg[\s\S]*?<\/svg>/g, " ")
  .replace(/<button[\s\S]*?<\/button>/g, " ")
  .replace(/<(h[1-6]|p|li|tr|dt|figcaption|caption)\b[^>]*>/g, "\n")
  .replace(/<\/(td|th|dd)>/g, " | ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&#39;|&rsquo;|’/g, "'")
  .replace(/&ldquo;|&rdquo;|“|”/g, '"')
  .replace(/[ \t]+/g, " ")
  .split("\n")
  .map((l) => l.trim().replace(/\s*\|\s*$/, ""))
  .filter(Boolean)
  .join("\n");

const contact = [
  "Contact: email mahanteshimath@gmail.com",
  "LinkedIn: https://www.linkedin.com/in/mahantesh-hiremath/",
  "GitHub: https://github.com/mahanteshimath",
  "This site's source: https://github.com/mahanteshimath/portfolio-on-aws"
].join("\n");

const out = `${text}\n${contact}\n`;
writeFileSync(join(root, "api", "src", "knowledge.txt"), out);
console.log(`knowledge.txt: ${out.length} chars, ${out.split("\n").length} lines`);
