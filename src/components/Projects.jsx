import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaChartLine, FaDatabase, FaBrain, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      icon: <FaChartLine />,
      title: "Predictive Analytics Dashboard",
      description: "Built an interactive dashboard using Tableau and Python to predict customer behavior and sales trends. Implemented machine learning models for forecasting.",
      tech: ["Python", "Tableau", "Scikit-learn"],
      github: "#",
      demo: "#"
    },
    {
      icon: <FaDatabase />,
      title: "Data Pipeline & ETL System",
      description: "Developed a comprehensive ETL pipeline for processing large datasets, including data cleaning, transformation, and loading into data warehouses.",
      tech: ["Python", "SQL", "Pandas"],
      github: "#",
      demo: "#"
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning Model Suite",
      description: "Created multiple ML models for classification and regression tasks, including feature engineering, model selection, and performance evaluation.",
      tech: ["Scikit-learn", "NumPy", "Matplotlib"],
      github: "#",
      demo: "#"
    }
  ]

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid" ref={ref}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.05, delay: 0.05 + index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div
                className="project-image"
                whileHover={{}}
                transition={{ duration: 0.3 }}
              >
                {project.icon}
              </motion.div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + techIndex * 0.1 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="project-links">
                  <motion.a
                    href={project.github}
                    className="project-link"
                    whileHover={{}}
                    whileTap={{}}
                  >
                    <FaGithub />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    className="project-link"
                    whileHover={{}}
                    whileTap={{}}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
