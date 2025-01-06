import axios from "axios";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const EmployeeStatusDistribution = () => {
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getAllDetails`);
        const data = res.data.data;

        // Extract the relevant dates
        const employees = data.employees || [];
        const resignations = data.resignationDetails || [];
        const terminations = data.terminationDetails || [];

        // Helper function to calculate year ranges
        const getYearsRange = (joiningDate, currentYear) => {
          const joiningYear = new Date(joiningDate).getFullYear();
          const yearsOfService = currentYear - joiningYear;
          if (yearsOfService <= 1) return 0;
          if (yearsOfService <= 3) return 1;
          if (yearsOfService <= 5) return 2;
          return 3;
        };

        const currentYear = new Date().getFullYear();

        // Initialize data arrays
        const addedEmployees = [0, 0, 0, 0];
        const terminatedEmployees = [0, 0, 0, 0];
        const resignedEmployees = [0, 0, 0, 0];

        // Process employees
        employees.forEach((employee) => {
          if (employee.joiningDate) {
            const range = getYearsRange(employee.joiningDate, currentYear);
            addedEmployees[range]++;
          }
        });

        // Process resignations
        resignations.forEach((resignation) => {
          if (resignation.dateOfResignation) {
            const range = getYearsRange(resignation.dateOfResignation, currentYear);
            resignedEmployees[range]++;
          }
        });

        // Process terminations
        terminations.forEach((termination) => {
          if (termination.terminationDate) {
            const range = getYearsRange(termination.terminationDate, currentYear);
            terminatedEmployees[range]++;
          }
        });

        // Update chart data
        setChartSeries([
          { name: "Added Employees", data: addedEmployees },
          { name: "Terminated Employees", data: terminatedEmployees },
          { name: "Resigned", data: resignedEmployees },
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDetails();
  }, []);

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
    colors: ["#1c82c1", "#e63946", "#ffac1c"], // Blue for added, red for terminated, orange for resigned
  });

  return (
    <div className="max-w-lg mx-auto">
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
