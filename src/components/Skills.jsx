import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaChartLine, FaBrain, FaChartBar, FaDatabase, FaCalculator } from 'react-icons/fa'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      icon: <FaCode />,
      title: "Programming Languages",
      skills: ["Python", "SQL", "R", "JavaScript"]
    },
    {
      icon: <FaChartLine />,
      title: "Data Science",
      skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"]
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      skills: ["Linear Regression", "Statistical Inference", "Predictive Modeling", "EDA"]
    },
    {
      icon: <FaChartBar />,
      title: "Visualization",
      skills: ["Tableau", "Power BI", "Plotly", "Dashboards"]
    },
    {
      icon: <FaDatabase />,
      title: "Data Management",
      skills: ["SQL Databases", "Data Cleaning", "ETL Processes", "Data Warehousing"]
    },
    {
      icon: <FaCalculator />,
      title: "Mathematics",
      skills: ["Applied Mathematics", "Statistics", "Probability", "Linear Algebra"]
    }
  ]

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="skills-grid" ref={ref}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.05, delay: 0.05 + categoryIndex * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <h3>
                <span className="skill-icon">{category.icon}</span>
                {category.title}
              </h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 0.1, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.1 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#3b82f6",
                      color: "white"
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
