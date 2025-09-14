import React, { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ProjectsPage from "./pages/Projects";
import ContactPage from "./pages/ContactMe";
import AdminPage from "./pages/Login";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "admin" && (
        <AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      )}
    </div>
  );
}
