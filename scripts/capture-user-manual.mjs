import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.MANUAL_BASE_URL ?? 'https://academy.test';
const email = process.env.MANUAL_USER_EMAIL ?? 'estudiante@demo.cl';
const password = process.env.MANUAL_USER_PASSWORD ?? '12345678';
const outputDir = path.resolve(process.cwd(), 'docs', 'manual-usuario', 'screenshots');

const pages = [
  { name: '01-login', path: '/login' },
  { name: '02-dashboard', path: '/dashboard' },
  { name: '03-cursos', path: '/courses' },
  { name: '04-curso-seguridad', path: '/courses/1' },
  { name: '05-modulo-video', path: '/modules/5' },
  { name: '06-curso-conflicto-interes', path: '/courses/4' },
  { name: '07-documento-interactivo', path: '/modules/11' },
  { name: '08-resultados-evaluacion', path: '/assessments/3/attempts/4/results' },
  { name: '09-mi-historial', path: '/my-history' },
  { name: '10-mis-encuestas', path: '/my-surveys' },
  { name: '11-mis-evaluaciones', path: '/my-assessments' },
  { name: '12-mis-certificados', path: '/my-certificates' },
];

async function ensureOutputDir() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function waitStable(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1400);
}

async function login(page) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await waitStable(page);
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForURL(/dashboard/i, { timeout: 20000 });
  await waitStable(page);
}

async function capturePage(page, screenshot) {
  await page.goto(`${baseUrl}${screenshot.path}`, { waitUntil: 'domcontentloaded' });
  await waitStable(page);

  if (screenshot.path === '/modules/11') {
    await page.evaluate(() => window.scrollTo(0, 280));
    await page.waitForTimeout(800);
  }

  if (screenshot.path === '/assessments/3/attempts/4/results') {
    await page.evaluate(() => window.scrollTo(0, 180));
    await page.waitForTimeout(800);
  }

  const target = path.join(outputDir, `${screenshot.name}.png`);
  await page.screenshot({
    path: target,
    fullPage: false,
  });
}

async function main() {
  await ensureOutputDir();

  const browser = await chromium.launch({ headless: true });
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
