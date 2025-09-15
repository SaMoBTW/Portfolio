import { Code, Github, Linkedin, Mail, Monitor, User } from "lucide-react";

type Props = {
  setCurrentPage: (page: string) => void;
};

export default function HomePage({ setCurrentPage }: Props) {
  return (
    <div className="min-h-screen pt-20 flex items-center bg-gray-900 relative overflow-hidden">
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
            <div className="text-lg text-blue-400 font-medium">Hello there! I'm</div>
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
                <span className="text-blue-400 font-semibold">Aspiring Software Engineer</span> &
                <span className="text-purple-400 font-semibold"> Web Developer</span> pursuing my Master's in
                Computer Science. I build modern web applications with clean code and user-focused design.
              </p>
            </div>
          </div>

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

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage("projects")}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-blue-600/25 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center">
                View My Projects
                <Code className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage("contact")}
              className="group border-2 border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium hover:bg-blue-500/10 hover:scale-105 cursor-pointer"
            >
              <span className="flex items-center justify-center">
                Get In Touch
                <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <span className="text-gray-400 text-sm">Connect with me:</span>
            <div className="flex space-x-4">
              <a
                href="https://github.com/samirmahmoud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Github className="relative w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Linkedin className="relative w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110" />
              </a>
              <a href="#contact" aria-label="Email" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <Mail className="relative w-6 h-6 text-gray-400 group-hover:text-red-400 transition-all duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="w-96 h-96 border-2 border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
            <div
              className="absolute inset-8 w-80 h-80 border-2 border-purple-500/20 rounded-full animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            ></div>
            <div className="absolute inset-16 w-64 h-64 border-2 border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: "10s" }}></div>
          </div>

          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-30 blur-sm animate-pulse"></div>
            <div className="absolute inset-0 w-64 h-64 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Monitor className="w-24 h-24 text-white/80" />
                <div className="absolute -top-8 -right-8 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <div className="absolute -bottom-8 -left-8 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}>
                  <Github className="w-8 h-8 text-purple-400" />
                </div>
                <div className="absolute top-0 -left-12 animate-bounce" style={{ animationDelay: "2s", animationDuration: "3s" }}>
                  <div className="w-6 h-6 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-6 text-gray-500 text-sm">
          <button
            type="button"
            onClick={() => setCurrentPage("about")}
            className="hover:text-blue-400 transition-colors flex items-center cursor-pointer"
          >
            <User className="w-4 h-4 mr-1" />
            About
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("projects")}
            className="hover:text-purple-400 transition-colors flex items-center cursor-pointer"
          >
            <Code className="w-4 h-4 mr-1" />
            Projects
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("contact")}
            className="hover:text-cyan-400 transition-colors flex items-center cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
