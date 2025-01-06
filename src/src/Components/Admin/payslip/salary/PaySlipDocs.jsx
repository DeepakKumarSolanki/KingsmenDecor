import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Import useLocation to access passed state
// import { toWords } from 'number-to-words';

const PaySlipDocs = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();

  function numberToWords(num) {
    const ones = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
  
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
  
    const thousands = [
      '',
      'Thousand',
      'Million',
      'Billion',
    ];
  
    if (num === 0) return 'Zero';
  
    let words = '';
    let i = 0;
  
    while (num > 0) {
      if (num % 1000 !== 0) {
        words = `${helper(num % 1000)} ${thousands[i]} ${words}`;
      }
      num = Math.floor(num / 1000);
      i++;
    }
  
    return words.trim();
  
    function helper(n) {
      if (n === 0) return '';
      if (n < 20) return ones[n];
      if (n < 100) return `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim();
      return `${ones[Math.floor(n / 100)]} Hundred ${helper(n % 100)}`.trim();
    }
  }


  useEffect(() => {
    const fetchPayrollDetails = async (id) => {
      setLoading(true);
      try {
        console.log("im here");
        const response = await axios.get(
          `http://localhost:8080/getPayrollDetails?employeeId=${id}` // Use dynamic employeeId
        );
        console.log("Fetched Payroll Data:", response.data.data);
        setEmployeeData(response.data.data);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollDetails(id);
  }, [id]);

  console.log(employeeData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeData) {
    return <div>No payroll data available</div>;
  }

  // Generate PDF function
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // A4 page in portrait mode
    const component = componentRef.current;

    html2canvas(component, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate the width and height ratios to fit the PDF
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save(`Salary_Slip.pdf`);
    });
  };

  return (
    <div className="p-6">
      <div className="flex md:justify-between gap-2 pb-8">
        <div>
          <h1 className="font-semibold text-2xl">Employee Salary</h1>
          <h2 className="text-md">
            Dashboard / <span>Employee Salary</span>
          </h2>
        </div>
      </div>

      <div className="flex lg:justify-between flex-col lg:flex-row pb-4">
        <h1 className="text-2xl font-bold mb-4">Payslip</h1>
        <div className="flex space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-golden text-white px-4 py-2 rounded"
          >
            PDF
          </button>
        </div>
      </div>

      <div
        id="payslip"
        ref={componentRef}
        className="border p-28 shadow-md max-w-full md:max-w-3xl mx-auto bg-white"
        style={{
          backgroundImage: "url('/letter_head.jpeg')", // Updated path
          backgroundSize: "cover", // Ensures the image covers the entire area
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundPosition: "center", // Centers the image
        }}
      >
        {/* <h2 className="text-lg font-semibold text-center mb-4">
          Payslip for the period of {employeeData.payPeriod}
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
          <div>
            {/* <p><strong>Name:</strong> {employeeData[1].name}</p> */}
            <p>
              <strong>Employee Id:</strong> {employeeData[1].employeeId}
            </p>
            <p>
              <strong>Date of Joining:</strong> {employeeData[1].joiningDate}
            </p>
            <p>
              <strong>Bank A/C Number:</strong> {employeeData[1].accountNumber}
            </p>
            <p>
              <strong>Pancard Number:</strong> {employeeData[1].panCardNumber}
            </p>
            <p>
              <strong>Bank Name:</strong> {employeeData[1].bankName}
            </p>
            {/* <p><strong>Week Off:</strong> {employeeData.weekOff}</p> */}
          </div>
          <div>
            <p>
              <strong>Department:</strong> {employeeData[1].department}
            </p>
            <p>
              <strong>Designation:</strong> {employeeData[1].role}
            </p>
            <p>
              <strong>Location:</strong> BENGALORE
            </p>
            <p>
              <strong>Official Email:</strong> {employeeData[1].officialEmail}
            </p>
            <p>
              <strong>LOP:</strong> {employeeData[2].lopDays}
            </p>
          </div>
        </div>

        <table className="w-full border-collapse border text-sm mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Earnings</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Deductions</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Earnings Section */}
            <tr>
              <td className="border px-4 py-2">Basic Pay</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.basicPay || 0}
              </td>
              <td className="border px-4 py-2">Employee Provident Fund</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.employeeProvidentFund || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">House Rent Allowance (HRA)</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.houseRentAllowance || 0}
              </td>
              <td className="border px-4 py-2">ESIC</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.employeeStateInsurance || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Special Allowance</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.specialAllowance || 0}
              </td>
              <td className="border px-4 py-2">P Tax</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.providentFund || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Other Allowance</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.otherAllowance || 0}
              </td>
              <td className="border px-4 py-2">TDS</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.taxDeduction || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">LOP</td>
              <td className="border px-4 py-2">
                ₹ {employeeData[2]?.lopDeduction || 0}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals and Net Pay */}
        <p>
          <strong>Total Earnings:</strong> ₹{" "}
          {[
            employeeData[2]?.basicPay || 0,
            employeeData[2]?.houseRentAllowance || 0,
            employeeData[2]?.specialAllowance || 0,
            employeeData[2]?.otherAllowance || 0,
          ].reduce((acc, val) => acc + val, 0)}
        </p>
        <p>
          <strong>Total Deductions:</strong> ₹{" "}
          {[
            employeeData[2]?.employeeProvidentFund || 0,
            employeeData[2]?.employeeStateInsurance || 0,
            employeeData[2]?.providentFund || 0,
            employeeData[2]?.taxDeduction || 0,
            employeeData[2]?.lopDeduction || 0,
          ].reduce((acc, val) => acc + val, 0)}
        </p>
        <p>
          <strong>Net Pay:</strong> ₹ {employeeData[2].salary}
        </p>
        <p>
          <strong>Net Pay (In Words):</strong>{" "}
          {/* {employeeData.salaryInWords || "N/A"} */}
          {numberToWords(employeeData[2].salary)} Only/-
        </p>

        <div className="mt-2">
          <h3 className="text-lg font-semibold">Leave Details:</h3>
          <table className="w-full border-collapse border mt-2 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2">Leave Type</th>
                <th className="border px-4 py-2">Total Balance</th>
                <th className="border px-4 py-2">Taken</th>
                <th className="border px-4 py-2">Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Sick Leave</td>
                <td className="border px-4 py-2">12</td>
                <td className="border px-4 py-2">
                  {12 - (employeeData[0]?.sickLeaveBalance || 0)}
                </td>
                <td className="border px-4 py-2">
                  {employeeData[0]?.sickLeaveBalance || 0}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Casual Leave</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">
                  {10 - (employeeData[0]?.casualLeaveBalance || 0)}
                </td>
                <td className="border px-4 py-2">
                  {employeeData[0]?.casualLeaveBalance || 0}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Paid Leave</td>
                <td className="border px-4 py-2">12</td>
                <td className="border px-4 py-2">
                  {12 - (employeeData[0]?.paidLeaveBalance || 0)}
                </td>
                <td className="border px-4 py-2">
                  {employeeData[0]?.paidLeaveBalance || 0}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emergency Leave</td>
                <td className="border px-4 py-2">7</td>
                <td className="border px-4 py-2">
                  {7 - (employeeData[0]?.emergencyLeaveBalance || 0)}
                </td>
                <td className="border px-4 py-2">
                  {employeeData[0]?.emergencyLeaveBalance || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaySlipDocs;
