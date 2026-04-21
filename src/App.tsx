/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, LayoutGrid, Mail, School, Award, 
  Sun, Moon, Globe, X, Server, Smartphone, Code, ExternalLink, CheckCircle,
  ChevronLeft, ChevronRight, Database
} from "lucide-react";

// --- ICONOS DE MARCAS (SVG PURO) ---
const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- DICCIONARIO DE TRADUCCIONES ---
const dict = {
  es: {
    nav: { portfolio: "Inicio", archive: "Proyectos", studio: "Trayectoria", contact: "Contacto" },
    hero: {
      title1: "Ingeniero de",
      title2: "Software",
      roleLabel: "Perfil",
      roleVal: "Desarrollo / Diseño",
      locLabel: "Ubicación",
      locVal: "Perú / Remoto",
      statLabel: "Estado",
      statVal: "Disponible",
      cta: "Ver Proyectos",
      about: "Estudiante proactivo y responsable de Gestión de sistemas de información con una sólida ética laboral (puntualidad y honestidad). Me especializo en Java Web, tengo experiencia práctica realizando proyectos de clase de sistemas para un restaurante y una clínica. Busco aplicar mis conocimientos de diseño en Figma y programación para contribuir eficazmente en proyectos de desarrollo y alcanzar los objetivos organizacionales."
    },
    journey: {
      title: "Trayectoria Educativa",
      edu1: "Ingeniería de Software",
      edu1desc: "Actualmente cursando el 5to ciclo de la carrera. Enfocado en arquitectura de software, bases de datos y desarrollo de aplicaciones escalables.",
      edu2: "Inglés - Nivel Avanzado",
      edu2desc: "Estudios culminados satisfactoriamente en el Instituto Cultural Peruano Norteamericano (ICPNA), alcanzando un nivel avanzado (C1) para fluidez técnica y comunicativa."
    },
    projects: {
      subtitle: "Mis Trabajos",
      title: "Proyectos Personales",
      learned: "Lo que aprendí:",
      techs: "Tecnologías:",
      p1: {
        title: "Torneo de Robótica",
        desc: "Plataforma web para la gestión de competencias de robótica. Registra equipos y controla resultados en tiempo real.",
        learned: "Consolidé conocimientos en Java Web, estructuré bases de datos complejas y realicé el despliegue en Railway."
      },
      p2: {
        title: "Dfruta App",
        desc: "App móvil de comercio con autenticación, base de datos en la nube y correos transaccionales integrados.",
        learned: "Dominé Flutter para interfaces multiplataforma y la integración de Supabase para manejo de datos en tiempo real."
      },
      p3: {
        title: "Sistema Restaurante",
        desc: "Sistema integral (SaaS) para la gestión de pedidos, inventario y facturación de un restaurante de alta demanda.",
        learned: "Aprendí a integrar un frontend dinámico en React con un robusto backend en Spring Boot y MySQL bajo arquitectura limpia."
      }
    },
    contact: {
      title: "Hablemos.",
      subtitle: "Actualmente buscando oportunidades para contribuir en proyectos de desarrollo.",
      name: "Tu Nombre",
      email: "tu@correo.com",
      msg: "Cuéntame sobre tu proyecto o propuesta...",
      send: "Enviar Mensaje",
      submitting: "Enviando...",
      success: "¡Mensaje enviado con éxito!",
      error: "Hubo un error al enviar."
    }
  },
  en: {
    nav: { portfolio: "Home", archive: "Projects", studio: "Journey", contact: "Contact" },
    hero: {
      title1: "Software",
      title2: "Engineering",
      roleLabel: "Role",
      roleVal: "Development / Design",
      locLabel: "Location",
      locVal: "Peru / Remote",
      statLabel: "Status",
      statVal: "Available",
      cta: "View Projects",
      about: "Proactive and responsible Information Systems Management student with a strong work ethic (punctuality and honesty). I specialize in Java Web and have practical experience developing projects for a restaurant and a clinic."
    },
    journey: {
      title: "Academic Journey",
      edu1: "Software Engineering",
      edu1desc: "Currently in the 5th cycle of the degree. Focused on software architecture and scalable systems.",
      edu2: "English - Advanced Level",
      edu2desc: "Completed studies at ICPNA, achieving a C1 advanced level for technical fluency."
    },
    projects: {
      subtitle: "My Work",
      title: "Personal Projects",
      learned: "Learned:",
      techs: "Technologies:",
      p1: { title: "Robotics System", desc: "Web platform for robotics competitions management.", learned: "Java Web and Railway deployment." },
      p2: { title: "Dfruta App", desc: "Mobile commerce app with cloud database.", learned: "Flutter and Supabase real-time integration." },
      p3: { title: "Restaurant System", desc: "Complete SaaS for order and inventory management.", learned: "React, Spring Boot and MySQL clean architecture." }
    },
    contact: {
      title: "Let's Talk.",
      subtitle: "Currently looking for opportunities to contribute.",
      name: "Your Name",
      email: "your@email.com",
      msg: "Tell me about your project...",
      send: "Send Message",
      submitting: "Sending...",
      success: "Success!",
      error: "Error."
    }
  }
};

