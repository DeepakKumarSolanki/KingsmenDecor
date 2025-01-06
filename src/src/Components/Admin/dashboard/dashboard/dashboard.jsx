import EmployeeAgeDistribution from "../dashboardComponents/AgeDistribution";
import EmployeeCount from "../dashboardComponents/employeeCount";
import EmployeeStatusDistribution from "../dashboardComponents/EmployeeDistruibution";
import GenderEmployeeDistribution from "../dashboardComponents/GenderDistribution";
import QuickLinks from "../dashboardComponents/QuickLinks";
import TopLeaveTakers from "../dashboardComponents/TopLeaveTakers";
import YearsInServiceDistribution from "../dashboardComponents/YearsInService";

const Dashboard = () => {
  return (
    <div className="p-4">
    <div className="mt-4">
    {/* <h3 className="text-xl font-bold text-golden">Employee Quick Track</h3> */}
       <EmployeeCount/>
      </div>
      <div className="mt-8">
      <h3 className="text-xl font-bold text-golden">Quick Links</h3>
        <QuickLinks/>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
        <h3 className="text-xl font-bold text-golden">Years In Service Distribution</h3>
          <YearsInServiceDistribution/>
        </div>
        <div>
        <h3 className="text-xl font-bold text-golden">Employee Status Distribution</h3>
          <EmployeeStatusDistribution/>
        </div>
        <div>
        <h3 className="text-xl font-bold text-golden">Employee Age Distribution</h3>
            <EmployeeAgeDistribution/>
        </div>
        <div>
        <h3 className="text-xl font-bold text-golden">Employee Gender Distribution</h3>
            <GenderEmployeeDistribution/>
        </div>
        <div>
            <TopLeaveTakers/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
