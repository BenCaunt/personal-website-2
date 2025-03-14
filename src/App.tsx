import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Briefcase, User, ChevronDown } from 'lucide-react';
import Video from './components/Video';

// Extend Window interface to include scrollTimeout property
declare global {
  interface Window {
    scrollTimeout: ReturnType<typeof setTimeout>;
  }
}

// Define Project interface
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 150);

      const sections = ['hero', 'about', 'robotics', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
    {
      title: "Go2 Sbus Unleashed",
      description: "Allows owners of the locked down Unitree Go2 air and pro robots to build intelligent functionality without the need for a jailbreak by exploiting the integrated S-BUS port and utilizing external computation for navigation.",
      image: "/images/go2demo.mp4",
      tags: ["Robotics", "Unitree Go2", "Zenoh"],
      link: "https://github.com/BenCaunt/go2-sbus-unleashed"
    },
    {
      title: "Moondream Real-time Robot VLM",
      description: "Using the moondream small Vision language model for real time, promptable object detection for robotics. Combines observations with optical flow to get precise, promptable, object tracking.",
      image: "/images/MoondreamRealtimeRobotVLM.gif",
      tags: ["Computer Vision", "VLM", "Robotics"],
      link: "https://github.com/BenCaunt/MoondreamObjectTracking"
    },
    {
      title: "Real-time Monocular Odometry",
      description: "Fast, monocular pose estimation from a single camera. Open source release coming soon.",
      image: "/images/RealtimeMonocularOdometry.gif",
      tags: ["Computer Vision", "Odometry", "Robotics", "SLAM"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/70 via-yellow-50 to-yellow-100/50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolling ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              BC
            </span>
            <div className="hidden md:flex space-x-8">
              {['About', 'Robotics', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-gray-700 hover:text-yellow-600 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-yellow-600 font-semibold' : ''
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            Ben Caunt
          </h1>
          <p className="text-2xl text-gray-700 mb-4">Full Stack Developer, & Robotics Enthusiast</p>
          <div className="flex items-center justify-center mb-8">
            <p className="text-xl text-gray-700">
              Co-founder at WarmHub where we create the tools needed to build a world powered by trusted software.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/BenCaunt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ben-caunt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://x.com/bdcauntben" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                stroke="currentColor" 
                fill="none" 
                className="lucide lucide-twitter"
              >
                <path d="M16.99 0h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L3.736 19.5H.426l7.73-8.835L0 0h6.826l4.713 6.231L16.99 0zm-1.161 17.52h1.833L5.83 1.876H3.83L15.829 17.52z"/>
              </svg>
            </a>
            <a 
              href="mailto:bdcaunt@gmail.com" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
          <a
            href="#about"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown size={32} className="text-gray-600" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <User className="text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Who I Am</h3>
                  <p className="text-gray-700">
                    A passionate developer with a keen eye for creating elegant solutions to complex problems.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Code className="text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">What I Do</h3>
                  <p className="text-gray-700">
                    I work to align the incentives of the software industry to focus on creating simple, compotent, and trusted software to run the world.  
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Briefcase className="text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Experience</h3>
                  <p className="text-gray-700">
                    Medical device prototyping, robotics software, and full-stack web development.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/profile_picture.jpg"
                alt="Profile"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Robotics Background Section */}
      <section id="robotics" className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-yellow-50/50 to-yellow-50/80">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            Robotics Background
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/images/FTC_robot_still.jpeg"
                alt="FTC Robot"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">FIRST Tech Challenge</h3>
              <p className="text-gray-700">
                Throughout highschool I competed in the FIRST Tech Challenge and FIRST Robotics compeition.  In 2022 I was fortunate to be 1 of 20 students to win the Dean's List Award at the World Championship in Houston Texas. 
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/images/Go2AndFrogbot.png"
                alt="Go2 and Frogbot"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Modern Robotics Development Stack</h3>
              <p className="text-gray-700">
                My current projects utilize the Unitree Go2 quadruped robot (left) and my custom wheeled robot testbed called Frog (right).
                These platforms allow me to develop and test cutting-edge robotics algorithms and computer vision techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Video
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
                    >
                      <Github size={16} className="mr-1" />
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            I'm always open to new opportunities and interesting projects.
          </p>
          <a
            href="mailto:bdcaunt@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            Send me an email
          </a>
          <div className="mt-12 flex justify-center space-x-6">
            <a 
              href="https://github.com/BenCaunt"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ben-caunt"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://x.com/bdcauntben"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="28" 
                height="28" 
                stroke="currentColor" 
                fill="none" 
                className="lucide lucide-twitter"
              >
                <path d="M16.99 0h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L3.736 19.5H.426l7.73-8.835L0 0h6.826l4.713 6.231L16.99 0zm-1.161 17.52h1.833L5.83 1.876H3.83L15.829 17.52z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;