// import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EmployeeAgeDistribution = () => {
  // Chart data
  const chartData = [
    { age: 20, people: 3 },
    { age: 22, people: 2 },
    { age: 23, people: 4 },
    { age: 25, people: 1 },
    { age: 27, people: 3 },
  ];

  return (
    <div className="flex justify-center items-center w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis */}
          <XAxis
            dataKey="age"
            label={{
              value: "Age",
              position: "insideBottom",
              offset: -5,
              className: "text-sm fill-gray-500",
            }}
          />
          {/* Y-axis */}
          <YAxis
            label={{
              value: "Number of Employees",
              angle: -90,
              position: "insideLeft",
              className: "text-sm fill-gray-500",
            }}
          />
          {/* Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
            itemStyle={{ color: "#374151" }}
            labelStyle={{ color: "#6b7280" }}
          />
          {/* Spline (smooth line) */}
          <Line type="monotone" dataKey="people" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeAgeDistribution;
