import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div id="contact" className="min-h-screen pt-20 py-12 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-300 text-center mb-12">
          I'm always open to discussing new opportunities and interesting projects
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">samir.mahmoud@email.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">Available for Remote Work</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/samirmahmoud"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cursor-pointer"
                >
                  <Github className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="cursor-pointer">
                  <Linkedin className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a href="#contact" aria-label="Email" className="cursor-pointer">
                  <Mail className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
