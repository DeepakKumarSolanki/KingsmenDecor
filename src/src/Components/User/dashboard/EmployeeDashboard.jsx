import { FaBriefcase } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const { authState } = useAuth();
  const currentDate = new Date();

  const [userOnLeaves, setUsersOnLeave] = useState([]);
  const [pendingLeave, setPendingleave] = useState([]);
  const [empOnLeaves, setEmpOnLeaves] = useState([]);
  const [status, setStatus] = useState("");
  const [attendanceData, setAttendanceData] = useState([]); // Ensure this is an array
  const [siteData, setSiteData] = useState([]);

  // Fetch employee attendance
  useEffect(() => {
    async function fetchEmployeeAttendance() {
      try {
        const res = await axios.get(
          `http://localhost:8080/getEmployeeAttendance/${authState.userDetails.employeeId}`
        );
        console.log("Attendance Response:", res.data);
        // Ensure that the response is an array or set it to an empty array if invalid
        if (Array.isArray(res.data)) {
          setAttendanceData(res.data);
        } else {
          setAttendanceData([]); // Set as empty if data is invalid
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setAttendanceData([]); // Handle error gracefully by setting an empty array
      }
    }
    fetchEmployeeAttendance();
  }, [authState.userDetails.employeeId]);

  // Fetch employee and leave data
  useEffect(() => {
    const fetchEmployeesAndLeaves = async () => {
      try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();

        const [employeeRes, leavesRes, attendanceRes, siteRes] = await Promise.all([
          axios.get(`http://localhost:8080/fetchAllEmployees`),
          axios.get(`http://localhost:8080/findAllLeave`),
          axios.get(`http://localhost:8080/getEmployeeAttendance/${authState.userDetails.employeeId}`),
          axios.get(`http://localhost:8080/getOnsiteEmployee/${authState.userDetails.employeeId}`),
        ]);
        setAttendanceData(attendanceRes.data);
        setSiteData(siteRes.data);
        console.log("Employees Data:", employeeRes.data.data);
        console.log("Leaves Data:", leavesRes.data.data);
        console.log("attendance Data:", attendanceRes.data.data);
        console.log("Site Data:", siteRes.data.data);

        const empOnLeavesData = leavesRes.data.data
          .filter((leave) => {
            const [year, month, day] = leave.fromDate.split("-").map(Number);
            return month === todayMonth && day === todayDay + 1; // Tomorrow's leave
          })
          .map((leave) => {
            const matchingEmployee = employeeRes.data.data.find(
              (emp) =>
                emp.employeeId === leave.employeeId &&
                emp.department === authState.userDetails.department
            );

            return {
              ...leave,
              employeeName: matchingEmployee ? matchingEmployee.userName : "Unknown",
              image: matchingEmployee?.image || "https://via.placeholder.com/150", // Placeholder image
            };
          });

        console.log("Employees on leave tomorrow:", empOnLeavesData);
        setEmpOnLeaves(empOnLeavesData);
      } catch (error) {
        console.error("Error fetching employees or leaves:", error);
      }
    };

    fetchEmployeesAndLeaves();
  }, [authState.userDetails.department]);

  const getStatus = (employeeId, currentDate) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

    // Ensure attendanceData is an array before using .find()
    if (Array.isArray(attendanceData)) {
      // Check attendance data first
      const attendanceRecord = attendanceData.find(
        (record) => record.employeeId === employeeId && record.attendanceDate === today
      );

      if (attendanceRecord && attendanceRecord.isPresent) {
        // If the employee is marked as present
        const punchInTime = new Date(attendanceRecord.firstPunchIn);
        const punchOutTime = new Date(attendanceRecord.lastPunchOut);
        const currentTime = new Date();

        // Compare punch-in and punch-out times with the current time
        if (currentTime < punchInTime) {
          setStatus("You have not punched in yet.");
        } else if (currentTime >= punchInTime && currentTime <= punchOutTime) {
          setStatus("You are in the office.");
        } else {
          setStatus("You are working on site.");
        }
      } else {
        // If not present in attendance, check for site data
        const siteVisitRecord = siteData.find(
          (record) => record.employeeId === employeeId && record.date === today
        );

        if (siteVisitRecord) {
          // If the employee has a site visit record for today
          const sitePunchInTime = new Date(siteVisitRecord.firstPunchIn);
          const sitePunchOutTime = new Date(siteVisitRecord.lastPunchOut);
          const currentTime = new Date();

          // Compare times and set status accordingly
          if (currentTime < sitePunchInTime) {
            setStatus("You have not punched in yet.");
          } else if (currentTime >= sitePunchInTime && currentTime <= sitePunchOutTime) {
            setStatus("You are on the site.");
          } else {
            setStatus("You are working on site.");
          }
        } else {
          // If the employee has neither punched in nor filled the site visit form
          const currentTime = new Date();
          if (currentTime.getHours() >= 10 && currentTime.getMinutes() >= 30) {
            setStatus("You are absent today.");
          } else {
            setStatus("You have not punched in yet.");
          }
        }
      }
    }
  };

  useEffect(() => {
    // Assuming the employee's ID is available from the context or props
    const employeeId = "EMP004"; // Example employee ID
    const currentDate = new Date().toISOString().split("T")[0];

    getStatus(employeeId, currentDate);
  }, [attendanceData, siteData]);

  // Format the current date
  const formatDate = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const ordinalSuffix = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayOfWeek}, ${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  // Sections for today and tomorrow
  const today = [
    {
      icon: <FaBriefcase className="text-blue-500" />,
      text: status,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  const tomorrow = [
    {
      icon: <FaBriefcase className="text-orange-500" />,
      text: `${empOnLeaves.length > 0 ? `${empOnLeaves.length} people are on leave tomorrow` : "No one is on leave tomorrow"}`,
      images: empOnLeaves.map((leave) => leave.image),
    },
  ];

  // Render Section
  const renderSection = (title, items) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="space-y-3 p-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="text-golden text-xl">{item.icon}</div>
              <p className="text-gray-700">{item.text}</p>
            </div>
            <div className="flex space-x-2">
              {item.image && (
                <img
                  src={item.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
              )}
              <div className="flex -space-x-4">
                {item.images &&
                  item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`avatar-${idx}`}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="rounded-lg p-6 bg-white shadow-md">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <img
              className="w-16 h-16 rounded-full"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {`${authState.userDetails.firstName} ${authState.userDetails.lastName}`}
              </h2>
              <p className="text-gray-500">{formatDate(currentDate)}</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        {renderSection("Today", today)}
        {renderSection("Tomorrow", tomorrow)}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
