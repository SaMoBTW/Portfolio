import React from "react";

interface Props {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation: React.FC<Props> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Samir Mahmoud</h1>
          <div className="flex space-x-6">
            {["home", "about", "projects", "contact", "admin"].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize transition-colors cursor-pointer hover:cursor-pointer ${
                  currentPage === page
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
