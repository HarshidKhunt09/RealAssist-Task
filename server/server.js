require('dotenv').config();
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
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(process.env.WEB_PAGE_TO_PDF_URL);

    await page.evaluate(async () => {
      const fontToWaitFor = 'Poppins';

      const waitForFont = () => {
        return new Promise((resolve) => {
          const body = document.querySelector('body');
          const testElement = document.createElement('div');
          testElement.style.fontFamily = fontToWaitFor;
          testElement.style.position = 'absolute';
          testElement.style.visibility = 'hidden';
          testElement.textContent = 'Test text';
          body.appendChild(testElement);

          const fontIsLoaded =
            window.getComputedStyle(testElement).fontFamily === fontToWaitFor;

          if (fontIsLoaded) {
            resolve();
          } else {
            setTimeout(waitForFont, 100);
          }
        });
      };

      await waitForFont();
    });

    await page.waitForSelector('#chart-class-name');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 0.95,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Report.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
