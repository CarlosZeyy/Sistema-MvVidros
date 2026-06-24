const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

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
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ],
        timeout: 120000,          // Dá 2 minutos de paciência para o navegador abrir
        protocolTimeout: 300000   // Dá 5 minutos de tolerância para o WhatsApp carregar os contatos
    }
});

client.on("qr", (qrcodeText) => {
  qrcode.generate(qrcodeText);
});

client.on("ready", () => {
  console.log("O Robô da MV Vidros está online!");
});

app.post("/api/send-pdf", async (req, res) => {
  try {
    let cleanNumber = req.body.tel.replace(/\D/g, "");

    // Se a pessoa digitou só 9 ou 8 números (esqueceu o DDD), o sistema injeta o 11 automaticamente.
    if (cleanNumber.length === 8 || cleanNumber.length === 9) {
      cleanNumber = "11" + cleanNumber;
    }

    // Se a pessoa por acaso já digitou o 55 no formulário, não concatenamos de novo.
    if (!cleanNumber.startsWith("55")) {
      cleanNumber = "55" + cleanNumber;
    }

    const tel = cleanNumber + "@c.us";

    const pdf64Base = req.body.pdfBase64;

    const media = new MessageMedia(
      "application/pdf",
      pdf64Base,
      "orçamento.pdf",
    );

    await client.sendMessage(tel, media, {
      caption: `Olá ${req.body.name}, segue o orçamento em anexo.`,
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
