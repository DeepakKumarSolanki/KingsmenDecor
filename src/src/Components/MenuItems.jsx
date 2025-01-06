import { AiOutlineDashboard } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { LuCalendarDays } from "react-icons/lu";
// import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
// import { MdOutlineWatchLater } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
// import { GiReceiveMoney } from "react-icons/gi";
// import { GiMoneyStack } from "react-icons/gi";
import { IoMdPaper } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { FaRegFileImage } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { LuDownload } from "react-icons/lu";
import { GrView } from "react-icons/gr";

import { useAuth } from "./Context/AuthContext";
// import { id } from "date-fns/locale";

export const useMenuItems = () => {
  const { logout } = useAuth();

  const menuItemsAdmin = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: AiOutlineDashboard,
      route: "/admin-dashboard",
      submenu: [],
    },
    {
      id: "employeeTracking",
      title: "Employee Tracking",
      icon: LuUser2,
      submenu: [
        { title: "All Employees", icon: LuUsers, route: "/employees" },
        { title: "Holidays", icon: LiaUmbrellaBeachSolid, route: "/holidays" },
        { title: "Leaves", icon: LuCalendarDays, route: "/leaves" },
        { title: "Onsite", icon: LuCalendarDays, route: "/onsite" },
        // {
        //   title: "Leave Settings",
        //   icon: AiOutlineMenuUnfold,
        //   route: "/leave-settings",
        // },
        { title: "Attendance", icon: FaRegCalendarCheck, route: "/attendance" },
        // { title: "Timesheet", icon: MdOutlineWatchLater, route: "/timesheet" },
        {
          title: "Activities",
          icon: IoMdNotificationsOutline,
          route: "/activities",
        },
      ],
    },
    {
      id: "calendar",
      title: "Calendar",
      icon: LuCalendarDays,
      route: "/calendar",
    },
    {
      id: "tickets",
      title: "Tickets",
      icon: IoMdPaper, // Use a relevant icon from react-icons (IoMdPaper for example)
      route: "/tickets",
      submenu: [],
    },
    {
      id: "payroll",
      title: "Payroll",
      icon: IoWalletOutline, // Main icon for Payroll
      submenu: [
        // {
        //   title: "Overview",
        //   icon: GrView,
        //   route: "/payslipOverview",
        // },
        {
          title: "Employee Salary",
          icon: LiaMoneyCheckAltSolid,
          route: "/payroll",
        },
        // { title: "Payslip", icon: LuDownload, route: "/payslip/document" },
        {
          title: "Expenses",
          icon: FaRegMoneyBillAlt,
          route: "/employeeExpences",
        },
        {
          title: "Reimbursement",
          icon: GrView,
          route: "/reimbursement",
        },
      ],
    },
    {
      id: "policies",
      title: "Policies",
      icon: FaRegStickyNote,
      route: "/policies",
      submenu: [],
    },
    // {
    //   id: "promotion",
    //   title: "Promotion",
    //   icon: TfiAnnouncement,
    //   route: "/promotion",
    //   submenu: [],
    // },
    {
      id: "resignation",
      title: "Resignation",
      icon: IoInformationCircleOutline,
      route: "/resignation",
      submenu: [],
    },
    {
      id: "termination",
      title: "Termination",
      icon: MdBlock,
      route: "/termination",
      submenu: [],
    },
    {
      id: "knowledgeBase",
      title: "knowledgeBase",
      icon: TfiAnnouncement,
      route: "/knowledgeBase",
      submenu: [],
    },
    {
      id: "assets",
      title: "Assets",
      icon: FaRegFileImage,
      route: "/assets",
      submenu: [],
    },
    {
      id: "logout",
      title: "Logout",
      icon: FiLogOut,
      route: null, // No route since it's an action
      action: logout, // Assign logout action
      submenu: [],
    },
  ];

  const menuItemsUser = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: AiOutlineDashboard,
      route: "/user-dashboard",
      submenu: [],
    },
    {
      id: "employeeTracking",
      title: "Employee Tracking",
      icon: LuUser2,
      submenu: [
        { title: "Attendance", icon: FaRegCalendarCheck, route: "/attendance" },
        { title: "Leaves", icon: LuCalendarDays, route: "/leaves" },
        { title: "Onsite", icon: LuCalendarDays, route: "/onsite" },
        { title: "Holidays", icon: LiaUmbrellaBeachSolid, route: "/holidays" },
        // { title: "Timesheet", icon: MdOutlineWatchLater, route: "/timesheet" },
        {
          title: "Activities",
          icon: IoMdNotificationsOutline,
          route: "/activities",
        },
      ],
    },
    {
      id: "calendar",
      title: "Calendar",
      icon: LuCalendarDays,
      route: "/calendar",
    },
    {
      id: "tickets",
      title: "Tickets",
      icon: IoMdPaper,
      route: "/tickets",
      submenu: [],
    },
    {
      id: "payroll",
      title: "Payroll",
      icon: IoWalletOutline,
      submenu: [
        {
          title: "Salary",
          icon: LiaMoneyCheckAltSolid,
          route: "/payroll",
        },
        // { title: "Payslip", icon: LuDownload, route: "/payslip" },
        {
          title: "Reimbursement",
          icon: GrView,
          route: "/reimbursement",
        },
      ],
    },
    {
      id: "Courses",
      title: "Courses",
      icon: FaRegStickyNote,
      route: "/courses",
      submenu: [],
    },
    {
      id: "Quiz",
      title: "Quiz",
      icon: FaRegStickyNote,
      route: "/takeQuiz",
      submenu: [],
    },
    {
      id: "policies",
      title: "Policies",
      icon: FaRegStickyNote,
      route: "/policies",
      submenu: [],
    },
    // {
    //   id: "knowledgeBase",
    //   title: "knowledgeBase",
    //   icon: TfiAnnouncement,
    //   route: "/knowledgeBase",
    //   submenu: [],
    // },
    {
      id: "resignation",
      title: "Resignation",
      icon: IoInformationCircleOutline,
      route: "/resignation",
      submenu: [],
    },
    {
      id: "knowledgeBase",
      title: "KnowledgeBase",
      icon: IoInformationCircleOutline,
      route: "/knowledgeBase",
      submenu: [],
    },
    {
      id:"assets",
      title:"Assets",
      icon:LuCalendarDays,
      route:"/assets"
    },
    {
      id: "logout",
      title: "Logout",
      icon: FiLogOut,
      route: null, // No route since it's an action
      action: logout, // Assign logout action
      submenu: [],
    },
  ];
  return { menuItemsAdmin, menuItemsUser };
};
