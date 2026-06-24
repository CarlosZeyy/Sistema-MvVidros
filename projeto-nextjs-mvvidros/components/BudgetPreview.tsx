import type { BudgetPreviewProps } from "@/types/budgetPreviewProps";
import { formatTel } from "@/lib/formatter";

export default function BudgetPreview({
  formData,
  isLoading,
  onBack,
  onGenerate,
}: BudgetPreviewProps) {
  const currentDate = new Date().toLocaleDateString("pt-BR");

  const totalValue = formData.items.reduce((acc, item) => {
    return acc + item.productQuantity * item.productValue;
  }, 0);

  

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl bg-white shadow-2xl p-4 sm:p-8 md:p-12">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <h2 className="text-gray-950 font-semibold text-4xl md:text-6xl p-2 md:p-5">
            <span className="text-5xl md:text-7xl font-extrabold">MV</span>{" "}
            Vidros
          </h2>
          <div className="text-gray-800 text-sm md:text-2xl font-medium flex-1 text-center md:text-right">
            <p>
              Colocação de Vidros Temperados, Comum, Jateado, Box, Tampos e
              Vidros Coloridos
            </p>
            <p>Fechamento de Áreas</p>
          </div>
        </div>

        {/* Contato */}
        <div className="text-gray-950 font-semibold text-sm md:text-3xl flex flex-col md:flex-row mt-4 md:mt-6 justify-between items-center gap-2">
          <p>11 97058-2051</p>
          <p>mvvidrosmv@hotmail.com</p>
        </div>

        {/* Borda */}
        <div className="border-b border-gray-300 my-6"></div>

        {/* Orcamento */}
        <div className="text-gray-950 flex justify-center font-semibold text-2xl md:text-4xl mt-2 text-center">
          <h3>ORÇAMENTO COMERCIAL</h3>
        </div>

        {/* Dados do cliente */}
        <div className="text-gray-950 my-6 text-base md:text-2xl flex flex-col gap-2 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Data:</span> {currentDate}
          </p>
          <p>
            <span className="font-semibold">Nome:</span> {formData.client.name}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span>{" "}
            {formData.client.address}
          </p>
          <p>
            <span className="font-semibold">Cel:</span>{" "}
            {formatTel(formData.client.tel)}
          </p>
        </div>

        {/* Tabela com Scroll Responsivo */}
        <div className="overflow-x-auto w-full mt-8">
          <table className="w-full text-left border-collapse min-w-150">
            <thead className="text-gray-900 border-b-2 border-gray-300">
              <tr>
                <th className="pb-3 px-2 font-semibold">Qtd</th>

                <th className="pb-3 px-2 font-semibold">
                  Categoria do Produto
                </th>

                <th className="pb-3 px-2 font-semibold">
                  Descrição do Produto
                </th>

                <th className="pb-3 px-2 font-semibold">Preço Unit.</th>

                <th className="pb-3 px-2 font-semibold">Total</th>
              </tr>
            </thead>

            <tbody>
              {formData.items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  <td className="py-4 px-2">{item.productQuantity}</td>

                  <td className="py-4 px-2">{item.productCategory}</td>

                  <td className="py-4 px-2 font-medium">{item.productName}</td>

                  <td className="py-4 px-2">
                    R$ {item.productValue.toFixed(2)}
                  </td>

                  <td className="py-4 px-2">
                    R$ {(item.productQuantity * item.productValue).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="text-gray-900 border-t-2 border-gray-300">
              <tr>
                <td
                  colSpan={3}
                  className="py-4 px-2 font-bold text-right text-lg md:text-xl"
                >
                  Valor Total:
                </td>
                <td className="py-4 px-2 font-bold text-lg md:text-xl text-blue-600">
                  R$ {totalValue.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Botão de Voltar */}
        <div className="mt-10 flex justify-center md:justify-between">
          <button
            onClick={onBack}
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full md:w-auto"
          >
            Voltar e editar
          </button>

          <button
            disabled={isLoading}
            onClick={onGenerate}
            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-progress"
          >
            {isLoading
              ? "Gerando arquivo e enviando ao cliente..."
              : "Gerar PDF e enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
