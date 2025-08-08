import { Routes, Route } from "react-router-dom";
import LandingPage from "./Routes/LandingPage";
import Solutions from "./Pages/Solutions";
import Industries from "./Pages/Industries";
import Demo from "./Pages/Demo";
import GetStarted from "./Pages/GetStarted";
import AIMailCompose from "./Pages/AIMailCompose";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Routes/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyResetCode from "./Pages/VerifyResetCode";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Hero from "./Pages/Hero";
import GoogleSuccess from "./Pages/GoogleSuccess";
import MailGenerator from "./Pages/MailGenerator";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<LandingPage />}>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/google-linked-success" element={<GoogleSuccess />} />
        <Route path="/mail-generate" element={<MailGenerator />} />
        <Route
          path="/ai-mail-compose"
          element={
            <ProtectedRoute>
              <AIMailCompose />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
