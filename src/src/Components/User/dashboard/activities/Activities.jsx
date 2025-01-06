import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegEdit, FaCalendarCheck, FaCreditCard } from 'react-icons/fa'; // Importing icons from react-icons
import { useAuth } from '../../../Context/AuthContext';

const Activities = () => {
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]); // Holds the data to be displayed
  const [page, setPage] = useState(1); // Keeps track of the current page
const {authState}=useAuth()
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/findEmployeeNotification/${authState.userDetails.employeeId}`);
        const sortedData = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt (most recent first)
        setData(sortedData);
        setVisibleData(sortedData.slice(0, 25)); // Show first 25 data initially
      } catch (err) {
        console.log("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  // Function to map notifications to activities
  const mapNotificationToActivity = (notification) => {
    return {
      id: notification.notificationId,
      icon: getIconForNotification(notification),
      description: notification.message,
      time: new Date(notification.createdAt).toLocaleString(),
    };
  };

  // Function to determine the icon based on the notification type (you can customize this based on your actual data)
  const getIconForNotification = (notification) => {
    const message = notification.message.toLowerCase(); // Convert message to lowercase for case-insensitive comparison
    if (message.includes("leave")) {
      return <FaRegCheckCircle />;
    } else if (message.includes("expense")) {
      return <FaRegEdit />;
    } else if (message.includes("meeting")) {
      return <FaCalendarCheck />;
    } else if (message.includes("payment")) {
      return <FaCreditCard />;
    }
    return <FaRegCheckCircle />; // Default icon
  };

  // Load more data when the "Read More" button is clicked
  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const newVisibleData = data.slice(0, nextPage * 25); // Load the next 25 data
    setVisibleData(newVisibleData);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-gray-800 text-lg font-bold text-center">Recent Activities</h2>
      <div className="space-y-2">
        {visibleData.map((notification, index) => {
          const activity = mapNotificationToActivity(notification);
          return (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="text-golden text-xl">
                {activity.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {visibleData.length < data.length && ( // Show "Read More" button only if there is more data to load
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreData}
            className="px-4 py-2 bg-golden text-white rounded-lg"
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
};

export default Activities;
