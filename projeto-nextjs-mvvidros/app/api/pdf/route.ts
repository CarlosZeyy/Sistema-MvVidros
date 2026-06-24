import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Browser } from "puppeteer";
import { generateHTMLTemplate } from "@/lib/pdfTemplate";
import { sendBudgetEmail } from "@/lib/mailer";
import { sendWhatsAppBudget } from "@/lib/wppSender";

let browser: Browser;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const currentDate = new Date().toLocaleDateString("pt-BR");

    const htmlContent = generateHTMLTemplate(data, currentDate);

    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const pdfBuffer = Buffer.from(pdf);

    await sendBudgetEmail(
      data.client.name,
      data.client.email,
      currentDate,
      pdfBuffer,
    );
    await sendWhatsAppBudget(data.client.tel, data.client.name, pdfBuffer);

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error) {
    console.error("Erro ao receber dados do pdf! ", error);
    return NextResponse.json({ error: "Error!" }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
