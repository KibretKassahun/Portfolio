import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiCode, FiCpu, FiWifi, FiShield, FiTool, FiActivity } from 'react-icons/fi';

const highlights = [
  {
    icon: FiWifi,
    title: 'Network Installation',
    description: 'End-to-end LAN/WAN design, structured cabling, switch and router configuration for offices and enterprise sites.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: FiCpu,
    title: 'Hardware Maintenance',
    description: 'Deep hands-on experience diagnosing, repairing, and overhauling desktops, laptops, servers, and peripherals.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/30',
  },
  {
    icon: FiTool,
    title: 'Preventive Maintenance',
    description: 'Scheduled PM programs covering cleaning, firmware updates, thermal management, and full asset documentation.',
    color: 'text-secondary-600 dark:text-secondary-400',
    bg: 'bg-secondary-50 dark:bg-secondary-900/30',
  },
  {
    icon: FiActivity,
    title: 'IT Infrastructure Monitoring',
    description: 'Real-time visibility into network health, device uptime, and performance — with automated alerting and reporting.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
  },
  {
    icon: FiShield,
    title: 'System Reliability',
    description: 'Proactive strategies to eliminate single points of failure and maintain 99%+ uptime across critical infrastructure.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: FiCode,
    title: 'Full Stack Development',
    description: 'Building the management systems, dashboards, and tools that sit on top of the infrastructure I maintain.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/30',
  },
];

const stats = [
  { value: '5+', label: 'Years in IT' },
  { value: '200+', label: 'Devices Maintained' },
  { value: '99.5%', label: 'Network Uptime' },
  { value: '50+', label: 'Network Deployments' },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            About Me
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Network, Hardware &amp; Software — All in One
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              I'm an IT Infrastructure Specialist and Full Stack Developer with over 5 years of
              hands-on experience in network installation, hardware maintenance, and enterprise
              system development. My core strength is the physical and logical layer of IT —
              the cables, switches, routers, and devices that everything else depends on.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              As the Founder &amp; CEO of <strong className="text-gray-800 dark:text-white">KB Integrated Technologies</strong>,
              I've planned and deployed LAN/WAN infrastructure, performed preventive maintenance
              on 200+ devices, and built the monitoring and management software that gives
              organizations real-time visibility into their IT assets.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether it's pulling cable, configuring a managed switch, replacing a failed
              component, or writing a full-stack dashboard — I handle the full stack of IT,
              from the physical layer up.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 card-hover"
            >
              <div className={`inline-flex p-3 rounded-xl ${item.bg} mb-4`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
