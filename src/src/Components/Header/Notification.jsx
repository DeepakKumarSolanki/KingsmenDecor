import { useState, useRef, useEffect } from 'react';
import ClickOutside from '../ClickOutside';
import { Link } from 'react-router-dom';
import { NotificationImportant } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import axios from 'axios';

const NotificationDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const notificationButtonRef = useRef(null);
  const { authState } = useAuth();
  const { role } = authState;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
let url=''
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };
if(authState.role==="ADMIN"){
  url="http://localhost:8080/fetchAllNotification"
}else if(authState.role==="EMPLOYEE"|| authState.role==="MANAGER"){
  url=`http://localhost:8080/findEmployeeNotification/${authState.userDetails.employeeId}`
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        console.log("Notifications data:", res.data.data);
        
        // Sort the notifications by 'createdAt' in descending order
        const sortedData = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Take the first 3 notifications
        setData(sortedData.slice(0, 3));
      } catch (err) {
        console.log("Error fetching notifications:", err);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = () => {
    if (role === 'ADMIN') {
      navigate("/admin-dashboard", { state: { activeTab: "activities" } });
    } else if (role === "MANAGER" || role === "EMPLOYEE") {
      navigate("/user-dashboard", { state: { activeTab: "activities" } });
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} exceptionRef={notificationButtonRef}>
      <li>
        <button
          ref={notificationButtonRef}
          onClick={(e) => {
            setNotifying(false);
            toggleDropdown(e);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke bg-gray text-golden dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying ? 'inline' : 'hidden'}`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          <NotificationImportant />
        </button>

        {dropdownOpen && (
          <div
            className={`absolute mt-2.5 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark z-9999 
              sm:right-0 sm:w-80 w-full max-w-xs sm:max-w-sm pr-2 sm:pr-4 
              ${window.innerWidth < 640 ? "left-1/2 transform -translate-x-1/2" : ""}`}
          >
            <div className="px-3 py-2 sm:px-4.5 sm:py-3">
              <h5 className="text-sm font-medium text-bodydark2">Notifications</h5>
            </div>
            <ul className="flex flex-col overflow-y-auto max-h-56 sm:max-h-72">
              {data.length === 0 ? (
                <li>No new notifications</li>
              ) : (
                data.map((notification, index) => (
                  <li key={index}>
                    <Link
                      className="flex flex-col gap-1 sm:gap-2.5 border-t border-stroke px-3 py-2 sm:px-4.5 sm:py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      to="#"
                    >
                      <p className="text-sm sm:text-base">
                        <span className="text-black dark:text-white">{notification.message.split(' ')[0]}</span>{' '}
                        {notification.message.slice(notification.message.indexOf(' ') + 1)}
                      </p>
                      <p className="text-xs sm:text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
                    </Link>
                  </li>
                ))
              )}
            </ul>

            <div className="flex justify-center px-3 py-2 mt-2 sm:px-4.5 sm:py-2">
              <button
                onClick={handleRedirect}
                className="block text-center text-sm font-medium text-golden"
              >
                View All
              </button>
            </div>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default NotificationDropdown;
