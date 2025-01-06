
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { AiOutlineUser } from "react-icons/ai";

function PayslipOverview() {
  const users = [
    { name: "Preethi R F", id: "34567890" },
    { name: "John Doe", id: "12345678" },
    { name: "Jane Smith", id: "98765432" },
  ];


  ChartJS.register(ArcElement, Tooltip, Legend);

const pieChartData = {
  labels: ["Net Pay", "Gross Pay", "Deductions", "Work Days"],
  datasets: [
    {
      data: [224166, 216860, 7306, 30],
      backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      borderColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      borderWidth: 1,
    },
  ],
};

// Custom tooltip
const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #d1d5db",
  borderRadius: "5px",
  padding: "10px",
  fontSize: "12px",
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide legend
    },
   
    datalabels: {
      display: true,
      color: "black",
      font: {
        size: 12,
        weight: "bold",
      },
      formatter: (value, context) => pieChartData.labels[context.dataIndex],
    },
  },
};

  return (
    <div className="pb-6 md:pb-8 lg:pb-10 text-golden ">
      <div className="pb-6 md:pb-8 lg:pb-10 text-golden">
        <h1 className="font-semibold text-xl lg:text-3xl">
          Overview
        </h1>
        <h2 className="text-sm sm:text-md lg:text-lg">
          Dashboard / <span>Overview</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 pb-10">
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-4 bg-white rounded-md">
          <h2 className="text-xl font-semibold">Payout Details</h2>
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#0088FE] rounded-full"></div>
              <h2>Rs 2,16,860.00</h2>
            </div>
            <h5 className="pl-4 font-thin text-sm">Net Pay</h5>
          </div>

          {/* Pie Chart Section with only the chart */}
          <div className="flex justify-between items-center">
            <div className="p-4 sm:p-6 flex justify-between bg-white rounded-md w-40 sm:w-52 lg:w-60">
            <div id="custom-tooltip" style={{ opacity: 0 }}></div>
            <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 bg-[#00C49F]"></div>
                  <h2>Rs 2,24,166.00</h2>
                </div>
                <h5 className="pl-4 font-thin text-sm">Gross Pay</h5>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-1 bg-[#FFBB28]"></div>
                  <h2>Rs 7,306.00</h2>
                </div>
                <h5 className="pl-4 font-thin text-sm">Deductions</h5>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-1 bg-[#FF8042]"></div>
                  <h2>30</h2>
                </div>
                <h5 className="pl-4 font-thin text-sm">Work Days</h5>
              </div>
            </div>
          </div>
        </div>
        {/* Remaining content stays the same */}
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-4 bg-white rounded-md">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              Employee Details
            </h2>
           
          </div>
         <div className="flex justify-between gap-5">
         <div className="bg-golden/50 p-4 sm:p-6 border rounded-md w-48 sm:w-56 lg:w-64 text-black">
              <h2 className="lg:text-2xl text-base font-semibold">5</h2>
              <h4 className="text-lg">Total Employees</h4>
              <h4 className="text-md flex gap-2  text-base text">
                <span className="text-red-700">-174</span>vs previous month
              </h4>
            </div>
          <div className="flex flex-col gap-5">
            <div className="flex lg:flex-row flex-col gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-1 bg-[#c4b5fd]"></div>
                  <h2>03</h2>
                </div>
                <h5 className="pl-4 font-thin text-sm">Additions</h5>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-1 bg-[#86efac]"></div>
                  <h2>00</h2>
                </div>
                <h5 className="pl-4 font-thin text-sm">Settlements</h5>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-1 bg-[#73b6b7]"></div>
                <h2>02</h2>
              </div>
              <h5 className="pl-4 font-thin text-sm">Exclusion</h5>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-1 bg-[#ef86e3]"></div>
                <h2>000</h2>
              </div>
              <h5 className="pl-4 font-thin text-sm">Separation</h5>
            </div>
          </div>
         </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 bg-white rounded-md">
          <h2 className="text-xl font-semibold">Negative Salary</h2>
          <div className="flex items-center justify-center">
            <h3 className="p-8">No Record</h3>
          </div>
        </div>
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 bg-white rounded-md">
          <h2 className="text-xl font-semibold">Stop Salary</h2>

          <div>
            {users && users.length > 0 ? (
              <div className="flex flex-col gap-2">
                {users.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-gray-300 text-lg h-8 w-8 flex items-center rounded-full justify-center">
                      <AiOutlineUser />
                    </div>
                    <h2>
                      {user.name} <span>{user.id}</span>
                    </h2>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <h3 className="p-8">No Record</h3>
              </div>
            )}
          </div>
        </div>
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 bg-white rounded-md">
          <h2 className="text-xl font-semibold">
            Hold Salary
          </h2>
          <div className="flex items-center justify-center">
            <h3 className="p-8">No Record</h3>
          </div>
        </div>
        <div className="border-2 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 bg-white rounded-md">
          <h2 className="text-xl font-semibold">Payout Pending</h2>
          <div className="flex items-center justify-center">
            <h3 className="p-8">No Record</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayslipOverview;

