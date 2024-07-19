import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MainDash from '../components/MainDash'
import AgentDash from '../components/AgentDash';

const Dashboard = () => {
    const Navigate = useNavigate();
    const [user, setUser] = React.useState();
    const [username, setUsername] = React.useState();
  
    React.useEffect(() => {
      const tkn = localStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) setUser(user);
      if (!tkn) Navigate('/login');
    }, []);

    const handleLogout = (e) => {
      e.preventDefault();
      sessionStorage.removeItem('user');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    
  return (
    <React.Fragment>
        <div className="dashboard">
            <div className="sidebar"></div>
            <div className="mainDash">
                <div className="topdashnav">
                    <h4>Welcome, {user ? `${user.name}` : "Username"} <span>{user ? `${user.usertype}` : "user type"}</span> </h4>

                    <button onClick={handleLogout}>Logout</button>
                </div>
                <Routes>
                  <Route 
                      path="/" 
                      element={user ? (user.usertype === "admin" ? <MainDash /> : <AgentDash />) : <Navigate to="/login" />} 
                  />
              </Routes>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Dashboard