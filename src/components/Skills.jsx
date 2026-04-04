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
      skills: ["Python", "SQL", "Bash"]
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      skills: ["Scikit-learn", "XGBoost", "TensorFlow", "Keras", "Time Series Analysis", "Feature Engineering", "Model Evaluation"]
    },
    {
      icon: <FaChartLine />,
      title: "Data and Analytics",
      skills: ["Pandas", "NumPy", "statmodels", "SciPy", "A/B Testing", "Predictive Modeling", "ETL Processes"]
    },
    {
      icon: <FaChartBar />,
      title: "Generative AI and LLMs",
      skills: ["RAG", "LangChain", "LangGraph", "Vector Search", "LLM Workflows", "Prompt Engineering"]
    },
    {
      icon: <FaDatabase />,
      title: "Tools and Platforms",
      skills: ["AWS", "Azure", "Flask", "Tableau", "Git", "CI/CD", "Docker", "Jupyter Notebooks", "VS Code"]
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
          transition={{ duration: 0.3 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="skills-grid" ref={ref}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
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
