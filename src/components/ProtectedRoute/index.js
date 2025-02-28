// import {Navigate, Route} from 'react-router-dom'
// import Cookie from 'js-cookie'

// const ProtectedRoute = props => {
//   const token = Cookie.get('jwt_token')
//   if (token === undefined) {
//     return <Navigate to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute


import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';

const App = () => (
  <Routes>
    {/* Regular route */}
    <Route path="/" element={<Home />} />
    
    {/* Protected route */}
    <Route
      path="/protected"
      element={
        <ProtectedRoute element={<ProtectedPage />} />
      }
    />
    
    {/* Login route */}
    <Route path="/login" element={<Login />} />
  </Routes>
);
