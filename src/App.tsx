import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResponsiveAppBar from "./components/main/ResponsiveAppBar";
import MainPage from "./pages/public/MainPage";
import NotFoundPage from "./pages/public/NotFoundPage";

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
