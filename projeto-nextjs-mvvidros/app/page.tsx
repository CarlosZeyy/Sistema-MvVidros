import BudgetForm from "@/components/BudgetForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <BudgetForm />
      </div>
    </main>
  );
}
