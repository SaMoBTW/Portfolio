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
import { skills } from "../data/Skills";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-blue-400" /> Background
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a passionate software developer currently pursuing my Master's
              in Computer Science, with a solid foundation from my Bachelor's in
              Computer Information Systems.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-blue-400" /> Education
            </h3>
            <p className="text-gray-300 leading-relaxed">
              B.S. in Computer Information Systems, pursuing M.S. in Computer
              Science.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
          <Code className="w-6 h-6 mr-3 text-blue-400" /> Skills & Technologies
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-white font-semibold mb-4">
                {group.category}
              </h4>
              <ul className="space-y-2">
                {group.items.map((s, idx) => (
                  <li key={idx} className="text-gray-300 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
