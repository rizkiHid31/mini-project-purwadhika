import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./pages/landingPage";
import ExplorePage from "./pages/explorePage";
import LogInPage from "./pages/logInPage";
import SignUpPage from "./pages/signUpPage";
import CreateEventPage from "./pages/createEventPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
