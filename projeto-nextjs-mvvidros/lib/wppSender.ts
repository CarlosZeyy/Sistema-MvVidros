export async function sendWhatsAppBudget(
  clientTel: string,
  clientName: string,
  pdfBuffer: Buffer,
) {
  const pdfBase64 = pdfBuffer.toString("base64");

  const wppApiBody = {
    tel: clientTel,
    name: clientName,
    pdfBase64: pdfBase64,
  };

  await fetch(process.env.WHATSAPP_API_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wppApiBody),
  });
}
