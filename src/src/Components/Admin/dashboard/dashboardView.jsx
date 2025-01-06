import { useEffect, useState } from "react";
import Activities from "./activities/Activities";
import Dashboard from "./dashboard/dashboard";
import morning from "../../../assets/admin/morning.jpg";
import noon from "../../../assets/admin/afternoon.jpg";
import evening from "../../../assets/admin/evening.jpg";
import night from "../../../assets/admin/night.jpg";
import RightContent from "./dashboardComponents/RightsideContent";

const DashboardView = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours(); // Get the current hour

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
  }, []);

  return (
    <div className="flex flex-wrap p-4">
      {/* Main Content (Dashboard & Activities) */}
      <div className="flex-1 lg:w-[70%] w-full mb-4 lg:mb-0 mr-4 relative">
        {/* Greeting and Background Image */}
        <div
          className="p-3 flex justify-center items-center bg-fill bg-center h-[300px] relative"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          {/* Greeting */}
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl font-bold">{greeting}</h1>
            <p className="text-lg font-semibold">{message}</p>
          </div>
        </div>

        {/* Sub-header Tabs */}
        <div className="space-x-4 border-b border-gray-300 mb-4">
          <button
            className={`py-2 px-4 font-semibold text-lg ${
              activeTab === "dashboard"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 font-semibold text-lg ${
              activeTab === "activities"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex">
          {/* Main Tab Content (Dashboard or Activities) */}
          <div className="w-[70%] mr-4">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "activities" && <Activities />}
          </div>

          {/* RightContent (Sticky to the side) */}
          <div className="lg:w-[30%] w-full sticky top-0">
            <RightContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
