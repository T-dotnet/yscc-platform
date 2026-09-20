import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "/Users/danielenicoletti/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(here, "../output/htlm");

const css = `
:root{--ink:#24343b;--muted:#5c7078;--green:#0f5b55;--line:#d8e2e0;--paper:#f6f9f8}
*{box-sizing:border-box}body{margin:0;color:var(--ink);background:#eef3f1;font:16px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1040px;margin:32px auto;padding:42px 54px 62px;background:#fff;box-shadow:0 8px 30px #173c3214}header{border-bottom:1px solid var(--line);padding-bottom:24px;margin-bottom:28px}h1{margin:0 0 8px;color:var(--green);font-size:clamp(2rem,5vw,3rem);line-height:1.1}h2{margin:34px 0 10px;color:var(--green);font-size:1.55rem}h3{margin:26px 0 8px;color:#276e67;font-size:1.2rem}h4{margin:20px 0 6px;color:#276e67}p{margin:0 0 14px}.meta{color:var(--muted);font-size:.95rem}table{width:100%;border-collapse:collapse;margin:14px 0 22px;font-size:.94rem}th,td{padding:10px 12px;border:1px solid var(--line);text-align:left;vertical-align:top}th{background:var(--green);color:#fff}tr:nth-child(even) td{background:#f7faf9}ul,ol{margin:8px 0 18px;padding-left:28px}li{padding-left:5px;margin-bottom:5px}pre{padding:16px;overflow:auto;background:#1f3532;color:#e9f3ee;border-radius:6px;font-size:.88rem;line-height:1.45}code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}blockquote{margin:16px 0;padding:10px 18px;border-left:4px solid var(--green);background:var(--paper);color:var(--muted)}a{color:var(--green)}hr{border:0;border-top:1px solid var(--line);margin:28px 0}@media(max-width:680px){body{background:#fff}main{margin:0;padding:26px 20px 44px;box-shadow:none}table{display:block;overflow-x:auto}th,td{min-width:150px}}@media print{body{background:#fff}main{max-width:none;margin:0;padding:0;box-shadow:none}h2,h3{break-after:avoid}table,pre{break-inside:avoid}}
`;

function localizeLinks(markdown) {
  return markdown
    .replaceAll("](../output/htlm/", "](./")
    .replaceAll("](../output/", "](../")
    .replaceAll("](../UX-Strategy-and-Requirements.md", "](UX-Strategy-and-Requirements.html")
    .replaceAll("](docs/", "](")
    .replace(/\]\(([^)]+)\.md(#[^)]+)?\)/g, "]($1.html$2)");
}

function render(sourceFile, targetFile = sourceFile.replace(/\.md$/, ".html")) {
  const source = fs.readFileSync(path.resolve(here, sourceFile), "utf8");
  const title = source.match(/^#\s+(.+)$/m)?.[1] ?? "YSCC documentation";
  const body = marked.parse(localizeLinks(source), { gfm: true, breaks: false });
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${css}</style></head><body><main>${body}</main></body></html>\n`;
  fs.writeFileSync(path.join(output, targetFile), html);
}

fs.mkdirSync(output, { recursive: true });
for (const file of fs.readdirSync(here).filter((file) => file.endsWith(".md")).sort()) render(file);
render("../UX-Strategy-and-Requirements.md", "UX-Strategy-and-Requirements.html");
