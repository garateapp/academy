import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.MANUAL_BASE_URL ?? 'https://academy.test';
const email = process.env.MANUAL_ADMIN_EMAIL ?? 'admin@admin.com';
const password = process.env.MANUAL_ADMIN_PASSWORD ?? '1';
const outputDir = path.resolve(process.cwd(), 'docs', 'manual-administrador', 'screenshots');

const pages = [
  { name: '01-login', path: '/login', fullPage: false },
  { name: '02-dashboard', path: '/dashboard', fullPage: false },
  { name: '03-usuarios-listado', path: '/admin/users', fullPage: false },
  { name: '04-usuario-detalle', path: '/admin/users/1', fullPage: false },
  { name: '05-roles-listado', path: '/admin/roles', fullPage: false },
  { name: '06-categorias-listado', path: '/admin/categories', fullPage: false },
  { name: '07-cursos-listado', path: '/courses', fullPage: false },
  { name: '08-curso-detalle', path: '/courses/4', fullPage: false },
  { name: '09-curso-editor-documento', path: '/courses/4/edit', fullPage: false },
  { name: '10-evaluaciones-listado', path: '/admin/assessments', fullPage: false },
  { name: '11-encuestas-listado', path: '/admin/surveys', fullPage: false },
  { name: '12-rutas-aprendizaje', path: '/admin/learning-paths', fullPage: false },
  { name: '13-certificados', path: '/admin/certificates', fullPage: false },
  { name: '14-plantillas-certificado', path: '/admin/certificate-templates', fullPage: false },
  { name: '15-reportes', path: '/admin/reports', fullPage: false },
  { name: '16-auditoria', path: '/admin/audit-logs', fullPage: false },
];

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function waitForStablePage(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1200);
}

async function capturePage(page, screenshot) {
  await page.goto(`${baseUrl}${screenshot.path}`, {
    waitUntil: 'domcontentloaded',
  });
  await waitForStablePage(page);

  if (screenshot.path === '/courses/4/edit') {
    await page.locator('text=Documento interactivo').first().waitFor({ timeout: 10000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 420));
    await page.waitForTimeout(800);
  }

  const targetPath = path.join(outputDir, `${screenshot.name}.png`);
  await page.screenshot({
    path: targetPath,
    fullPage: screenshot.fullPage,
  });
}

async function login(page) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await waitForStablePage(page);

  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL(/dashboard|courses|admin/i, { timeout: 20000 });
  await waitForStablePage(page);
}

async function main() {
  await ensureOutputDir();

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 1180 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  try {
    await capturePage(page, pages[0]);
    await login(page);

    for (const screenshot of pages.slice(1)) {
      await capturePage(page, screenshot);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
