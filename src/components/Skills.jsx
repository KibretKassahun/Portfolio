import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skillCategories, techBadges } from '../data/skills';
import { FiCode, FiServer, FiWifi, FiCpu, FiActivity } from 'react-icons/fi';

const iconMap = {
  FaCode: FiCode,
  FaServer: FiServer,
  FaNetworkWired: FiWifi,
  FaMicrochip: FiCpu,
  FaChartLine: FiActivity,
};

const colorMap = {
  primary: {
    bar: 'bg-primary-500',
    tab: 'bg-primary-600 text-white',
  },
  secondary: {
    bar: 'bg-secondary-500',
    tab: 'bg-secondary-600 text-white',
  },
  purple: {
    bar: 'bg-purple-500',
    tab: 'bg-purple-600 text-white',
  },
  orange: {
    bar: 'bg-orange-500',
    tab: 'bg-orange-600 text-white',
  },
  rose: {
    bar: 'bg-rose-500',
    tab: 'bg-rose-600 text-white',
  },
};

function SkillBar({ name, level, color, inView, delay }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorMap[color].bar}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('networking');

  const activeCategory = skillCategories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            Skills
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Networking and hardware are my primary domain — software development supports and extends that expertise.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || FiCode;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? `${colorMap[cat.color].tab} border-transparent shadow-md`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills panel */}
        {activeCategory && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm mb-12"
          >
            <div className="grid sm:grid-cols-2 gap-x-12">
              {activeCategory.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={activeCategory.color}
                  inView={inView}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
            Technologies &amp; Tools
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techBadges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="px-3.5 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
