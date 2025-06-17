import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";

import LoginOrRegisterPage from "./pages/LoginOrRegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
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
          <Route path="/LoginOrRegister" element={<LoginOrRegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/shops"
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller"]}>
                <ShopListPage />
              </ProtectedRoute>
            }
          />

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

          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
