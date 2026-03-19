import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const manualDir = path.resolve(process.cwd(), 'docs', 'manual-administrador');
const markdownPath = path.join(manualDir, 'Manual-Administrador.md');
const pdfPath = path.join(manualDir, 'Manual-Administrador-Corporativo.pdf');
const fallbackPdfPath = path.join(manualDir, 'Manual-Administrador.pdf');
const logoPath = path.resolve(process.cwd(), 'public', 'logo-academy.png');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  return html;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mimeTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function fileToDataUri(filePath) {
  const buffer = await fs.readFile(filePath);
  const mime = mimeTypeFor(filePath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

async function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  const toc = [];
  let paragraph = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType) {
      return;
    }

    html.push(`</${listType}>`);
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      flushParagraph();
      flushList();
      continue;
    }

    if (line === '---') {
      flushParagraph();
      flushList();
      html.push('<hr />');
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      const [, alt, href] = imageMatch;
      const absolutePath = path.resolve(manualDir, href);
      const src = await fileToDataUri(absolutePath);
      html.push(
        `<figure class="manual-shot"><img src="${src}" alt="${escapeHtml(alt)}" /><figcaption>${escapeHtml(alt)}</figcaption></figure>`,
      );
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();
      const headingId = slugify(headingText);
      if (level === 2) {
        toc.push({ id: headingId, text: headingText });
      }
      html.push(`<h${level} id="${headingId}">${renderInline(headingText)}</h${level}>`);
      continue;
    }

    const unorderedMatch = line.match(/^- (.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
        html.push('<ul>');
      }
      html.push(`<li>${renderInline(unorderedMatch[1])}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
        html.push('<ol>');
      }
      html.push(`<li>${renderInline(orderedMatch[1])}</li>`);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return {
    content: html.join('\n'),
    toc,
  };
}

function buildToc(toc) {
  return `
    <section class="toc">
      <h2>Índice</h2>
      <div class="toc-grid">
        ${toc
          .map(
            (item, index) =>
              `<a href="#${item.id}" class="toc-item"><span class="toc-number">${index + 1}</span><span>${escapeHtml(item.text)}</span></a>`,
          )
          .join('')}
      </div>
    </section>
  `;
}

function buildHtml({ content, tocHtml, logoSrc }) {
  return `<!doctype html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>Manual de Usuario Administrador</title>
      <style>
        @page {
          size: A4;
          margin: 16mm 14mm 18mm 14mm;
        }
        :root {
          color-scheme: light;
          --ink: #1f2937;
          --muted: #667085;
          --line: #d7e0e8;
          --accent: #0f766e;
          --accent-strong: #115e59;
          --accent-soft: #ecfeff;
          --panel: #f8fafc;
          --gold: #d97706;
          --cover-top: #0f766e;
          --cover-bottom: #14532d;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: "Segoe UI", Arial, sans-serif;
          color: var(--ink);
          background: white;
          line-height: 1.6;
          font-size: 11pt;
        }
        main {
          max-width: 100%;
        }
        .cover {
          min-height: 250mm;
          padding: 18mm 16mm 20mm;
          color: white;
          background:
            radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 30%),
            linear-gradient(145deg, var(--cover-top), var(--cover-bottom));
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          page-break-after: always;
        }
        .cover::after {
          content: "";
          position: absolute;
          right: -60px;
          bottom: -60px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
        }
        .cover-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cover-brand img {
          height: 52px;
          width: auto;
          background: white;
          border-radius: 14px;
          padding: 8px 12px;
        }
        .cover-chip {
          display: inline-block;
          margin-top: 22mm;
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          font-size: 10pt;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.08);
        }
        .cover h1 {
          margin: 18mm 0 8mm;
          border: none;
          color: white;
          font-size: 31pt;
          line-height: 1.1;
          max-width: 560px;
          padding: 0;
        }
        .cover p {
          max-width: 560px;
          font-size: 13pt;
          color: rgba(255,255,255,0.88);
        }
        .cover-meta {
          margin-top: 20mm;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .cover-card {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .cover-card .k {
          display: block;
          margin-bottom: 4px;
          font-size: 8.5pt;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.72);
        }
        .cover-card .v {
          font-size: 11.5pt;
          font-weight: 600;
          color: white;
        }
        .toc {
          page-break-after: always;
          margin: 0 0 10pt;
          padding: 0;
        }
        .toc h2 {
          margin-top: 0;
        }
        .toc-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .toc-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: white;
          color: var(--ink);
          text-decoration: none;
        }
        .toc-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: var(--accent-strong);
          font-size: 9pt;
          font-weight: 700;
        }
        h1, h2, h3 {
          color: #0f172a;
          break-after: avoid-page;
        }
        h1 {
          font-size: 24pt;
          margin: 0 0 10pt;
          padding-bottom: 8pt;
          border-bottom: 2px solid var(--accent);
        }
        h2 {
          margin-top: 24pt;
          margin-bottom: 8pt;
          padding: 8pt 10pt;
          font-size: 16pt;
          background: linear-gradient(90deg, #f0fdfa, #f8fafc);
          border-left: 4px solid var(--accent);
          border-radius: 6px;
        }
        h3 {
          margin-top: 16pt;
          margin-bottom: 6pt;
          font-size: 13pt;
        }
        p, li { color: var(--ink); }
        p { margin: 0 0 9pt; }
        ul, ol { margin: 0 0 10pt 18pt; padding: 0; }
        li { margin: 0 0 5pt; }
        hr {
          border: none;
          border-top: 1px solid var(--line);
          margin: 18pt 0;
        }
        strong { color: #0f172a; }
        code {
          font-family: Consolas, "Courier New", monospace;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 1px 4px;
          border-radius: 4px;
          font-size: 10pt;
        }
        .manual-shot {
          margin: 14pt 0 18pt;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .manual-shot img {
          width: 100%;
          display: block;
          border: 1px solid var(--line);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          background: white;
        }
        .manual-shot figcaption {
          margin-top: 6pt;
          font-size: 9pt;
          color: var(--muted);
          text-align: center;
        }
        .lead {
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #c7d2fe;
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
          color: #334155;
          margin: 0 0 18pt;
        }
      </style>
    </head>
    <body>
      <main>
        <section class="cover">
          <div class="cover-brand">
            <img src="${logoSrc}" alt="Greenex Academy" />
          </div>
          <div class="cover-chip">Manual Corporativo</div>
          <h1>Manual de Usuario Administrador</h1>
          <p>Guía completa y explicativa para operar el panel de administración de Greenex Academy, con capturas reales del sistema y descripción práctica de cada módulo y acción principal.</p>
          <div class="cover-meta">
            <div class="cover-card">
              <span class="k">Sistema</span>
              <span class="v">Greenex Academy</span>
            </div>
            <div class="cover-card">
              <span class="k">Perfil</span>
              <span class="v">Administrador / Superadministrador</span>
            </div>
            <div class="cover-card">
              <span class="k">Fecha</span>
              <span class="v">19-03-2026</span>
            </div>
          </div>
        </section>
        ${tocHtml}
        <div class="lead">
          Este documento incluye capturas embebidas dentro del PDF para asegurar portabilidad completa del archivo al compartirlo por correo, Teams o almacenamiento documental.
        </div>
        ${content}
      </main>
    </body>
  </html>`;
}

async function main() {
  const markdown = await fs.readFile(markdownPath, 'utf8');
  const logoSrc = await fileToDataUri(logoPath);
  const { content, toc } = await markdownToHtml(markdown);
  const tocHtml = buildToc(toc);
  const html = buildHtml({ content, tocHtml, logoSrc });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForTimeout(1200);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '16mm',
        right: '14mm',
        bottom: '18mm',
        left: '14mm',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate:
        '<div style="width:100%;font-size:9px;color:#64748b;padding:0 10mm 6mm;text-align:right;">Greenex Academy · Manual Administrador · <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });

    await fs.copyFile(pdfPath, fallbackPdfPath);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
