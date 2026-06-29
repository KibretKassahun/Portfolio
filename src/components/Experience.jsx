import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { experiences } from '../data/experience';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            Experience
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Professional Journey
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-800 items-center justify-center">
                  <FiBriefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>

                {/* Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <FiCheckCircle className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
