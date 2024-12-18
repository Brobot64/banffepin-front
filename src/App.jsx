import './App.css';
import './style/minimain.css'
import Login from './screens/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './screens/Dashboard';
import LoginRemake from './screens/LoginRemake';
import MobileDashBoard from './screens/MobileDashBoard';
import { SecTemp } from './components/remake/ReactPdf';
// import { configDotenv } from 'dotenv';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
        <Route element={<LoginRemake/>} path='/'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<SecTemp/>} path='/temp'/>
          <Route element={<Dashboard/>} path='/dashboard/*'/>
          <Route element={<MobileDashBoard/>} path='/mobile/*'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
