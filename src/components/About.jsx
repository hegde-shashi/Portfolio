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
              I am an AI Engineer with 4 years of software engineering
              experience focused on building Generative AI, NLP, and intelligent
              application solutions. My professional experience includes
              developing RAG-based systems, document intelligence workflows, and
              multi-agent applications, with a strong interest in applying AI to
              solve real-world business problems and improve information
              retrieval and automation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.18 }}
            >
              Currently, I am pursuing an M.Tech in Artificial Intelligence &
              Data Science at PES University, where I am strengthening my
              knowledge in machine learning, deep learning, statistics, and AI
              systems while working on practical projects involving real-world
              datasets. I have hands-on experience with Python, SQL, Pandas,
              NumPy, and scikit-learn, along with machine learning and deep
              learning techniques including classification, regression,
              clustering, CNNs, and model optimization.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.14 }}
            >
              Alongside traditional machine learning, I have been working
              extensively with Generative AI technologies, including Large
              Language Models (LLMs), Retrieval-Augmented Generation (RAG),
              semantic search, prompt engineering, LangChain, LangGraph, Gemini,
              and vector databases. I have built solutions involving policy
              information retrieval, multi-agent chatbots, resume analysis, and
              domain-specific AI applications, and enjoy transforming complex
              requirements into practical, scalable AI-driven solutions.
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
