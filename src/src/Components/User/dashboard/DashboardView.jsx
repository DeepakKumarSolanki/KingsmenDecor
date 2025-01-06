import { useEffect, useState } from "react";
import Activities from "./activities/Activities";
import morning from "../../../assets/admin/morning.jpg";
import noon from "../../../assets/admin/afternoon.jpg";
import evening from "../../../assets/admin/evening.jpg";
import night from "../../../../src/assets/admin/night.jpg";
import RightContent from "../dashboard/RightsideContent";
import EmployeeDashboard from "../dashboard/EmployeeDashboard";
import { useLocation } from "react-router-dom";

const DashboardView = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("");
  const [background, setBackground] = useState("");
  const location = useLocation()

  useEffect(() => {

    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }

    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning...");
      setBackground(morning);
      setMessage(
        "Rise and shine! Every morning is a chance to start fresh, chase your dreams, and make today amazing."
      );
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon...");
      setBackground(noon);
      setMessage(
        "Keep going! The sun may be at its peak, but so is your potential to accomplish something great today."
      );
    } else if (currentHour >= 17 && currentHour < 22) {
      setGreeting("Good Evening...");
      setBackground(evening);
      setMessage(
        "Take a moment to breathe. The evening is your time to reflect on your wins and recharge for tomorrow."
      );
    } else {
      setGreeting("Good Night...");
      setBackground(night);
      setMessage(
        "As the stars light up the sky, let gratitude light up your heart. Sleep well and dream big for a brighter tomorrow."
      );
    }
  }, [greeting,location.state?.activeTab]);

  return (
    <div className="flex flex-col lg:flex-row lg:p-4 bg-gray-100 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Greeting Section */}
        <div
          className="relative p-6 flex justify-center items-center bg-cover bg-center h-[300px] rounded-lg"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          {/* Greeting Content */}
          <div className="relative z-10 text-center text-white">
            <h1 className="text-2xl md:text-4xl font-bold">{greeting}</h1>
            <p className="text-sm md:text-lg font-medium">{message}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center lg:justify-start mt-4 border-b border-gray-300">
          <button
            className={`py-2 px-4 text-sm md:text-lg font-semibold ${
              activeTab === "dashboard"
                ? "text-golden border-b-2 border-golden"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 text-sm md:text-lg font-semibold ${
              activeTab === "activities"
                ? "text-golden border-b-2 border-golden"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </button>
        </div>

        {/* Main Tab Content */}
        <div className="mt-4 flex flex-col lg:flex-row lg:space-x-4">
          {/* Dashboard or Activities */}
          <div className="w-full lg:w-[70%]">
            {activeTab === "dashboard" && <EmployeeDashboard />}
            {activeTab === "activities" && <Activities />}
          </div>

          {/* Sidebar Content */}
          <div className="w-full lg:w-[30%]">
            <RightContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

