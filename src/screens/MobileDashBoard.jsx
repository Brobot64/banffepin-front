import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MobileDash from '../components/remake/MobileDash'
import Layout from '../components/remake/Layout'
import OrderConfirmation from '../components/remake/OrderConfirmation'
import FullHistory from '../components/remake/FullHistory'
import HistoryView from '../components/remake/HistoryView';
import Login from './Login'
import LoginRemake from './LoginRemake'

const MobileDashBoard = () => {
  const Navigate = useNavigate();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const tkn = localStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) setUser(user);
    if (!tkn || !user) Navigate('/');
  }, []);

  return (
    <React.Fragment>
        <Layout>
          <Routes>
              <Route 
                  path="/" 
                  element={user ? (user.usertype === "admin" ? <MobileDash /> : <LoginRemake />) : <Navigate to="/" />} 
              />
              <Route element={<OrderConfirmation />} path='/confirmorder' />
              <Route element={<FullHistory />} path='/history' />
              <Route element={<HistoryView />} path='/history/view/1' />
          </Routes>
        </Layout>
    </React.Fragment>
  )
}

export default MobileDashBoard