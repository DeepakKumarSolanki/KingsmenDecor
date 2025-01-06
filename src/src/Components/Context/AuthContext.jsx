// import axios from "axios";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Create AuthContext
// export const AuthContext = createContext(); // Make sure this is exported

// // AuthProvider Component
// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage or default to `false`
//   const [authState, setAuthState] = useState({
//     isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
//     username: localStorage.getItem("username") || null,
//     role: localStorage.getItem("role") || null,
//   });

//   // Ref to store the timeout ID
//   const logoutTimeoutRef = React.useRef(null);
// const[users,setUsers]=useState([])
// const[user,setUser]=useState({})
// const[loading,setLoading]=useState('false')
// useEffect(() => {
//   const fetchEmployees = async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await axios.get(" http://localhost:8080/fetchAllEmployees");

//       console.log("API Response:", response.data); // Log API response
//       setUsers(response.data); // Update state with fetched data
//     } catch (err) {
//       console.error("Error fetching employees:", err);
//     } finally {
//       setLoading(false); // Ensure loading is stopped in both success and error cases
//     }
//   };

//   fetchEmployees(); // Call the fetch function
// }, []); // Empty dependency array means it runs once on component mount

// // Debugging Logs
// console.log("Users:", users);
//   // Login function
//   const login = (username, password) => {
//     if (username === "admin@kingsmen.com" && password === "admin@123") {
//       const newState = { isAuth: true, username, role: "admin" };
//       setAuthState(newState);
//       saveToLocalStorage(newState);
//       startLogoutTimer(); // Start the auto-logout timer
//       return { success: true, role: "admin" };
//     } else if (username === "user@kingsmen.com" && password === "user@123") {
//       const newState = { isAuth: true, username, role: "user" };
//       setAuthState(newState);
//       saveToLocalStorage(newState);
//       startLogoutTimer(); // Start the auto-logout timer
//       return { success: true, role: "user" };
//     } else {
//       return { success: false, message: "Invalid credentials. Please try again." };
//     }
//   };

//   // Logout function
//   // const logout = () => {
//   //   const newState = { isAuth: false, username: null, role: null };
//   //   setAuthState(newState);
//   //   saveToLocalStorage(newState);
//   //   clearLogoutTimer(); // Clear the timer if the user logs out manually
//   // };

//   const logout = (navigate) => {
//     const newState = { isAuth: false, username: null, role: null };
  
//     // Update context state
//     setAuthState(newState);
  
//     // Clear localStorage
//     localStorage.clear();
  
//     // Navigate to login
//     navigate('/', { replace: true });
  
//     // Clear the logout timer if it exists
//     clearLogoutTimer();
//   };
  

//   // Save state to localStorage
//   const saveToLocalStorage = ({ isAuth, username, role }) => {
//     localStorage.setItem("isAuth", JSON.stringify(isAuth));
//     localStorage.setItem("username", username || "");
//     localStorage.setItem("role", role || "");
//   };

//   // Start the logout timer
//   const startLogoutTimer = () => {
//     // Clear any existing timer
//     clearLogoutTimer();

//     // Set a new timer for 5 minutes (300,000 ms)
//     logoutTimeoutRef.current = setTimeout(() => {
//       logout();
//     }, 2400000); // 10 minutes in milliseconds
//   };

//   // Clear the logout timer
//   const clearLogoutTimer = () => {
//     if (logoutTimeoutRef.current) {
//       clearTimeout(logoutTimeoutRef.current);
//       logoutTimeoutRef.current = null;
//     }
//   };

//   // Restore auto-logout on mount if the user is already authenticated
//   useEffect(() => {
//     if (authState.isAuth) {
//       startLogoutTimer();
//     }

//     return () => {
//       clearLogoutTimer(); // Cleanup timer on component unmount
//     };
//   }, [authState.isAuth]);

//   return (
//     <AuthContext.Provider value={{ authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
    username: localStorage.getItem("username") || null,
    role: localStorage.getItem("role") || null,
    userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  });

  const [users, setUsers] = useState([]); // Store fetched employee data
  const [loading, setLoading] = useState(false);
  const logoutTimeoutRef = React.useRef(null);
  const navigateToHome = useNavigate();  // Use the hook here in the component

  // Login function
  const login = async (OfficialEmail, password) => {
    console.log(OfficialEmail, password);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://server.ovf.bgg.mybluehostin.me:8080//login?officialEmail=${OfficialEmail}&password=${password}`,
        { maxRedirects: 0 } // Disable following redirects
      );

      const { data } = response;
      console.log(data.data[0]);
      // If the response contains user data
      if (data.statusCode === 200) {
        const username = `${data.data[0].firstName} ${data.data[0].lastName}`;
        const role = data.data[0].role;
        const userDetails = data.data[0];
        console.log("hello", username);
        const newState = { isAuth: true, username, role, userDetails };
        setAuthState(newState);
        saveToLocalStorage(newState);
        startLogoutTimer();
        return { success: true, role, userDetails };
      } else {
        return { success: false, message: data.message || "Invalid credentials. Please try again." };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "An error occurred. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  // Logout function: Remove the navigate argument and use the hook here
  const logout = () => {
    const newState = { isAuth: false, username: null, role: null, userDetails: null };
    setAuthState(newState);
    localStorage.clear();
    clearLogoutTimer();
    navigateToHome("/", { replace: true });  // Navigate here
  };

  // Save state to localStorage
  const saveToLocalStorage = ({ isAuth, username, role, userDetails }) => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    localStorage.setItem("username", username || "");
    localStorage.setItem("role", role || "");
    localStorage.setItem("userDetails", JSON.stringify(userDetails) || null);
  };

  // Start the logout timer
  const startLogoutTimer = () => {
    clearLogoutTimer();
    logoutTimeoutRef.current = setTimeout(() => {
      logout();
    }, 2400000); // 40 minutes
  };

  // Clear the logout timer
  const clearLogoutTimer = () => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }
  };

  // Restore auto-logout on mount if authenticated
  useEffect(() => {
    if (authState.isAuth) {
      startLogoutTimer();
    }

    return () => {
      clearLogoutTimer();
    };
  }, [authState.isAuth]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, loading, users }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
