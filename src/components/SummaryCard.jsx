/** @format */

export default function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white flex flex-col items-center shadow-2xl px-2 rounded-xl p-4 hover:shadow-lg transition">
      <p className="text-black text-sm">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
