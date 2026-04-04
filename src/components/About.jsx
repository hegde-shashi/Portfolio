import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "M.Tech", label: "AI & Data Science" },
    { number: "10+", label: "Projects Completed" },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          About Me
        </motion.h2>

        <div className="about-content" ref={ref}>
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.3, delay: 0.06 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.12 }}
            >
              Detail-oriented software engineer with 3 years of experience in
              software development, automation, and testing, currently building
              expertise in AI, Data Science, and Machine Learning. Pursuing an
              M.Tech in AI & Data Science at PES University, with hands-on
              experience in Python, SQL, Pandas, NumPy, Scikit-learn, Tableau,
              and data-driven application development.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.18 }}
            >
              Built projects in resume analysis, medical query assistance,
              machine learning, exploratory data analysis, and dashboarding,
              with practical exposure to RAG, LLM workflows, LangChain,
              LangGraph, and vector search. Strong foundation in statistics,
              predictive modeling, data analysis, and problem-solving, with
              experience delivering automation and analytical solutions in
              professional environments.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.14 }}
            >
              Passionate about applying AI and data science to solve real-world
              problems and generate meaningful business impact. Actively seeking
              opportunities as a Data Scientist, AI/ML Engineer, or Machine
              Learning Engineer.
            </motion.p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item card"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.05, delay: 0.05 + index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <motion.h3
                  className="gradient-text"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2, delay: 0.14 + index * 0.2 }}
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
  );
};

export default About;
