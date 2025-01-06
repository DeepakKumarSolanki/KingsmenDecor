// import React from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GenderEmployeeDistribution = () => {
  // Chart data: Tracking male and female hires per year
  console.log("gender distribution==============================")
  
  const chartData = [
    { year: 2020, male: 5, female: 2 },
    { year: 2021, male: 15, female: 13 },
    { year: 2022, male: 18, female: 17 },
    { year: 2023, male: 22, female: 20 },
    { year: 2024, male: 25, female: 22 },
  ];

  return (
    <div className="flex justify-center items-center w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis */}
          <XAxis
            dataKey="year"
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -5,
              className: "text-sm fill-gray-500",
            }}
            tick={{ fontSize: 12, fill: "#6b7280" }} // Tailwind gray-500
          />
          {/* Y-axis */}
          <YAxis
            label={{
              value: "Number of Employees Hired",
              angle: -90,
              position: "insideLeft",
              className: "text-sm fill-gray-500",
            }}
            tick={{ fontSize: 12, fill: "#6b7280" }} // Tailwind gray-500
          />
          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb", // Tailwind gray-50
              borderColor: "#e5e7eb", // Tailwind gray-200
            }}
            itemStyle={{ color: "#374151" }} // Tailwind gray-700
            labelStyle={{ color: "#6b7280" }} // Tailwind gray-500
          />
          {/* Legend */}
          <Legend />
          {/* Male Bar */}
          <Bar
            dataKey="male"
            fill="#4F46E5" // Tailwind indigo-500
            name="Male Employees"
            barSize={20}
          />
          {/* Female Bar */}
          <Bar
            dataKey="female"
            fill="#F472B6" // Tailwind pink-400
            name="Female Employees"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderEmployeeDistribution;
