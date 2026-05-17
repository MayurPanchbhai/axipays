/** @format */

import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import DonutChart from "../components/DonutChart";
import { currencyDistribution } from "../utils/currencyFrequency";
import Header from "../components/Header";

export default function TotalSummaryCard() {
  const [loading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [error, setError] = useState(null);

  // fetching api for first 100 transaction
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://payment-assignment.onrender.com/transactions?page=1&limit=500",
      );

      const rawData = await res.json();
      setTotalTransactions(rawData.data);

      // console.log(totalTranscations[1]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // data
  const totalTransaction = totalTransactions.length;

  const successTransactions = totalTransactions.filter((payment) => {
    return payment.status === "success";
  });

  const successCount = successTransactions.length;
  console.log(successCount);

  const totalSuccessVolume = successTransactions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalFailedCount = totalTransactions.filter(
    (payment) => payment.status === "failed" || payment.status === "pending",
  ).length;

  const failCount = totalTransactions.filter(
    (payment) => payment.status === "failed",
  ).length;

  const pendingCount = totalTransactions.filter(
    (payment) => payment.status === "pending",
  ).length;

  console.log(successTransactions);

  //Transaction Status for donut chart
  const donutChartTransactionStatus = [
    { label: "Success", value: successCount, color: "#00FF00" },
    { label: "Failed", value: failCount, color: "#FF0000" },
    { label: "Pending", value: pendingCount, color: "#FFFF00" },
  ];

  // currency distrubution for successful payment
  const currencyFrequency = currencyDistribution(successTransactions);
  console.log(currencyFrequency);

  // currency distrubution for donut chart

  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  //
  const arrayForCurrency = [];

  // console.log(randomColor());

  for (let key in currencyFrequency) {
    arrayForCurrency.push({
      label: key,
      value: currencyFrequency[key],
      color: randomColor(),
    });
  }

  console.log(arrayForCurrency);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {error && (
          <div
            style={{
              color: "red",
              border: "1px solid red",
              padding: "10px",
              marginBottom: "10px",
            }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-4 text-gray-600 font-medium">
          Fetching transactions...
        </p>
      </div>
    );
  }
  return (
    <>
      <Header Link1="/" Link2="/history" />
      <div className="w-full mt-5 flex flex-col items-center lg:flex-row lg:justify-around ">
        {/* <div> */}
        <DonutChart
          title="Transaction Status"
          chartData={donutChartTransactionStatus}
          graphtext="Total Transactions"
        />

        <DonutChart
          title="Currency Distribution"
          chartData={arrayForCurrency}
          graphtext="Total Successful  Transactions"
        />
        {/* </div> */}
      </div>
      {/* <DonutChart {} />
      <DonutChart {} /> */}
      <div className="w-full mt-5 px-5">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Summary cards
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Transactions"
            value={totalTransaction}
            color="text-gray-800"
          />

          <SummaryCard
            title="Total Success Volume"
            value={totalSuccessVolume.toFixed(2)}
            color="text-green-600"
          />
          <SummaryCard
            title="Total Success Count"
            value={successCount}
            color="text-blue-500"
          />

          <SummaryCard
            title="Total Failed Count "
            value={totalFailedCount}
            color="text-red-600"
          />
        </div>
      </div>
    </>
  );
}
