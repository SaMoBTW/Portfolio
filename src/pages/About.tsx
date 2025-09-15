import { Code, GraduationCap, User } from "lucide-react";
import { SKILLS } from "../data/Skills";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-400" />
              Background
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a passionate software developer currently pursuing my Master's in Computer Science, with a solid
              foundation from my Bachelor's in Computer Information Systems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My goal is to create efficient, scalable, and user-friendly applications that solve real-world problems.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-blue-400" />
              Education
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium">Master of Science in Computer Science</h4>
                <p className="text-gray-300 text-sm">University Name</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-sm">2024 - Present</span>
                  <span className="text-sm px-2 py-1 rounded bg-blue-900 text-blue-300">In Progress</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium">Bachelor of Science in Computer Information Systems</h4>
                <p className="text-gray-300 text-sm">University Name</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-sm">2020 - 2024</span>
                  <span className="text-sm px-2 py-1 rounded bg-green-900 text-green-300">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-400" />
              Experience
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-white font-semibold text-lg">Software Development Intern</h4>
                  <span className="text-blue-400 font-medium">Tech Company</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">Summer 2023</p>
                <p className="text-gray-300">Developed web applications using React and Spring Boot</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-white font-semibold text-lg">Teaching Assistant</h4>
                  <span className="text-blue-400 font-medium">University Name</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">2023 - 2024</p>
                <p className="text-gray-300">Assisted students with programming concepts and project development</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <Code className="w-6 h-6 mr-3 text-blue-400" />
              Skills & Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((skillGroup, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4">{skillGroup.category}</h4>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-300 text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
