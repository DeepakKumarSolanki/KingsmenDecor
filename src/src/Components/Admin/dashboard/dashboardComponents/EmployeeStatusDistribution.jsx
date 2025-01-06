import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const EmployeeStatusDistribution = () => {
  const [chartOptions] = useState({
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1500, // Duration of the animation in milliseconds
        animateGradually: {
          enabled: true,
          delay: 300, // Delay between connecting each dot
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500, // Animation speed for dynamic updates
        },
      },
    },
    stroke: {
      curve: "smooth", // Smooth spline
      width: 3,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: ["0-1 Years", "2-3 Years", "4-5 Years", "6+ Years"], // X-axis labels
      title: {
        text: "Years",
      },
    },
    yaxis: {
      title: {
        text: "Number of Employees",
      },
    },
    title: {
      text: "Employee Status Distribution",
      align: "center",
    },
    colors: ["#1c82c1", "#e63946"], // Blue for added, red for terminated
  });

  const [chartSeries, setChartSeries] = useState([]);

  // Trigger animation by dynamically updating series
  useEffect(() => {
    const initialData = [
      { name: "Added Employees", data: [0, 0, 0, 0] },
      { name: "Terminated Employees", data: [0, 0, 0, 0] },
    ]; // Start with empty data
    setChartSeries(initialData);

    // Simulate loading the data with a timeout
    setTimeout(() => {
      setChartSeries([
        { name: "Added Employees", data: [10, 25, 15, 8] }, // Blue Line
        { name: "Terminated Employees", data: [5, 10, 7, 3] }, // Red Line
      ]);
    }, 500); // Animation delay before updating data
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={400}
      />
    </div>
  );
};

export default EmployeeStatusDistribution;
