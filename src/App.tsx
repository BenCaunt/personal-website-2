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
      title: "Tide Robotics SDK",
      description: "Rapid prototyping SDK for robotics applications that layers a flexible, developer-friendly API over a high-performance Zenoh communication backend.",
      image: "/images/tide_logo.svg",
      tags: ["Robotics", "SDK", "Zenoh"],
      link: "https://github.com/NorthCarolinaRivalRobotics/tide"
    },
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
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {/* Background Elements */}
      <MovingGrid size={90} />
      <GradientAccent position="top-right" size={900} color1="rgba(37, 99, 235, 0.35)" color2="rgba(56, 189, 248, 0.18)" />
      <GradientAccent position="bottom-left" size={720} color1="rgba(14, 165, 233, 0.28)" color2="rgba(37, 99, 235, 0.18)" />
      <GradientAccent position="top-left" size={520} color1="rgba(59, 130, 246, 0.25)" color2="rgba(56, 189, 248, 0.18)" />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={`border-b transition-all duration-300 ${
            isScrolling
              ? 'border-white/10 bg-slate-900/85 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(37,99,235,0.6)]'
              : 'border-transparent bg-transparent'
          }`}
          layoutId="navBackground"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.span 
                className="text-2xl font-display font-semibold tracking-tight bg-gradient-to-r from-sky-200 via-blue-100 to-white bg-clip-text text-transparent"
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
                    className={`relative text-sm font-medium tracking-wide text-slate-300 transition-colors hover:text-white ${
                      activeSection === item.toLowerCase().replace(' ', '-') ? 'text-white' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    {activeSection === item.toLowerCase().replace(' ', '-') && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300"
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
                  className="text-slate-300 hover:text-white focus:outline-none"
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
                  className="md:hidden rounded-b-2xl border-t border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-[0_22px_45px_-28px_rgba(37,99,235,0.6)] py-2"
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
                      className={`block px-4 py-3 text-base font-medium transition-colors hover:bg-white/5 ${
                        activeSection === item.toLowerCase().replace(' ', '-') ? 'text-white' : 'text-slate-300'
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
      <section id="hero" className="relative flex flex-col justify-center min-h-[90vh] pt-28 sm:pt-32 md:pt-36 px-6 md:px-8">
        <ParallaxBackground>
          <div className="relative mx-auto max-w-5xl text-center">
            <AnimateOnScroll animation="fadeIn" duration={0.8}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm text-slate-200 shadow-inner">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                Co-founder at WarmHub, building trusted software infrastructure
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={0.15} duration={0.8}>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight tracking-tight bg-gradient-to-r from-sky-200 via-white to-blue-200 bg-clip-text text-transparent">
                Ben Caunt
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideUp" delay={0.25} duration={0.8}>
              <p className="mt-4 text-lg md:text-xl text-slate-300">
                Full Stack Developer & Robotics Enthusiast focused on elegant, reliable systems.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={0.45} duration={0.8}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a 
                  href="#open-source" 
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_55px_-30px_rgba(37,99,235,0.65)]"
                >
                  Explore my work
                  <Briefcase size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-30px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Let's collaborate
                  <Mail size={18} />
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideUp" delay={0.6} duration={0.8}>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-inner">
                  <a 
                    href="https://github.com/BenCaunt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ben-caunt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="https://x.com/bdcauntben" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
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
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </ParallaxBackground>
        <SectionTransition position="bottom" color="from-sky-500/20 via-transparent to-transparent" />
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-28 px-6 md:px-8">
        <SectionTransition position="top" color="from-white/0 via-blue-200/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-300/20 via-transparent to-white/5 opacity-60 blur-3xl" />
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-center mb-12 bg-gradient-to-r from-sky-200 via-white to-blue-200 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <AnimateOnScroll animation="slideRight" delay={0.2} className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-2 backdrop-blur shadow-[0_25px_55px_-35px_rgba(37,99,235,0.45)]">
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-sky-500/20 via-transparent to-white/5" />
                <img
                  src="/images/profile_picture.jpg"
                  alt="Profile"
                  className="relative z-10 h-full w-full rounded-[24px] object-cover"
                />
              </div>
            </AnimateOnScroll>
            <div className="order-2 space-y-6 md:order-1">
              <AnimateOnScroll animation="slideLeft" delay={0.35}>
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_45px_-25px_rgba(37,99,235,0.5)]">
                  <div className="flex items-start gap-4">
                    <span className="rounded-xl bg-white/10 p-3 text-sky-200">
                      <User />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Who I Am</h3>
                      <p className="mt-2 text-slate-300">
                        A passionate developer with a keen eye for creating elegant solutions to complex problems.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slideLeft" delay={0.5}>
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_45px_-25px_rgba(59,130,246,0.5)]">
                  <div className="flex items-start gap-4">
                    <span className="rounded-xl bg-white/10 p-3 text-sky-200">
                      <Briefcase />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Experience</h3>
                      <p className="mt-2 text-slate-300">
                        I'm a Co-founder at WarmHub where we build the infrastructure needed to create a world powered by trusted software. In the past I worked on perception software for surgical robots.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
        <SectionTransition position="bottom" color="from-sky-500/20 via-transparent to-transparent" />
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="relative py-24 md:py-28 px-6 md:px-8">
        <SectionTransition position="top" color="from-sky-500/20 via-blue-500/15 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-center mb-6 bg-gradient-to-r from-sky-200 via-white to-blue-200 bg-clip-text text-transparent">
              Featured Open Source Projects
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeIn" delay={0.1}>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base text-slate-300">
              Highlights from the robotics and perception ecosystem I build out in the open.
            </p>
          </AnimateOnScroll>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <AnimateOnScroll key={index} animation="scale" delay={0.1 * index}>
                <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 p-2 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_28px_65px_-32px_rgba(37,99,235,0.75)]">
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/10 via-transparent to-sky-300/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Video
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="relative z-10 space-y-4 p-6">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="text-base leading-relaxed text-slate-300">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-100/90"
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
                        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition-colors hover:text-white"
                      >
                        <Github size={16} />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        <SectionTransition position="bottom" color="from-sky-500/20 via-transparent to-transparent" />
      </section>

      {/* Robotics Background Section */}
      <section id="robotics" className="relative py-24 md:py-28 px-6 md:px-8">
        <SectionTransition position="top" color="from-white/0 via-sky-300/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/15 via-transparent to-blue-500/10 opacity-80" />
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-center mb-12 bg-gradient-to-r from-sky-200 via-white to-blue-200 bg-clip-text text-transparent">
              Robotics Background
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-8 md:grid-cols-2">
            <AnimateOnScroll animation="slideRight" delay={0.2}>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/65 p-6 backdrop-blur-xl shadow-[0_25px_55px_-32px_rgba(37,99,235,0.65)]">
                <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/10 via-transparent to-sky-300/10" />
                <img
                  src="/images/FTC_robot_still.jpeg"
                  alt="FTC Robot"
                  className="relative z-10 mb-6 h-64 w-full rounded-[22px] object-cover"
                />
                <h3 className="relative z-10 text-xl font-semibold text-white"><i>FIRST</i> Tech Challenge</h3>
                <p className="relative z-10 mt-3 text-slate-300">
                  While in highschool I competed in the <i>FIRST</i> Tech Challenge and <i>FIRST</i> Robotics competition. In 2022 I was fortunate to be 1 of 20 students to win the Dean's List Award at the <i>FIRST</i> World Championship.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideLeft" delay={0.4}>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/65 p-6 backdrop-blur-xl shadow-[0_25px_55px_-32px_rgba(14,165,233,0.6)]">
                <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-blue-500/15 via-transparent to-transparent" />
                <img
                  src="/images/Go2AndFrogbot.png"
                  alt="Go2 and Frogbot"
                  className="relative z-10 mb-6 h-64 w-full rounded-[22px] object-cover"
                />
                <h3 className="relative z-10 text-xl font-semibold text-white">Modern Robotics Development</h3>
                <p className="relative z-10 mt-3 text-slate-300">
                  My current projects utilize the Unitree Go2 quadruped robot (left) and my custom wheeled robot testbed called Frog (right).
                  These platforms allow me to develop and test cutting-edge robotics algorithms and computer vision techniques.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
        <SectionTransition position="bottom" color="from-sky-500/20 via-transparent to-transparent" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 md:py-28 px-6 md:px-8">
        <SectionTransition position="top" color="from-sky-500/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 px-8 py-12 text-center shadow-[0_30px_70px_-32px_rgba(37,99,235,0.6)] backdrop-blur-xl sm:px-12">
            <AnimateOnScroll animation="slideUp">
              <h2 className="text-3xl md:text-5xl font-display font-semibold mb-6 bg-gradient-to-r from-sky-200 via-white to-blue-200 bg-clip-text text-transparent">
                Get In Touch
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={0.2}>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-300">
                I'm always open to new opportunities and interesting open source projects.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale" delay={0.4}>
              <a
                href="mailto:bdcaunt@gmail.com"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-white shadow-[0_22px_55px_-32px_rgba(37,99,235,0.55)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={20} />
                Send me an email
              </a>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideUp" delay={0.6}>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 px-6 py-3 shadow-inner">
                  <a 
                    href="https://github.com/BenCaunt"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
                  >
                    <Github size={28} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ben-caunt"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
                  >
                    <Linkedin size={28} />
                  </a>
                  <a 
                    href="https://x.com/bdcauntben"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-slate-200 transition-transform hover:-translate-y-0.5 hover:text-white"
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
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
