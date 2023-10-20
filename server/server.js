const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });

  try {
    const page = await browser.newPage();

    await page.goto(process.env.WEB_PAGE_TO_PDF_URL, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('#chart-class-name');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Report.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF: ' + error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
