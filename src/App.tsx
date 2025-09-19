import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResponsiveAppBar from "./components/UI/ResponsiveAppBar";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import CoursesPage from "./pages/CoursesPage";
import TeachersPage from "./pages/TeachersPage";
import MethodologyPage from "./pages/MethodologyPage";
import OnlyRegistered from "./components/auth/OnlyRegistered";
import ProfilePage from "./pages/ProfilePage";
import MyCoursesPage from "./pages/MyCoursesPage";
import CourseInfoPage from "./pages/CourseInfoPage";
import ContactPage from "./pages/ContactPage";
import CourseNewPage from "./pages/CourseNewPage";
import OnlyAdmin from "./components/auth/OnlyAdmin";
import CourseClassListPage from "./pages/CourseClassListPage";
import UserListPage from "./pages/UserListPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDrawer from "./components/user/AdminDrawer";
import { useContext, useState } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
  const { role } = useContext(AuthContext);

  // elevated admin drawer state so it can be controlled from the App level
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  return (
    <>
  <ResponsiveAppBar onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)} />
  {role === "Admin" && <AdminDrawer isOpen={isAdminDrawerOpen} setIsOpen={setIsAdminDrawerOpen} />}
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
        <Route path="/my-courses" element={<OnlyRegistered><MyCoursesPage /></OnlyRegistered>} />
        <Route path="/course/:courseId" element={<OnlyRegistered><CourseInfoPage /></OnlyRegistered>} />
        <Route path="/course/newCourse" element={<OnlyAdmin><CourseNewPage /></OnlyAdmin>} />
        <Route path="/course/:courseId/classes" element={<OnlyRegistered><CourseClassListPage /></OnlyRegistered>} />
        <Route path="/checkout" element={<OnlyRegistered><CheckoutPage /></OnlyRegistered>} />
        
        {/* <Route path="/enrollment/:enrollmentId" element={<OnlyRegistered><CourseInfoPage /></OnlyRegistered>} /> */}

        {/* ADMIN ROUTES */}
        <Route path="/users" element={<OnlyAdmin><UserListPage /></OnlyAdmin>} />
        

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
