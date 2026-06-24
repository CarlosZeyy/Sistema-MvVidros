"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "@/types/schema";
import { useState } from "react";
import BudgetPreview from "./BudgetPreview";

type BudgetFormData = z.infer<typeof budgetSchema>;

export default function BudgetForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BudgetFormData | null>(null);

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.blob();

      const browser = URL.createObjectURL(result);

      window.open(browser);

      console.log("Dados enviados com sucesso!", result);
    } catch (error) {
      console.error("Erro ao enviar dados: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: BudgetFormData) => {
    setFormData(data);
    setIsPreview(true);
  };

  const onError = (errors: any) => {
    console.log("O formulário foi bloqueado! Veja os erros:", errors);
  };

  if (isPreview === true && formData) {
    return (
      <BudgetPreview
        formData={formData}
        isLoading={isLoading}
        onBack={() => setIsPreview(false)}
        onGenerate={handleGeneratePDF}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-8 w-full"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Novo Orçamento</h1>

      {/* SEÇÃO DO CLIENTE */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Dados do cliente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo: Nome */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">Nome:</label>
            <input
              {...register("client.name")}
              placeholder="Nome do cliente"
              className="px-3 py-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.client?.name?.message && (
              <p className="text-xs text-red-500">
                {errors.client?.name?.message}
              </p>
            )}
          </div>

          {/* Campo: Endereço */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">
              Endereço:
            </label>
            <input
              {...register("client.address")}
              placeholder="Endereço do cliente"
              className="px-3 py-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.client?.address?.message && (
              <p className="text-xs text-red-500">
                {errors.client?.address?.message}
              </p>
            )}
          </div>

          {/* Campo: Telefone */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">
              Telefone:
            </label>
            <input
              type="tel"
              {...register("client.tel")}
              placeholder="Telefone do cliente"
              className="px-3 py-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.client?.tel?.message && (
              <p className="text-xs text-red-500">
                {errors.client?.tel?.message}
              </p>
            )}
          </div>

          {/* Campo: Email */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              {...register("client.email")}
              placeholder="Email do cliente (Opcional)"
              className="px-3 py-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.client?.email?.message && (
              <p className="text-xs text-red-500">
                {errors.client?.email?.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SEÇÃO DOS ITENS DO ORÇAMENTO */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Itens do Orçamento
          </h2>
          <button
            type="button"
            onClick={() =>
              append({
                productName: "",
                productValue: 0,
                productQuantity: 1,
                productCategory: "",
              })
            }
            className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-medium hover:bg-blue-100 transition-colors cursor-pointer"
          >
            + Adicionar Produto
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row items-start md:items-end gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 relative group"
            >
              <div className="flex-1 flex flex-col gap-1 w-full">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto / Serviço
                </label>
                <input
                  {...register(`items.${index}.productName` as const)}
                  placeholder="Ex: Espelho 4mm Bisotê"
                  className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.items?.[index]?.productName && (
                  <p className="text-xs text-red-500">
                    {errors.items[index].productName?.message}
                  </p>
                )}
              </div>

              <div className="w-full md:w-32 flex flex-col gap-1">
                <label
                  htmlFor="category"
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Categoria
                </label>
                <select
                  {...register(`items.${index}.productCategory` as const)}
                  className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="Vidro">Vidro</option>
                  <option value="Alumínio">Alumínio</option>
                  <option value="Mão de Obra">Mão de Obra</option>
                  <option value="Ferragem">Ferragem</option>
                </select>
              </div>

              <div className="w-full md:w-32 flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`items.${index}.productValue` as const, {
                    valueAsNumber: true,
                  })}
                  placeholder="0.00"
                  className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.items?.[index]?.productValue && (
                  <p className="text-xs text-red-500">
                    {errors.items[index].productValue?.message}
                  </p>
                )}
              </div>

              <div className="w-full md:w-24 flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd
                </label>
                <input
                  type="number"
                  {...register(`items.${index}.productQuantity` as const, {
                    valueAsNumber: true,
                  })}
                  placeholder="1"
                  className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.items?.[index]?.productQuantity && (
                  <p className="text-xs text-red-500">
                    {errors.items[index].productQuantity?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full md:w-auto mt-2 md:mt-0 px-4 py-2 text-red-500 bg-red-50 rounded-md hover:bg-red-100 font-medium transition-colors cursor-pointer"
              >
                Remover
              </button>
            </div>
          ))}

          {fields.length === 0 && (
            <p className="text-center text-gray-400 py-4 text-sm">
              Nenhum item adicionado ainda.
            </p>
          )}
        </div>
      </section>

      {/* BOTÃO SUBMIT */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        Gerar Orçamento
      </button>
    </form>
  );
}
