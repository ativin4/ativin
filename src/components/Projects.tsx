interface Project {
  title: string;
  description: string;
  demo?: string;
  github?: string;
  stack: string[];
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio built with Next.js and Three.js",
    demo: "/",
    github: "https://github.com/yourusername/portfolio",
    stack: ["Next.js", "TypeScript", "Three.js"],
  },
  // Add more projects here
];

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
  return (
    <section className="section-container py-12">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants} className="card">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <p className="text-sm text-gray-400 mb-2">
              Stack: {project.stack.join(", ")}
            </p>
            <div className="flex gap-2">
              {project.demo && (
                <a
                  href={project.demo}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
