/** @format */

import React from "react";

export const DonutChart = ({ title, chartData, graphtext }, centerValue) => {
  const text = title;
  const data = chartData;
  const innertext = graphtext;
  // Compute chart segment math
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let accumulatedPercentage = 0;
  const gradientSegments = data.map((item) => {
    const start = accumulatedPercentage;
    const percentage = (item.value / total) * 100;
    accumulatedPercentage += percentage;
    return `${item.color} ${start}% ${accumulatedPercentage}%`;
  });

  const chartStyle = {
    background: `conic-gradient(${gradientSegments.join(", ")})`,
  };

  const displayValue = centerValue || total.toLocaleString();

  return (
    <div className="flex flex-col items-center mt-5  gap-6 p-6 bg-white  rounded-2xl shadow-2xl lg:w-1/5 w-4/5">
      {/* Chart Visual */}
      <h1 className=" text-center text-sm  font-bold text-black uppercase tracking-widest mt-0.5">
        {text}
      </h1>
      <div
        className="relative flex h-48 w-48 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
        style={chartStyle}>
        {/* Inner Hole Mask */}
        <div className="absolute flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-inner">
          <span className=" text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            {displayValue}
          </span>
          <span className=" text-center text-xs font-bold text-white uppercase tracking-widest mt-0.5">
            {innertext}
          </span>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-[240px]">
        {data.map((item, index) => {
          const pct = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-600 dark:text-black truncate max-w-[80px]">
                {item.label}
              </span>
              <span className="ml-auto font-semibold text-slate-400 dark:text-black text-xs">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutChart;
