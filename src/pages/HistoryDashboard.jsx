/** @format */

import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import Header from "../components/Header";

export default function HistoryDashboard() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(10);

  function maskedNum(num) {
    let firstDigits = Array.from(String(num), Number).slice(0, 6).join("");
    let lastDigits = Array.from(String(num), Number).slice(-4).join("");
    let maskedMiddleDigit = "";
    let maskedMiddleDigitlength =
      num.length - firstDigits.length - lastDigits.length;

    for (let i = 0; i < maskedMiddleDigitlength; i++) {
      maskedMiddleDigit += "*";
    }

    return firstDigits + maskedMiddleDigit + lastDigits;
  }

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://payment-assignment.onrender.com/transactions?page=${page}&limit=${limit}`,
      );
      const data = await res.json();
      setTransactions(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    console.log("rerendered");
  }, [page]);

  // cards data
  const totalTransactions = transactions.length;
  console.log(transactions);

  const successTransactions = transactions.filter(
    (t) => t.status === "success",
  );

  const successCount = successTransactions.length;

  const failedCount = transactions.filter(
    (t) => t.status === "failed" || t.status === "pending",
  ).length;

  const successVolume = successTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Fetching transactions...
        </p>
      </div>
    );
  }
  return (
    <>
      <Header Link1="/" Link2="/dashboard" />
      <div className="min-h-screen bg-gray-100 p-4 w-full md:p-8">
        <div className="flex justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Summary cards
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Transactions"
            value={totalTransactions}
            color="text-gray-800"
          />

          <SummaryCard
            title="Total Success Count"
            value={successCount}
            color="text-green-600"
          />

          <SummaryCard
            title="Total Failed count"
            value={failedCount}
            color="text-red-500"
          />

          <SummaryCard
            title="Success Volume"
            value={`₹${successVolume.toFixed(2)}`}
            color="text-blue-600"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* <Card title="Total Transactions" value={} /> */}

          {/* <Card title="Success Count" value={} /> */}

          {/* <Card title="Failed + Pending" value={} /> */}

          {/* <Card title="Success Volume" value={`₹${successVolume.toFixed(2)}`} /> */}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Transaction History Table
        </h1>

        {/* TABLE CARD */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Card</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Expiry</th>
                  <th className="p-3 text-left">CVC</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Currency</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t, index) => (
                  <tr
                    key={t.orderId}
                    className={`border-t shadow  transition-all duration-100 hover:scale-100 hover:shadow-xl  ${index % 2 !== 0 ? "bg-gray-50" : ""}  cursor-pointer`}>
                    <td className="p-3">{t.cardHolderName}</td>
                    <td className="p-3">{maskedNum(t.cardNumber)}</td>
                    <td className="p-3">{t.email || "N/A"}</td>
                    <td className="p-3">
                      {String(t.expiryMonth).padStart(2, "0")} / {t.expiryYear}
                    </td>
                    <td className="p-3">***</td>
                    <td className="p-3 font-medium">
                      ₹{Number(t.amount).toFixed(2)}
                    </td>
                    <td className="p-3">{t.currency}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white lg:w-full text-xs font-semibold ${
                          t.status.toUpperCase() === "SUCCESS"
                            ? "bg-green-500"
                            : t.status.toUpperCase() === "FAILED"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW (cards instead of table) */}
          <div className="md:hidden p-4 space-y-4">
            {transactions.map((t) => (
              <div key={t.orderId} className="border rounded-lg p-4 shadow-sm">
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium mb-2">{t.orderId}</p>

                <p className="text-xs text-gray-500">Card</p>
                <p className="mb-2">{maskedNum(t.cardNumber)}</p>

                <p className="text-xs text-gray-500">Email</p>
                <p className="mb-2">{t.email || "N/A"}</p>

                <p className="text-xs text-gray-500">Expiry</p>
                <p className="mb-2">
                  {String(t.expiryMonth).padStart(2, "0")} / {t.expiryYear}
                </p>

                <p className="text-xs text-gray-500">Amount</p>
                <p className="mb-2 font-medium">
                  ₹{Number(t.amount).toFixed(2)} {t.currency}
                </p>

                <p className="text-xs text-gray-500">Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-xs ${
                    t.status.toUpperCase() === "SUCCESS"
                      ? "bg-green-500"
                      : t.status.toUpperCase() === "FAILED"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}>
                  {t.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => {
              setPage((p) => Math.max(p - 1, 1));
            }}
            class="before:ease rounded relative h-10 w-20 overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40">
            <span relative="relative z-10">Prev</span>
          </button>

          <span className="font-medium">Page {page}</span>

          <button
            onClick={() => {
              setPage((p) => p + 1);
            }}
            class="before:ease rounded relative h-10 w-20 overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40">
            <span relative="relative z-10">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ${index % 2 == 0 ? "bg-dark" : "bg-info"}

// const successTransactions = totalTransactions.filter(
//   (t) => t.status === "success",
// );

// const successCount = successTransactions.length;

// const failedCount = totalTransactions.filter(
//   (t) => t.status === "failed" || t.status === "pending",
// ).length;

// const successVolume = successTransactions.reduce(
//   (sum, t) => sum + Number(t.amount),
//   0,
// );
