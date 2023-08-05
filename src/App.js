import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import AllRoutes from "./AllRoutes";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isadmin, setIsAdmin] = useState(false)
  const loginStatus = (value) => {
    setIsLogin(value)
    console.log("isadmin ", isLogin);
  }
  const adminStatus = (value) => {
    setIsAdmin(value)
    console.log("isadmin ", isadmin);
  }
  return (
    <div className="App">
      <Router>
        <Navbar loginStatus={loginStatus} isadmin={isadmin} isLogin={isLogin} />
        <div>
          {/* Your other components and routing */}
          <ToastContainer position="top-right" theme="light" />
          <AllRoutes loginStatus={loginStatus} adminStatus={adminStatus} isLogin={isLogin} />
        </div>
      </Router>
    </div>
  );
}

export default App;