// --- COMPONENTES PRINCIPALES ---

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  return (
    <div className="max-w-screen-2xl mx-auto overflow-x-hidden selection:bg-primary/20 selection:text-primary pb-20 transition-colors duration-300 relative">
      
      {/* NAVBAR */}
      <header className="sticky top-0 w-full z-40 glass bg-background/90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black tracking-[-1.5px] font-sans text-on-background">
            RAMCUBAS<span className="text-primary">.DEV</span>
          </div>
          <nav className="hidden md:flex gap-10 items-center font-sans">
            <a className="label-caps text-on-background hover:text-primary transition-colors" href="#hero">{t.nav.portfolio}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#expertise">{t.nav.studio}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#process">{t.nav.archive}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors flex items-center justify-center text-on-background">
              <Globe size={18} />
              <span className="ml-2 text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
            <button onClick={toggleTheme} className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors text-on-background">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-24 mt-8 md:mt-12">
        
        {/* HERO */}
        <section id="hero" className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative justify-center px-6 md:px-12 lg:px-24 scroll-mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="flex-1 flex flex-col items-start z-10"
          >
            <h1 className="editorial-h1 mb-12">
              {t.hero.title1}<br/>
              <span className="text-gradient">{t.hero.title2}</span>
            </h1>
            
            <div className="flex flex-wrap gap-12 border-t border-outline-variant pt-8 w-full max-w-2xl">
              <div className="flex flex-col gap-2">
                <span className="label-caps">{t.hero.roleLabel}</span>
                <span className="text-sm font-medium">{t.hero.roleVal}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="label-caps">{t.hero.locLabel}</span>
                <span className="text-sm font-medium">{t.hero.locVal}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="label-caps">{t.hero.statLabel}</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                  {t.hero.statVal}
                </span>
              </div>
            </div>

            <div className="flex gap-6 mt-12">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href='#process'}>
                <span className="text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors">{t.hero.cta}</span>
                <div className="line-accent group-hover:w-37.5 group-hover:bg-primary transition-all duration-500"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            className="relative w-full lg:w-[45%] flex flex-col items-center lg:items-end gap-8"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              transition={{ duration: 1, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-surface-container overflow-hidden shadow-xl"
            >
              <img 
                src="https://media.licdn.com/dms/image/v2/D4E03AQG9aFNNwKD1tw/profile-displayphoto-scale_400_400/B4EZqfgl5iKoAg-/0/1763612717930?e=1778112000&v=beta&t=cX5f3KtmIqpOOy2qbrfd_6O23A_wzR7yFyIj0J5BkWc" 
                alt="Leonardo Franco" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/leonardo-franco-ram%C3%ADrez-cubas-b3b0b5363/" target="_blank" rel="noreferrer" className="p-3 bg-surface-container rounded-full hover:bg-primary hover:text-white transition-colors text-on-background">
                <LinkedinIcon size={20} />
              </a>
              <a href="https://github.com/ramcubas8-hash" target="_blank" rel="noreferrer" className="p-3 bg-surface-container rounded-full hover:bg-primary hover:text-white transition-colors text-on-background">
                <GithubIcon size={20} />
              </a>
            </div>

            <p className="font-sans text-sm md:text-base leading-relaxed text-on-surface-variant bg-surface-container p-6 rounded-2xl shadow-sm border border-outline-variant max-w-md text-left">
              {t.hero.about}
            </p>
          </motion.div>
        </section>

        {/* JOURNEY */}
        <section id="expertise" className="flex flex-col gap-20 px-6 md:px-12 lg:px-24 py-20 bg-surface-container rounded-3xl mx-4 md:mx-12 scroll-mt-32">
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-sm">{t.journey.title}</h2>
            <div className="max-w-xl flex flex-col gap-16 w-full">
              <TimelineItem icon={<School size={28}/>} label="Actualidad" title={t.journey.edu1} desc={t.journey.edu1desc} />
              <TimelineItem icon={<Award size={28}/>} label="Completado" title={t.journey.edu2} desc={t.journey.edu2desc} />
            </div>
          </div>
        </section>

        {/* PROJECTS CAROUSEL */}
        <section id="process" className="px-6 md:px-12 lg:px-24 scroll-mt-32">
          <ProjectCarousel t={t} />
        </section>

        {/* CONTACTO */}
        <section id="contact" className="px-6 md:px-12 lg:px-24 scroll-mt-32 pb-20">
          <ContactForm t={t} />
        </section>
      </main>

      {/* MOBILE NAV */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-2 glass-dock rounded-full">
        <a className="p-3 text-on-background" href="#hero"><Home size={18} /></a>
        <a className="p-3 text-tertiary" href="#expertise"><School size={18} /></a>
        <a className="p-3 text-tertiary" href="#process"><LayoutGrid size={18} /></a>
        <a className="p-3 text-tertiary" href="#contact"><Mail size={18} /></a>
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTES ---

const TimelineItem = ({ icon, label, title, desc }: any) => (
  <div className="flex gap-8 group">
    <div className="pt-2 text-primary group-hover:scale-125 transition-transform">{icon}</div>
    <div>
      <span className="label-caps mb-2 block text-primary">{label}</span>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ProjectCarousel = ({ t }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const offset = dir === "l" ? -clientWidth : clientWidth;
    scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
  };

  const projects = [
    {
      title: t.projects.p3.title,
      desc: t.projects.p3.desc,
      learned: t.projects.p3.learned,
      techs: [
        { name: "React", icon: <Code size={14}/>, url: "https://react.dev/" },
        { name: "Spring Boot", icon: <Server size={14}/>, url: "https://spring.io/projects/spring-boot" },
        { name: "MySQL", icon: <Database size={14}/>, url: "https://www.mysql.com/" }
      ],
      images: [
        "/img/sistema-web-isekai.png"
      ]
    },
    {
      title: t.projects.p2.title,
      desc: t.projects.p2.desc,
      learned: t.projects.p2.learned,
      techs: [
        { name: "Flutter", icon: <Smartphone size={14}/>, url: "https://flutter.dev/" },
        { name: "Supabase", icon: <Server size={14}/>, url: "https://supabase.com/" },
        { name: "Resend", icon: <Mail size={14}/>, url: "https://resend.com/" }
      ],
      images: [
        "/img/app-dfruta-homescreen.jpg"
      ]
    },
    {
      title: t.projects.p1.title,
      desc: t.projects.p1.desc,
      learned: t.projects.p1.learned,
      techs: [
        { name: "Java Web", icon: <Code size={14}/>, url: "https://www.java.com/" },
        { name: "Railway", icon: <Server size={14}/>, url: "https://railway.app/" }
      ],
      images: [
        "/img/robotech-brackets.png"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end border-b border-outline-variant/30 pb-6">
        <div>
          <span className="label-caps mb-4 block text-primary">{t.projects.subtitle}</span>
          <h2 className="font-serif text-5xl tracking-tight">{t.projects.title}</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll("l")} className="p-4 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all"><ChevronLeft size={20}/></button>
          <button onClick={() => scroll("r")} className="p-4 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10">
        {projects.map((p, i) => (
          <div key={i} className="min-w-full md:min-w-[calc(50%-16px)] snap-start">
            <ProjectCard {...p} tText={t} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, desc, learned, techs, images, tText }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ✅ AUTOPLAY MEJORADO
  useEffect(() => {
    if (!isOpen || isPaused || !images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImg((prev) => {
        if (!images || images.length === 0) return 0;
        return (prev + 1) % images.length;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, images]);

  // Reset al abrir
  const handleOpen = () => {
    setCurrentImg(0);
    setIsPaused(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPaused(false);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
    setIsPaused(true);
  };

  return (
    <>
      {/* CARD */}
      <motion.div
        whileHover={{ y: -10 }}
        className="flex flex-col gap-6 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="aspect-4/3 bg-surface-container overflow-hidden relative rounded-xl group">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-background w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <LayoutGrid size={16} className="text-on-background" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.map((t: any, i: number) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 bg-surface-container hover:bg-primary hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold rounded-full flex items-center gap-1 text-on-surface"
              >
                {t.icon} {t.name}{" "}
                <ExternalLink size={10} className="ml-1 opacity-50" />
              </a>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
            {desc}
          </p>

          <div className="border-l-2 border-primary pl-4 py-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary block mb-1">
              {tText.projects.learned}
            </span>
            <p className="text-sm italic text-on-surface-variant line-clamp-2">
              {learned}
            </p>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-background w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cerrar */}
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-primary z-10"
                onClick={handleClose}
              >
                <X size={20} />
              </button>

              {/* CARRUSEL */}
              <div className="w-full md:w-3/5 bg-surface-container relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                <div className="relative w-full aspect-video md:h-full min-h-55">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={images[currentImg]}
                      alt={`${title}-${currentImg}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Barra progreso */}
                  {!isPaused && images.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <motion.div
                        key={currentImg}
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                      />
                    </div>
                  )}

                  {/* Flechas */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full"
                      >
                        ←
                      </button>
                      <button
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full"
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Botón pausa */}
                  {images.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPaused((p) => !p);
                      }}
                      className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {isPaused ? "Auto" : "Pausa"}
                    </button>
                  )}
                </div>
              </div>

              {/* INFO */}
              <div className="w-full md:w-2/5 p-8 flex flex-col gap-8">
                <h3 className="text-3xl font-bold">{title}</h3>
                <p>{desc}</p>

                <div>
                  <span className="text-primary">
                    {tText.projects.learned}
                  </span>
                  <p className="italic">{learned}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ContactForm = ({ t }: any) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    try {
      const resp = await fetch(e.currentTarget.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if (resp.ok) { setStatus("success"); e.target.reset(); setTimeout(() => setStatus("idle"), 5000); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="border-t border-outline-variant pt-24 pb-12 flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="md:w-1/3">
         <h2 className="font-serif text-[4rem] leading-none mb-8">{t.contact.title}</h2>
         <p className="text-on-surface-variant">{t.contact.subtitle}</p>
      </div>
      <div className="md:w-2/3 flex flex-col gap-12 w-full">
        <form action="https://formspree.io/f/mpqkydaw" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4 border-b border-outline-variant pb-2 relative">
              <label className="label-caps">{t.contact.name}</label>
              <input name="name" required className="bg-transparent border-none p-0 outline-none text-on-background" placeholder={t.contact.name} type="text" />
            </div>
            <div className="flex flex-col gap-4 border-b border-outline-variant pb-2 relative">
              <label className="label-caps">{t.contact.email}</label>
              <input name="email" required className="bg-transparent border-none p-0 outline-none text-on-background" placeholder={t.contact.email} type="email" />
            </div>
          </div>
          <div className="flex flex-col gap-4 border-b border-outline-variant pb-2 relative">
            <label className="label-caps">Mensaje</label>
            <textarea name="message" required className="bg-transparent border-none p-0 outline-none text-on-background resize-none" placeholder={t.contact.msg} rows={3}></textarea>
          </div>
          <div className="flex items-center gap-6">
            <button disabled={status === "submitting"} className="self-start flex items-center gap-4 group bg-transparent border-none cursor-pointer" type="submit">
              <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary text-on-background transition-colors">{status === "submitting" ? t.contact.submitting : t.contact.send}</span>
              <div className="line-accent group-hover:w-25 group-hover:bg-primary transition-all duration-500"></div>
            </button>
            {status === "success" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600 text-sm font-bold"><CheckCircle size={18} /> {t.contact.success}</motion.div>}
          </div>
        </form>

        <footer className="mt-20 flex justify-between items-center border-t border-outline-variant pt-8">
           <div className="text-2xl font-black font-sans text-on-background">RAMCUBAS<span className="text-primary">.DEV</span></div>
           <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/leonardo-franco-ram%C3%ADrez-cubas-b3b0b5363/" target="_blank" rel="noreferrer" className="text-tertiary hover:text-primary transition-colors"><LinkedinIcon size={18}/></a>
              <a href="https://github.com/ramcubas8-hash" target="_blank" rel="noreferrer" className="text-tertiary hover:text-primary transition-colors"><GithubIcon size={18}/></a>
           </div>
        </footer>
      </div>
    </div>
  );
};