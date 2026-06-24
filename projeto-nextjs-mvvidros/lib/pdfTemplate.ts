import { formatTel } from "./formatter";

export function generateHTMLTemplate(data: any, currentDate: string) {
  const totalValue = data.items.reduce((acc: number, item: any) => {
    return acc + item.productQuantity * item.productValue;
  }, 0);

  const tableRows = data.items
    .map(
      (item: any) => `
      <tr class="border-b border-gray-200 text-gray-800">
        <td class="py-4 px-2">${item.productQuantity}</td>
        <td class="py-4 px-2 font-medium">
          ${item.productName} 
          <span class="text-xs text-gray-500 font-normal block">${item.productCategory || ""}</span>
        </td>
        <td class="py-4 px-2">R$ ${item.productValue.toFixed(2)}</td>
        <td class="py-4 px-2">R$ ${(item.productQuantity * item.productValue).toFixed(2)}</td>
      </tr>
    `,
    )
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        /* Força a impressão das cores de fundo (como os fundos cinzas) e zera as margens do navegador */
        @page { margin: 0; }
        body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      </style>
    </head>
    <body class="bg-white flex justify-center w-full font-sans">
      <div class="w-full max-w-[210mm] min-h-[297mm] p-12">
        
        <div class="flex justify-between items-center gap-4 border-b border-gray-300 pb-6">
          <h2 class="text-gray-950 font-semibold text-5xl">
            <span class="text-6xl font-extrabold">MV</span> Vidros
          </h2>
          <div class="text-gray-800 text-sm font-medium text-right max-w-xs">
            <p>Colocação de Vidros Temperados, Comum, Jateado, Box, Tampos e Vidros Coloridos</p>
            <p>Fechamento de Áreas</p>
          </div>
        </div>

        <div class="text-gray-950 font-semibold text-lg flex justify-between items-center mt-6">
          <p>11 97058-2051</p>
          <p>mvvidrosmv@hotmail.com</p>
        </div>

        <div class="text-gray-950 text-center font-semibold text-3xl mt-8">
          <h3>ORÇAMENTO COMERCIAL</h3>
        </div>

        <div class="text-gray-950 mt-8 text-lg flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p><span class="font-semibold">Data:</span> ${currentDate}</p>
          <p><span class="font-semibold">Nome:</span> ${data.client.name}</p>
          <p><span class="font-semibold">Endereço:</span> ${data.client.address}</p>
          <p><span class="font-semibold">Cel:</span> ${formatTel(data.client.tel)}</p>
        </div>

        <div class="w-full mt-8">
          <table class="w-full text-left border-collapse">
            <thead class="text-gray-900 border-b-2 border-gray-300">
              <tr>
                <th class="pb-3 px-2 font-semibold">Qtd</th>
                <th class="pb-3 px-2 font-semibold">Descrição do Produto</th>
                <th class="pb-3 px-2 font-semibold">Preço Unit.</th>
                <th class="pb-3 px-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
            <tfoot class="text-gray-900 border-t-2 border-gray-300">
              <tr>
                <td colspan="3" class="py-4 px-2 font-bold text-right text-xl">Valor Total:</td>
                <td class="py-4 px-2 font-bold text-xl text-blue-600">R$ ${totalValue.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </body>
    </html>
    `;

  return htmlContent;
}