import React, { useState } from "react";
import {
  User,
  Code,
  Mail,
  Github,
  Linkedin,
  Monitor,
  Edit,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";

interface Props {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<Props> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen pt-20 flex items-center bg-gray-900 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-lg text-blue-400 font-medium">
              👋 Hello there! I'm
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Samir
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mahmoud
              </span>
            </h1>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
            <div className="relative bg-gray-900 border border-gray-700 rounded-lg px-6 py-4">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-blue-400 font-semibold">
                  Aspiring Software Engineer
                </span>{" "}
                &{" "}
                <span className="text-purple-400 font-semibold">
                  Web Developer
                </span>{" "}
                pursuing my Master's in Computer Science. I build modern web
                applications with clean code and user-focused design.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">5+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentPage("projects")}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-blue-600/25 hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center">
                View My Projects
                <Code className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="group border-2 border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium hover:bg-blue-500/10 hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Get In Touch
                <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative flex items-center justify-center">
          <Monitor className="w-24 h-24 text-white/80" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
