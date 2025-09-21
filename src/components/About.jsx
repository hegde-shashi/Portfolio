import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: 'M.Tech', label: 'AI & Data Science' },
    { number: '10+', label: 'Projects Completed' }
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <div className="about-content" ref={ref}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I'm a detail-oriented software engineer with 3 years of experience in software quality and testing, 
              now transitioning into AI and Data Science. Currently pursuing an M.Tech in AI & Data Science at PES University, 
              where I focus on predictive modeling, statistical analysis, and data visualization.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Proficient in Python, SQL, Pandas, NumPy, Scikit-learn, and Tableau, with a solid foundation in 
              Linear Regression, Statistical Inference, and Applied Mathematics. Experienced in building projects 
              involving machine learning models, exploratory data analysis (EDA), and interactive dashboards 
              to deliver business insights.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Passionate about leveraging data to solve complex problems and drive decision-making. 
              Actively seeking opportunities as a Data Analyst, Junior Data Scientist, or Entry-Level 
              Machine Learning Engineer to contribute to impactful, data-driven solutions.
            </motion.p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.05, delay: 0.05 + index * 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.h3
                  className="gradient-text"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2, delay: 0.8 + index * 0.2 }}
                >
                  {stat.number}
                </motion.h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
