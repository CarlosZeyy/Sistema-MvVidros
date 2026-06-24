# Usa uma versão do Node otimizada e robusta
FROM node:18

# Instala as dependências do sistema operacional necessárias para rodar o Puppeteer/Chromium do WhatsApp
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o resto do código (o seu index.js)
COPY . .

# Expõe a porta que o seu Express está escutando
EXPOSE 3001

# O comando para ligar o robô
CMD ["node", "index.js"]

# Forçando limpeza de cache V1