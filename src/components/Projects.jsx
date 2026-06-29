import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { projects } from '../data/projects';
import {
  FiLayers, FiImage,
  FiX, FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';

const categoryColors = {
  'Web App':           'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300',
  'Management System': 'bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300',
  'Monitoring':        'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  'Enterprise App':    'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
};

/* ─── Single image with error state ────────────────────────────────────────── */
function LightboxImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  // Reset when navigating to a different image
  useEffect(() => { setErrored(false); }, [src]);

  if (errored) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 px-6 text-center">
        <FiImage className="w-14 h-14 opacity-20" />
        <p className="text-sm font-medium opacity-60">Image file not found</p>
        <code className="text-xs opacity-50 bg-gray-800 px-3 py-1.5 rounded-lg break-all">{src}</code>
        <p className="text-xs opacity-40">
          Save the screenshot to the path above, then refresh the page.
        </p>
      </div>
    );
  }

  return (
    <motion.img
      key={src}
      src={src}
      alt={alt}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full object-contain"
      onError={() => setErrored(true)}
    />
  );
}

/* ─── Lightbox modal ────────────────────────────────────────────────────────── */
function Lightbox({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const images = project.samples;

  const prev = useCallback(() =>
    setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setCurrent(c => (c + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {current + 1} / {images.length} — {images[current].caption}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Image area */}
        <div className="relative bg-gray-950 aspect-video flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <LightboxImage
              key={current}
              src={images[current].url}
              alt={images[current].caption}
            />
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`View screenshot ${i + 1}`}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? 'border-primary-500 opacity-100 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, inView, onSamplesClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden card-hover shadow-sm"
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30">
            <FiLayers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[project.category] || 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {project.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="px-6 pb-4 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <button
          onClick={() => onSamplesClick(project)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <FiImage className="w-4 h-4" />
          Samples
          <span className="ml-0.5 text-xs text-gray-400 dark:text-gray-500">
            ({project.samples.length})
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
            Projects
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Work
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
          <p className="mt-6 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            Enterprise systems built to solve real operational challenges — from asset management
            to infrastructure monitoring. Click{' '}
            <strong className="text-gray-600 dark:text-gray-300">Samples</strong> to preview screenshots.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onSamplesClick={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
