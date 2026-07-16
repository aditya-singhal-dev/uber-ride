import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/userLogin';
import UserSignup from './pages/userSignup';
import CaptainLogin from './pages/captainLogin';
import CaptainSignup from './pages/captainSignup';
import Start from './pages/start';
import UserProtectWrapper from './pages/UserprotectWrapper';
import UserLogout  from './pages/UserLogout';
import CaptainHome from './pages/captainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import RidePage from './pages/ridePage';
import SosPage from './pages/sosPage';
import AccountPage from './pages/accountPage';
import LocationPanel from '../components/LocationPanel';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/Home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>} />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>} />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>}
            />
          <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <UserLogout/>
          </CaptainProtectWrapper>} />
          <Route path='/ride' element={
            <UserProtectWrapper>
              <RidePage />
            </UserProtectWrapper>
          } />
          <Route path='/sos' element={
            <UserProtectWrapper>
              <SosPage />
            </UserProtectWrapper>
          } />
          <Route path='/account' element={
            <UserProtectWrapper>
              <AccountPage />
            </UserProtectWrapper>
          } />
          <Route path='/locationpanel' element={
            <UserProtectWrapper>
              <LocationPanel />
            </UserProtectWrapper>
          } />
      </Routes>
      

    </div>
  );
};

export default App;