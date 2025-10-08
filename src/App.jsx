import React from 'react';
import ProtectedRoute from './Components/Router/ProtectedRouter';
import Login from './Components/User/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error'; // Make sure this is imported
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Leads from './Components/Leads';
import Admin from './Components/Admin';
import User from './Components/User';
import Sos from './Components/Sos';
import Info from './Components/Info';
import ListingInfo from './Components/ListingInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sos"
          element={
            <ProtectedRoute>
              <Sos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/info"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/infoList"
          element={
            <ProtectedRoute>
              <ListingInfo />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route must be last */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
