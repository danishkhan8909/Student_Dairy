import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";

function PrivateRoute({ children }) {
  const {user, loading }  = useAuth();
  if (loading) return <p>Loading....</p>;
  return user ? children : <Login/>;
}
export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          {/* <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}