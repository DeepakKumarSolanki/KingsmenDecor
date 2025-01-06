import axios from "axios";
import { useEffect, useState } from "react";

const TopLeaveTakers = () => {
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        // Fetching leave data from API
        const res = await axios.get("http://localhost:8080/fetchAllLeaveRecords");
        const leaveData = res.data.data; // Assuming the response contains a data property with the leave records
        
        // Processing the leave data
        const leaveTakerStats = leaveData.reduce((acc, leave) => {
          const { employeeName, noOfDays } = leave;

          // If the employee already exists in the accumulator, add the leave days to the total
          if (acc[employeeName]) {
            acc[employeeName] += noOfDays;
          } else {
            acc[employeeName] = noOfDays;
          }

          return acc;
        }, {});

        // Convert the processed leave stats object into an array
        const employeesWithLeaveCount = Object.keys(leaveTakerStats).map(name => ({
          name: name,
          leaves: leaveTakerStats[name]
        }));

        // Sort employees by the number of leaves in descending order and take top 5
        const topLeaveTakers = employeesWithLeaveCount
          .sort((a, b) => b.leaves - a.leaves)
          .slice(0, 5); // Get the top 5 leave takers

        // Set the state with the sorted data
        setEmployees(topLeaveTakers);
      } catch (err) {
        console.log("Error fetching leave records:", err);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-golden">Top 5 Leave Takers</h2>
      <ul className="space-y-2">
        {employees.map((employee, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-[#f1f9fe] rounded-md">
            <span className="text-gray-700">{employee.name}</span>
            <span className="font-semibold text-gray-900">{employee.leaves} Leaves</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopLeaveTakers;
