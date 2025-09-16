import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResponsiveAppBar from "./components/main/ResponsiveAppBar";
import MainPage from "./pages/public/MainPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import CoursesPage from "./pages/public/CoursesPage";
import TeachersPage from "./pages/public/TeachersPage";
import MethodologyPage from "./pages/public/MethodologyPage";
import { ContactPage } from "@mui/icons-material";
import OnlyRegistered from "./components/protection/OnlyRegistered";
import ProfilePage from "./pages/private/ProfilePage";

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* PRIVATE ROUTES */}
        <Route path="/profile" element={<OnlyRegistered><ProfilePage /></OnlyRegistered>} />


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
