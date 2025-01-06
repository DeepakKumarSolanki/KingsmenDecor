// import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch employee data
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:8080/fetchAllEmployees");
        console.log("Employee Data:", res.data.data);
        setEmployees(res.data.data || []); // Save fetched employees or fallback to empty array
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };

    fetchEmployee();
  }, []);

  useEffect(() => {
    // Process employees data to generate chartData
    const processChartData = () => {
      if (employees.length === 0) return;

      // Get the current year
      const currentYear = new Date().getFullYear();

      const ageWiseData = employees.reduce((acc, emp) => {
        if (!emp.dob) return acc; // Skip employees with no date of birth

        const birthYear = new Date(emp.dob).getFullYear(); // Extract year from dob
        const age = currentYear - birthYear; // Calculate age

        if (!acc[age]) {
          acc[age] = { age: age, people: 0 };
        }

        acc[age].people += 1; // Increment count for this age group

        return acc;
      }, {});

      // Convert age-wise data to an array
      const formattedData = Object.values(ageWiseData);

      // Sort by age in ascending order
      formattedData.sort((a, b) => a.age - b.age);

      setChartData(formattedData); // Update chartData state
      console.log("Chart Data:", formattedData);
    };

    processChartData();
  }, [employees]);


  return (
    <div className="flex justify-center items-center w-full lg:h-[350px] h-[250px]">
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
