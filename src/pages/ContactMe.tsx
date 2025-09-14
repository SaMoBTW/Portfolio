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

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-gray-300 text-center mb-12">
          I'm always open to new opportunities and collaborations.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Info
            </h3>
            <p className="text-gray-300 flex items-center mb-2">
              <Mail className="w-5 h-5 text-blue-400 mr-3" />{" "}
              samir.mahmoud@email.com
            </p>
            <p className="text-gray-300 flex items-center">
              <MapPin className="w-5 h-5 text-blue-400 mr-3" /> Remote Available
            </p>
          </div>
          <div>
            <form className="space-y-4">
              <input
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                placeholder="Name"
              />
              <input
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                placeholder="Email"
              />
              <textarea
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                placeholder="Message"
                rows={5}
              ></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
