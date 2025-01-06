import { useEffect, useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import profile from "../../../../assets/admin/profile.jpg"; // Replace with the correct path for profile images
import axios from "axios";

const RightContent = () => {
  const message =
    "Happy Birthday, John! 🎉 Hope you have a fantastic day! 🎂🎈";
  const encodedMessage = encodeURIComponent(message); // Ensure message is URL encoded
  const [user, setUser] = useState([]); // Initialize as an empty array
  const [userOnLeaves, setUsersOnLeave] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const today = new Date();
      const todayMonth = today.getMonth() + 1; // Months are 0-indexed in JavaScript
      const todayDay = today.getDate(); // Use today's date
console.log(todayDay)
      try {
        const [employeeRes, leavesRes] = await Promise.all([
          axios.get(`http://localhost:8080/fetchAllEmployees`),
          axios.get(`http://localhost:8080/findAllLeave`),
        ]);
        console.log(leavesRes.data.data)
        console.log(employeeRes.data.data)
        const birthdayMatches = employeeRes.data.data.filter((emp) => {
          const [year, month, day] = emp.dob.split("-").map(Number);
          return month === todayMonth && day === todayDay;
        });
        const empOnLeaves = leavesRes.data.data
  .filter((emp) => {
    const [year, month, day] = emp.fromDate.split("-").map(Number);
    console.log(month,day)
    return month === todayMonth && day === todayDay; // Filter for today's leaves
  })
  .map((leave) => {
    // Find the matching employee by ID
    const matchingEmployee = employeeRes.data.data.find(
      (emp) => emp.employeeId === leave.employeeId
    );

    // Return the leave data combined with the employee name
    return {
      ...leave,
      employeeName: matchingEmployee ? matchingEmployee.userName : "Unknown"
    };
  });

console.log("Employees on leave today with names:", empOnLeaves);
        // console.log(empOnLeaves)
        setUsersOnLeave(empOnLeaves);
        console.log(empOnLeaves)
        setUser(birthdayMatches); // Set matched employees
        console.log("Employees with today's birthday:", birthdayMatches);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []); // Dependency array is empty, so this runs only once

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Birthday Card */}
      {user.length > 0 ? (
        user.map((birthdayPerson, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <h2 className="p-4 text-center text-gray-800 text-lg font-bold">
              🎉 Today’s {birthdayPerson.name}’s Birthday! 🎂
            </h2>
            <div>
              <img
                src={profile}
                alt={`${birthdayPerson.name}'s Birthday Celebration`}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <ReactWhatsapp
                number={`+91${birthdayPerson.phoneNumber}`} // Use proper country code and number
                message={encodedMessage} // Pass the encoded message
                className="bg-golden text-white px-4 py-2 rounded-lg hover:bg-golden-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Send Wishes
              </ReactWhatsapp>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-4">
          <h2 className="text-center text-gray-800 font-semibold">
            No Birthdays Today
          </h2>
        </div>
      )}

      {/* Leave Card */}
      {userOnLeaves.length > 0 ? (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-4">
          <h2 className="text-gray-800 text-lg font-bold text-center">
            On Leave Today
          </h2>
          <div className="space-y-4 mt-4">
            {userOnLeaves.map((person, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={person.image}
                  alt={person.employeeName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">{person.employeeName}</h3>
                  <p className="text-sm text-gray-500">On Leave Today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-4">
          <h2 className="text-center text-gray-800 font-semibold">
            No Employee is on Leave Today
          </h2>
        </div>
      )}
    </div>
  );
};

export default RightContent;
