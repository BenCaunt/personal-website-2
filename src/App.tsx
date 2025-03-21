import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Briefcase, User, ChevronDown } from 'lucide-react';
import Video from './components/Video';
import AnimateOnScroll from './components/AnimateOnScroll';
import ParallaxBackground from './components/ParallaxBackground';
import SectionTransition from './components/SectionTransition';
import { motion, AnimatePresence } from 'framer-motion';
import MovingGrid from './components/MovingGrid';
import GradientAccent from './components/GradientAccent';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 150);

      const sections = ['hero', 'about', 'robotics', 'open-source', 'contact'];
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
      title: "Go2 Sbus Open SDK",
      description: "Allows owners of the locked down Unitree Go2 air and pro robots to build intelligent functionality without the need for a jailbreak by exploiting the integrated S-BUS port and utilizing external computation for navigation.",
      image: "/images/go2demo.mp4",
      tags: ["Robotics", "Unitree Go2", "Zenoh"],
      link: "https://github.com/BenCaunt/go2-sbus-unleashed"
    },
    {
      title: "Moondream Real-time Robot VLM",
      description: "Using the moondream small Vision language model for real time, promptable object detection for robotics. Combines observations with optical flow to achieve real-time, promptable object tracking.",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Background Elements */}
      <MovingGrid size={70} color="rgba(59, 130, 246, 0.06)" dotColor="rgba(59, 130, 246, 0.15)" />
      <GradientAccent position="top-right" size={800} color1="rgba(59, 130, 246, 0.15)" color2="rgba(59, 130, 246, 0.05)" />
      <GradientAccent position="bottom-left" size={600} color1="rgba(37, 99, 235, 0.15)" color2="rgba(59, 130, 246, 0.05)" />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={`transition-all duration-300 ${isScrolling ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
          layoutId="navBackground"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BC
              </motion.span>
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['About','Open Source',  'Robotics', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className={`text-gray-700 hover:text-blue-600 transition-colors ${
                      activeSection === item.toLowerCase().replace(' ', '-') ? 'text-blue-600 font-semibold' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    {activeSection === item.toLowerCase().replace(' ', '-') && (
                      <motion.div
                        className="h-1 bg-blue-500 mt-1 rounded-full"
                        layoutId="activeSection"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  aria-label="Toggle navigation menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </motion.button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  className="md:hidden bg-white/95 backdrop-blur-md rounded-b-lg shadow-lg py-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {['About', 'Open Source', 'Robotics',  'Contact'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2 text-base font-medium hover:bg-blue-50 ${
                        activeSection === item.toLowerCase().replace(' ', '-') ? 'text-blue-600 font-semibold' : 'text-gray-700'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[80vh] flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 px-6 md:px-4 relative">
        <ParallaxBackground>
          <div className="text-center">
            <AnimateOnScroll animation="fadeIn" duration={0.8}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Ben Caunt
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideUp" delay={0.2} duration={0.8}>
              <p className="text-xl md:text-2xl text-gray-700 mb-4">Full Stack Developer & Robotics Enthusiast</p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideUp" delay={0.6} duration={0.8}>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://github.com/BenCaunt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ben-caunt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://x.com/bdcauntben" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
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
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={0.4} duration={0.4}>
              <a
                href="#about"
                className="absolute bottom-10 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce"
              >
                <ChevronDown size={28} className="text-gray-600" />
              </a>
            </AnimateOnScroll>
          </div>
        </ParallaxBackground>
        <SectionTransition position="bottom" />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-12 md:py-16 px-6 md:px-4 relative">
        <SectionTransition position="top" />
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <AnimateOnScroll animation="slideRight" delay={0.2} className="relative order-1 md:order-2">
              <img
                src="/images/profile_picture.jpg"
                alt="Profile"
                className="rounded-lg shadow-xl w-full"
              />
            </AnimateOnScroll>
            <div className="space-y-6 order-2 md:order-1">
              <AnimateOnScroll animation="slideLeft" delay={0.3}>
                <div className="flex items-start space-x-4">
                  <User className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Who I Am</h3>
                    <p className="text-gray-700">
                      A passionate developer with a keen eye for creating elegant solutions to complex problems.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideLeft" delay={0.5}>
                <div className="flex items-start space-x-4">
                  <Briefcase className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Experience</h3>
                    <p className="text-gray-700">
                      I'm a Co-founder at WarmHub where we build the infrastructure needed to create a world powered by trusted software.  In the past I worked on perception software for surgical robots.  

                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
        <SectionTransition position="bottom" color="from-yellow-50/50 to-yellow-50/80" />
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="min-h-screen py-12 md:py-16 px-6 md:px-4 relative">
        <SectionTransition position="top" color="from-yellow-50/50 to-yellow-50/80" />
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Featured Open Source Projects
            </h2>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <AnimateOnScroll key={index} animation="scale" delay={0.1 * index}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Video
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
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
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Github size={16} className="mr-1" />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        <SectionTransition position="bottom" color="from-yellow-50/70 to-yellow-50/90" />
      </section>

      {/* Robotics Background Section */}
      <section id="robotics" className="min-h-screen flex items-center justify-center py-12 md:py-16 px-6 md:px-4 bg-gradient-to-br from-gray-100/50 to-gray-200/80 relative">
        <SectionTransition position="top" color="from-gray-100/70 to-gray-200/90" />
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Robotics Background
            </h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <AnimateOnScroll animation="slideRight" delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="/images/FTC_robot_still.jpeg"
                  alt="FTC Robot"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-2"><i>FIRST</i> Tech Challenge</h3>
                <p className="text-gray-700">
                  While in highschool I competed in the <i>FIRST</i> Tech Challenge and <i>FIRST</i> Robotics competition.  In 2022 I was fortunate to be 1 of 20 students to win the Dean's List Award at the <i>FIRST</i> World Championship. 
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideLeft" delay={0.4}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="/images/Go2AndFrogbot.png"
                  alt="Go2 and Frogbot"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-2">Modern Robotics Development</h3>
                <p className="text-gray-700">
                  My current projects utilize the Unitree Go2 quadruped robot (left) and my custom wheeled robot testbed called Frog (right).
                  These platforms allow me to develop and test cutting-edge robotics algorithms and computer vision techniques.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
        <SectionTransition position="bottom" color="from-gray-100/70 to-gray-200/90" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-12 md:py-16 px-6 md:px-4 relative">
        <SectionTransition position="top" />
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeIn" delay={0.2}>
            <p className="text-xl text-gray-700 mb-8">
              I'm always open to new opportunities and interesting open source projects.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="scale" delay={0.4}>
            <a
              href="mailto:bdcaunt@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Mail className="mr-2" size={20} />
              Send me an email
            </a>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slideUp" delay={0.6}>
            <div className="mt-12 flex justify-center space-x-6">
              <a 
                href="https://github.com/BenCaunt"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Github size={28} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ben-caunt"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={28} />
              </a>
              <a 
                href="https://x.com/bdcauntben"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
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
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}

export default App;