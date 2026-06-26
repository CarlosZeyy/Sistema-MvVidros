const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { formatNumber } = require("./formater");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
    ],
    timeout: 120000, // Dá 2 minutos de paciência para o navegador abrir
    protocolTimeout: 300000, // Dá 5 minutos de tolerância para o WhatsApp carregar os contatos
  },
});

client.on("qr", (qrcodeText) => {
  qrcode.generate(qrcodeText);
});

client.on("ready", () => {
  console.log("O Robô da MV Vidros está online!");
});

app.post("/api/send-pdf", async (req, res) => {
  try {
    const tel = formatNumber(req.body.tel);

    if (!client.info || !client.info.wid) {
      console.log("Robô ainda não está autenticado ou pronto.");
      return res.status(503).json({
        error: "Robô não está pronto. Tente novamente em alguns segundos.",
      });
    }

    const pdf64Base = req.body.pdfBase64;

    const media = new MessageMedia(
      "application/pdf",
      pdf64Base,
      "orçamento.pdf",
    );

    await client.sendMessage(tel, media, {
      caption: `Olá ${req.body.name}, segue o orçamento em anexo. MV Vidros`,
    });

    res.status(200).json({
      message: "Enviado!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao enviar mensagem!",
    });
  }
});

client.initialize();

app.listen(3001, () => {
  console.log("Escutando na porta 3001");
});
