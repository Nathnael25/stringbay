import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SellerDashboard from "./pages/SellerDashboard";
import ShopListPage from "./pages/ShopListPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AddInstrumentPage from "./pages/AddInstrumentPage";
<Route path="/shops/:id" element={<ShopDetailPage />} />;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/shops" element={<ShopListPage />} />
          <Route path="/shops/:id" element={<ShopDetailPage />} />
          <Route
            path="/instruments/new"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AddInstrumentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["seller", "buyer"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
