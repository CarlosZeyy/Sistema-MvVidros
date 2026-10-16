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

  let response: Response;

  try {
    response = await fetch(process.env.WHATSAPP_API_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wppApiBody),
    });
  } catch {
    throw new Error("Não foi possível conectar ao robô do WhatsApp.");
  }

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(
      result?.message || result?.error || "Erro ao enviar pelo WhatsApp.",
    );
  }
}
