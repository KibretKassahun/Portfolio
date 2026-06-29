import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { services } from '../data/services';
import { FiCode, FiCpu, FiWifi, FiTool, FiActivity, FiSearch } from 'react-icons/fi';

const iconMap = {
  FaLaptopCode: FiCode,
  FaMicrochip: FiCpu,
  FaNetworkWired: FiWifi,
  FaTools: FiTool,
  FaChartLine: FiActivity,
  FaSearch: FiSearch,
};

const colorVariants = [
  { icon: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'hover:border-purple-300 dark:hover:border-purple-700' },
  { icon: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30', border: 'hover:border-orange-300 dark:hover:border-orange-700' },
  { icon: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-50 dark:bg-secondary-900/30', border: 'hover:border-secondary-300 dark:hover:border-secondary-700' },
  { icon: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30', border: 'hover:border-rose-300 dark:hover:border-rose-700' },
  { icon: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'hover:border-amber-300 dark:hover:border-amber-700' },
  { icon: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/30', border: 'hover:border-primary-300 dark:hover:border-primary-700' },
];

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            Services
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Services Offered
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
          <p className="mt-6 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            Specializing in network infrastructure and hardware — with the software skills
            to build the tools that manage it all.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || FiCode;
            const colors = colorVariants[i % colorVariants.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 card-hover ${colors.border} transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-5`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.bg.replace('bg-', 'bg-').replace('/30', '')} ${colors.icon.replace('text-', 'bg-').split(' ')[0]}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
