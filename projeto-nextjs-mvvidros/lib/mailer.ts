import nodemailer from "nodemailer";

export async function sendBudgetEmail(clientName:string, clientEmail: string, currentDate: string, pdfBuffer: Buffer) {
    const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: clientEmail || process.env.EMAIL_USER,
          subject: "Orçamento Comercial - MV Vidros",
          text: `Olá ${clientName}, segue em anexo o seu orçamento`,
    
          attachments: [
            {
              filename: `orçamento_${clientName}_${currentDate}.pdf`,
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ],
        };
    
        await transporter.sendMail(mailOptions);
}