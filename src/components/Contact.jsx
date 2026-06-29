import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiMail, FiPhone, FiLinkedin, FiMessageCircle, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

// Local mail server — accessible on your local network
// Start it with: node server/index.js
// Accessible from any device on the same network via: http://192.168.1.16:3001
const MAIL_API = 'http://192.168.1.16:3001/send';

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'kibret616@gmail.com',
    href: 'mailto:kibret616@gmail.com',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+251 96 731 4055',
    href: 'tel:+251967314055',
  },
];

const socialLinks = [
  { icon: FiLinkedin,       label: 'LinkedIn',  href: 'https://www.linkedin.com/in/kibret-kassahun-025769245/' },
  { icon: FiMessageCircle,  label: 'WhatsApp',  href: 'https://wa.me/251967314055' },
];

export default function Contact() {
  const [ref, inView]   = useInView({ threshold: 0.1 });
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const [errorDetail, setErrorDetail] = useState('');

  const validate = () => {
    const e = {};
    if (!form.from_name.trim())  e.from_name  = 'Name is required';
    if (!form.from_email.trim()) e.from_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.from_email)) e.from_email = 'Enter a valid email';
    if (!form.message.trim())    e.message    = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrorDetail('');
    try {
      const res = await fetch(MAIL_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          from_name:  form.from_name,
          from_email: form.from_email,
          message:    form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');

      setStatus('success');
      setForm({ from_name: '', from_email: '', message: '' });
    } catch (err) {
      console.error('Mail error:', err.message);
      setErrorDetail(err.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            Contact
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
          <p className="mt-6 max-w-xl mx-auto text-gray-500 dark:text-gray-400">
            Have a project in mind or need IT support? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Let's work together
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Whether you need a new system built, IT infrastructure support, or just want to
                connect — my inbox is always open.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                    <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">

              {/* Success state */}
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="flex flex-col gap-1 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                      <div className="flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Failed to send. Please try again or email me directly at kibret616@gmail.com</span>
                      </div>
                      {errorDetail && (
                        <p className="text-xs opacity-70 font-mono pl-6">Error: {errorDetail}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      value={form.from_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                        errors.from_name
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-400'
                      }`}
                    />
                    {errors.from_name && <p className="mt-1 text-xs text-red-500">{errors.from_name}</p>}
                  </div>

                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      value={form.from_email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                        errors.from_email
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-400'
                      }`}
                    />
                    {errors.from_email && <p className="mt-1 text-xs text-red-500">{errors.from_email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or inquiry..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none ${
                        errors.message
                          ? 'border-red-400 dark:border-red-600'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-400'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
                  >
                    {status === 'sending' ? (
                      <>
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
