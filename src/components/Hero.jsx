import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import profileImage from '../assets/Shashidhar_Hegde.jpg'

const Hero = () => {
  const [text, setText] = useState('')
  const fullText = "Data Scientist & AI Engineer"
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 6
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Shashi Hegde</span>
            </h1>
            
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {text}
              {isTyping && <span className="cursor">|</span>}
            </motion.h2>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Detail-oriented software engineer transitioning into AI and Data Science. 
              Currently pursuing M.Tech in AI & Data Science at PES University, 
              passionate about leveraging data to solve complex problems.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection('#projects')}
              >
                View My Work
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollToSection('#contact')}
              >
                Get In Touch
              </button>
            </motion.div>

            <motion.div
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/hegde-shashi/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com/hegde-shashi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="mailto:hegdeshashidhar123@gmail.com"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="profile-card card glow">
              <div className="profile-image-container">
                <img 
                  src={profileImage} 
                  alt="Shashi Hegde" 
                  className="profile-image"
                />
                <div className="profile-image-overlay"></div>
              </div>
              <div className="profile-info">
                <h3>Shashi Hegde</h3>
                <p>M.Tech AI & Data Science</p>
                <p>PES University</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
