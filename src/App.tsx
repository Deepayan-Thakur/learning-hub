import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, Moon, Sun, ArrowUpRight, GraduationCap } from 'lucide-react';
import { CATEGORIES, Resource, Category } from './constants';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme with document for convenience (global utility classes)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    
    return CATEGORIES.map(category => ({
      ...category,
      resources: category.resources.filter(resource => 
        resource.title.toLowerCase().includes(normalizedQuery) ||
        resource.description.toLowerCase().includes(normalizedQuery) ||
        resource.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      )
    })).filter(category => category.resources.length > 0);
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-100 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#fafafa] text-slate-900'
    }`}>
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] transition-colors duration-1000 ${
          isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50/50'
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] transition-colors duration-1000 ${
          isDarkMode ? 'bg-violet-900/20' : 'bg-violet-50/50'
        }`} />
      </div>

      {/* Hero Section / Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/5 shadow-2xl'
            : 'py-3 bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm' 
          : 'py-8'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
             <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-500/20 shadow-lg"
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </motion.div>
                <span className={`font-bold text-xl tracking-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Curate<span className="text-indigo-500 italic block min-[400px]:inline min-[400px]:ml-1">Hub</span>
                </span>
             </div>

             <div className="hidden md:flex gap-6 items-center text-sm font-medium">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                       const element = document.getElementById(cat.id);
                       element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`transition-colors uppercase tracking-wider text-[10px] p-2 hover:bg-slate-500/5 rounded-lg ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
             </div>

             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform group active:scale-95 ${
                 isDarkMode ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-white text-indigo-600 border border-slate-200 shadow-sm'
               }`}
             >
               <AnimatePresence mode="wait">
                 {isDarkMode ? (
                   <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                     <Sun className="w-5 h-5" />
                   </motion.div>
                 ) : (
                   <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                     <Moon className="w-5 h-5" />
                   </motion.div>
                 )}
               </AnimatePresence>
             </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Search Bar Section */}
        <section className="mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 max-w-2xl px-4"
          >
            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 italic">Unlimited</span>.
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Carefully curated free resources, world-class labs, and professional certifications to help you master any skill from scratch.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20, width: "300px" }}
            animate={{ opacity: 1, y: 0, width: "100%" }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="relative w-full max-w-2xl group flex flex-col items-center"
          >
            <div className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-500 -z-10 ${
              isDarkMode 
                ? 'bg-indigo-500/10 group-focus-within:bg-indigo-500/20' 
                : 'bg-indigo-100/50 group-focus-within:bg-indigo-600/10'
            }`} />
            
            <div className="relative w-full">
              <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'
              }`} />
              
              <input 
                type="text" 
                placeholder="What do you want to learn today?"
                className={`w-full py-6 pl-16 pr-8 rounded-2xl text-lg font-medium outline-none transition-all duration-300 shadow-lg ${
                  isDarkMode 
                    ? 'bg-slate-900 border-white/5 text-slate-100 placeholder-slate-600 focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10' 
                    : 'bg-white border-slate-100 text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-600/5'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-4 flex gap-2"
                >
                  <span className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isDarkMode ? 'bg-indigo-950/30 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                  }`}>
                    Searching for: <strong>{searchQuery}</strong>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Resources Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCategories.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-24"
            >
              {filteredCategories.map((category) => (
                <section key={category.id} id={category.id} className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-8 border-b transition-colors border-white/5 pb-4">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {category.icon}
                    </div>
                    <h2 className={`text-xl font-bold tracking-tight uppercase letter-spacing-wide transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {category.name}
                    </h2>
                    <span className={`text-xs font-medium ml-2 px-2 py-0.5 rounded-full border transition-colors ${
                      isDarkMode ? 'bg-slate-800 border-white/5 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                      {category.resources.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.resources.map((resource) => (
                      <ResourceCard key={resource.url} resource={resource} category={category} isDarkMode={isDarkMode} />
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No resources found</h3>
              <p className="text-slate-500">Try searching for something else, like "CSS" or "Machine Learning"</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* About Section */}
        <section className="mt-32 pt-20 border-t border-white/5 px-4" id="about">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Why <span className="text-indigo-500">CurateHub?</span>
              </h2>
              <div className={`space-y-4 text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  In an age of information overload, the hardest part of learning isn't finding information—it's finding the <span className="text-indigo-400 font-medium">right</span> information.
                </p>
                <p>
                  CurateHub is a minimalist sanctuary for lifelong learners. We hand-pick the most prestigious, effective, and transformative free educational resources across the web.
                </p>
                <p>
                  From Harvard's computer science curriculum to McKinsey's young professional programs, we bridge the gap between curiosity and certification.
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Free Forever', value: '100%', color: 'text-emerald-500' },
                { label: 'Top Platforms', value: '20+', color: 'text-violet-500' },
                { label: 'Subjects', value: '50+', color: 'text-indigo-500' },
                { label: 'Impact', value: 'High', color: 'text-rose-500' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-3xl border transition-all ${
                    isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100 shadow-sm'
                  }`}
                >
                  <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`transition-colors py-16 px-6 ${
        isDarkMode ? 'bg-slate-950 border-t border-white/5' : 'bg-white border-t border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <span className={`font-bold text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>CurateHub</span>
            </div>
            <p className={`text-sm max-w-xs text-center md:text-left ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Master your future with world-class education. Decidedly simple, purposefully free.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm font-medium">
            <div className="flex flex-col gap-3">
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>Platform</span>
              <a href="#about" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>About</a>
              <a href="#" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Submit</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>Connect</span>
              <a href="#" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Twitter</a>
              <a href="#" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
           <p className={`text-xs ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`}>
            © 2026 Curate Learning Hub. Built for the curious.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: Resource, category: Category, isDarkMode: boolean }> = ({ resource, category, isDarkMode }) => {
  const accentColor = category.accentColor || 'indigo';
  
  // Map standard tailwind colors to hex/rgb for CSS variables
  const colorMap: Record<string, string> = {
    indigo: '#6366f1',
    rose: '#f43f5e',
    violet: '#8b5cf6',
    emerald: '#10b981',
    amber: '#f59e0b'
  };
  
  const baseColor = colorMap[accentColor] || colorMap.indigo;

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      style={{ '--accent-color': baseColor } as React.CSSProperties}
      className={`group relative p-8 rounded-[2rem] transition-all duration-500 flex flex-col h-full overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900 border border-white/5 hover:border-white/10 shadow-2xl' 
          : 'bg-white border border-slate-200 hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5'
      }`}
    >
      {/* Background Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 bg-gradient-to-br from-[var(--accent-color)]/5 to-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]"
      />
      
      <div className="flex justify-between items-start mb-6">
        <div 
          style={{ backgroundColor: isDarkMode ? `${baseColor}15` : `${baseColor}10`, color: baseColor, borderColor: `${baseColor}30` }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 border"
        >
          {React.isValidElement(resource.icon) && React.cloneElement(resource.icon as React.ReactElement, { className: 'w-7 h-7' })}
        </div>
        <div className={`p-2 rounded-xl transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
          isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-300'
        }`}>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      
      <h3 className={`text-2xl font-bold mb-3 transition-colors ${
        isDarkMode ? 'text-white' : 'text-slate-800'
      }`}>
        {resource.title}
      </h3>
      
      <p className={`text-base leading-relaxed mb-8 flex-grow transition-colors ${
        isDarkMode ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {resource.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {resource.tags.map(tag => (
          <span 
            key={tag} 
            className={`text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-white/5 text-slate-500 group-hover:border-[var(--accent-color)] group-hover:text-[var(--accent-color)]' 
                : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:border-[var(--accent-color)] group-hover:text-[var(--accent-color)]'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Decorative corner accent */}
      <div 
        style={{ backgroundColor: baseColor }}
        className="absolute bottom-0 right-0 w-32 h-32 blur-3xl -z-10 group-hover:opacity-20 opacity-5 transition-opacity duration-700" 
      />
    </motion.a>
  );
};

export default App;
