import { FiLinkedin, FiMail, FiMessageCircle } from 'react-icons/fi';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kibret-kassahun-025769245/' },
  { icon: FiMessageCircle, label: 'WhatsApp', href: 'https://wa.me/251967314055' },
  { icon: FiMail, label: 'Email', href: 'mailto:kibret@kbintegratedtech.com' },
];

export default function Footer() {
  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/kb-logo.png"
                alt="KB Integrated Technologies"
                className="h-10 w-10 object-contain rounded-lg"
              />
              <span className="font-bold text-lg text-white">
                KB <span className="text-primary-400">Integrated</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Founder &amp; CEO of KB Integrated Technologies. Building reliable systems
              from code to hardware.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm text-gray-500 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-gray-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">kibret616@gmail.com</p>
            <p className="text-sm text-gray-500">+251 96 731 4055</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Kibret Kassahun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
