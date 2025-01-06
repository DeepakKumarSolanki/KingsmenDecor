// import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "0-1 Years", value: 10 },
  { name: "2-3 Years", value: 25 },
  { name: "4-5 Years", value: 15 },
  { name: "6+ Years", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomizedTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded-md shadow-md">
        <p className="text-sm font-bold text-gray-700">
          {`${payload[0].name}: ${payload[0].value} Employees`}
        </p>
      </div>
    );
  }
  return null;
};

const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {`${data[index].name}`}
    </text>
  );
};

const ClearTextPieChart = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="inline-block"> {/* Apply the animation */}
        <PieChart width={400} height={400}>
          <Pie
          className="animate-rotateChart"
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={<CustomizedLabel />}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomizedTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
};

export default ClearTextPieChart;
