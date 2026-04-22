/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, LayoutGrid, Mail, School, Award, 
  Sun, Moon, Globe, X, Server, Smartphone, Code, ExternalLink, CheckCircle,
  ChevronLeft, ChevronRight, BookOpen, Bot, Wrench, Database,
  Info, RotateCcw
} from "lucide-react";

// --- ICONOS DE MARCAS / HERRAMIENTAS (SVG PURO) ---
const GithubIcon = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
const LinkedinIcon = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const ReactIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>;
const AngularIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 250 250" fill="currentColor"><path d="M125 0L10.4 40.4l19.5 146.4L125 250l95.1-63.2 19.5-146.4L125 0zm0 21.6l86.1 30.6-16.7 125.8-69.4 46.1-69.4-46.1-16.7-125.8L125 21.6z" fillOpacity=".5"/><path d="M125 21.6L38.9 52.2l16.7 125.8 69.4 46.1V21.6z" fillOpacity=".2"/><path d="M125 45.4l-53.7 128H93l11.4-28.5h41.3l11.4 28.5h21.7L125 45.4zm-14.8 82.5l14.8-37.1 14.8 37.1H110.2z"/></svg>;
const KotlinIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.3 24l11.3-11.5L24 24zM0 0h11.5L0 11.5zM11.5 0L24 0 0 24 0 11.5z"/></svg>;
const FlutterIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM14.314 24L7.857 17.53l3.695-3.7 10.132 10.17h-7.37z"/></svg>;
const HtmlIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.1l-97.9-27.1-6-65.8h47.7l2.9 32.7 53.3 14.6 53.3-14.6 6.6-73.8H86.6l-14-166.4h240l-4.4 75.5z"/></svg>;
const BootstrapIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor"><path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM8 3.333c2.25 0 3.75 1.167 3.75 3 0 1.25-.833 2.167-1.833 2.5 1.167.333 2.083 1.333 2.083 2.833 0 2-1.667 3.334-4.167 3.334H4.5v-11H8Zm-.167 4.167c1.167 0 1.834-.667 1.834-1.583 0-.917-.667-1.584-1.834-1.584H6.5v3.167h1.333Zm.334 4.5c1.25 0 2-.75 2-1.75 0-1-.75-1.75-2-1.75H6.5v3.5h1.667Z"/></svg>;
const JavaIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.9 8.2c-.3 0-.6-.3-.6-.6v-.3c.4-.7 1.3-1 2.2-1.5.8-.4 1.8-1 1.8-2.6 0-.3-.3-.6-.6-.6s-.6.3-.6.6c0 1-.7 1.3-1.5 1.7-.9.5-2.1.9-2.1 2.5v.3c0 .8.6 1.5 1.5 1.5.3 0 .5-.3.5-.5zM15 8.7c-.5 0-.9-.4-.9-.9v-.3c0-1.6 1.3-2 2.2-2.5.8-.4 1.5-.7 1.5-1.8 0-.5-.4-.9-.9-.9s-.9.4-.9.9c0 .3.2.5.5.5 0-.2.1-.3.3-.3s.3.1.3.3c0 .6-.7.9-1.5 1.3-.9.4-2.2.9-2.2 2.4v.3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-.3c0-.3-.2-.5-.5-.5s-.5.2-.5.5v.3c0 .4-.2.7-.4.7z"/><path d="M19.1 14.5c-1.1-.3-2.6-.5-4.4-.6v-.8c1.6.1 3 .3 4.1.6.9.3 1.4.7 1.4 1.2 0 .8-1.5 1.5-4.1 1.9-2.2.4-5.2.4-7.4 0C5.1 16.1 4 15.2 4 14.5c0-.4.5-.8 1.4-1.1.3-.1.4-.4.3-.7-.1-.3-.4-.4-.7-.3C4 12.8 3 13.5 3 14.5c0 1.2 1.6 2.3 4.6 2.8 1.8.3 4.3.4 6.2.2 3.1-.4 4.8-1.3 4.8-2.6 0-.8-.7-1.4-2.1-1.9zM16.9 16.5c-2.4.6-5.8.7-8.4.3-3-.5-4.5-1.7-4.5-2.8 0-.3.1-.5.2-.8.1-.3 0-.6-.3-.7-.3-.1-.6 0-.7.3-.2.4-.2.8-.2 1.2 0 1.6 2 3 5.4 3.6 1.3.2 2.9.3 4.4.2 2.8-.2 5-1 5-2.4 0-.1 0-.2-.1-.4-.1-.3-.4-.4-.7-.2-.2.1-.3.4-.2.7.2.3.1.7.1.9z"/></svg>;
const SpringIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 0C5.38 0 0 5.38 0 12c0 6.63 5.38 12 12.01 12 6.63 0 12-5.37 12-12 0-6.62-5.37-12-12-12zm-4.7 15.42s2.61.94 4.87.52c0 0-4.66-1.54-4.5-5.31 0 0 4.09.28 6.47 2.45 0 0-1.89-3.23-5.59-4.31 0 0 6.03-1.01 9.4 2.8 0 0-2.31-5.18-8.73-5.28 0 0 4.83-2.07 10.37.1-1.34-3.32-4.54-5.69-8.31-5.69-4.94 0-8.94 4-8.94 8.94 0 2.21.8 4.23 2.13 5.78z"/></svg>;
const MysqlIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.01 2 6.5s4.48 4.5 10 4.5 10-2.01 10-4.5S17.52 2 12 2zm0 6.5c-4.41 0-8-1.57-8-3.5S7.59 1.5 12 1.5s8 1.57 8 3.5-3.59 3.5-8 3.5zm0 2.5c-5.52 0-10-2.01-10-4.5v11C2 20.01 6.48 22 12 22s10-1.99 10-4.5v-11c0 2.49-4.48 4.5-10 4.5zm0 9.5c-4.41 0-8-1.57-8-3.5v-3.78c1.86 1.48 4.7 2.38 8 2.38s6.14-.9 8-2.38v3.78c0 1.93-3.59 3.5-8 3.5z"/></svg>; // Usando un ícono de base de datos genérico limpio
const SupabaseIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.128 0c-.543 0-1.042.278-1.32.744L.436 18.068a1.5 1.5 0 0 0 1.282 2.268h8.636v10.42c0 .913 1.085 1.39 1.758.769l11.453-10.581a1.5 1.5 0 0 0-.916-2.593h-9.1V1.311C13.549.574 12.894 0 12.128 0z"/></svg>;
const ViteIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22.03 3.655L12 22 1.97 3.655l9.263 1.755z"/></svg>;
const NpmIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.336h-3.464V8.36h-3.456v10.318h-6.91z"/></svg>;
const ScrumIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.5 9.5a8.5 8.5 0 0 0-15 0"/><path d="M4.5 14.5a8.5 8.5 0 0 0 15 0"/><path d="m19 12 3-3"/><path d="m5 12-3 3"/></svg>;
const ChatgptIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22.28 9.82a8.82 8.82 0 0 0-1.12-6.52c-.75-1.29-2-2.15-3.43-2.38a8.88 8.88 0 0 0-7.39 2A8.82 8.82 0 0 0 4.4 1.76a8.88 8.88 0 0 0-6 4.3A8.82 8.82 0 0 0 1.7 14.2a8.88 8.88 0 0 0 1.13 6.52c.76 1.28 2.01 2.14 3.44 2.38a8.88 8.88 0 0 0 7.39-2A8.82 8.82 0 0 0 19.6 22.2a8.88 8.88 0 0 0 6-4.3 8.82 8.82 0 0 0-3.32-8.08zM12 20.84a6.52 6.52 0 0 1-5.64-3.26l5.22-3.02a1.35 1.35 0 0 0 .68-1.17V7.15A6.52 6.52 0 0 1 18.25 10.3l-5.63 3.25a2.15 2.15 0 0 1-.62.34v6.95zm-6.72-2.14a6.52 6.52 0 0 1-2.15-6.28l5.22 3.01v6.23a6.52 6.52 0 0 1-3.07-2.96zm-2.07-7.7A6.52 6.52 0 0 1 7.42 4.16l2.16 5.37-5.23 3.01a6.52 6.52 0 0 1-1.14-1.54zm9.07-6.84A6.52 6.52 0 0 1 17.93 7.42l-2.16-5.37L12.28 5A6.52 6.52 0 0 1 12.28 4.16zm5.63 3.26a6.52 6.52 0 0 1 2.15 6.28l-5.22-3v-6.23a6.52 6.52 0 0 1 3.07 2.95zm2.08 7.7a6.52 6.52 0 0 1-4.22 6.84l-2.16-5.37 5.23-3a6.52 6.52 0 0 1 1.15 1.53z"/></svg>;
const GeminiIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg>;
const ClaudeIcon = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/><path d="M12 12 2.5 7.5"/><path d="M12 12 21.5 16.5"/></svg>; // Icono abstracto para Claude

// --- DICCIONARIO DE TRADUCCIONES ---
const dict = {
  es: {
    nav: { portfolio: "Inicio", archive: "Proyectos", studio: "Trayectoria", skills: "Habilidades", contact: "Contacto" },
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
      c5: { title: "5to Ciclo (Actualidad)", desc: "Desarrollo de aplicaciones móviles (Kotlin), Big Data e IoT, administración y servicios en la nube." },
      c4: { title: "4to Ciclo (2025-II)", desc: "React, Angular, creación de APIs RESTful con Spring Boot y metodología Scrum." },
      c3: { title: "3er Ciclo (2025-I)", desc: "MySQL Workbench, normalización de bases de datos, mis primeras APIs con Java y Oracle SQL Database." },
      c2: { title: "2do Ciclo (2024-II)", desc: "Java, Java Web y Bootstrap." },
      c1: { title: "1er Ciclo (2024-I)", desc: "HTML, CSS y fundamentos básicos de Python." },
      edu2: "Inglés - Nivel Avanzado",
      edu2desc: "Estudios culminados satisfactoriamente en el Instituto Cultural Peruano Norteamericano (ICPNA), alcanzando un nivel avanzado (C1) para fluidez técnica y comunicativa."
    },
    skills: {
      title: "Mis Habilidades",
      frontend: "Frontend & Móvil",
      backend: "Backend & Bases de Datos",
      tools: "Herramientas & Metodologías",
      ai: "Inteligencia Artificial",
      infoBtn: "Más info",
      backBtn: "Volver",
      descriptions: {
        frontend: "El Frontend es todo lo que el usuario ve y con lo que interactúa en una aplicación o página web. Me encargo de traducir diseños en interfaces funcionales, rápidas y adaptables a cualquier pantalla (celulares, tablets o computadoras).",
        backend: "El Backend es el 'motor' invisible de las aplicaciones. Aquí gestiono la lógica del negocio, la seguridad y las bases de datos, asegurando que la información fluya correctamente y se almacene de forma segura.",
        tools: "Utilizo herramientas y metodologías modernas para garantizar que el código sea colaborativo, escalable y se entregue de manera organizada, siguiendo estándares de la industria como metodologías ágiles.",
        ai: "Integro y utilizo modelos de Inteligencia Artificial para optimizar procesos de desarrollo, resolver problemas complejos más rápido y explorar nuevas formas de mejorar la experiencia del usuario."
      }
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
    nav: { portfolio: "Home", archive: "Projects", studio: "Journey", skills: "Skills", contact: "Contact" },
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
      c5: { title: "5th Cycle (Current)", desc: "Mobile development (Kotlin), Big Data and IoT, cloud administration and services." },
      c4: { title: "4th Cycle", desc: "React, Angular, RESTful APIs with Spring Boot, and Scrum methodology." },
      c3: { title: "3rd Cycle (2025-I)", desc: "MySQL Workbench, DB normalization, first Java APIs, and Oracle SQL Database." },
      c2: { title: "2nd Cycle (2024-II)", desc: "Java, Java Web, and Bootstrap." },
      c1: { title: "1st Cycle (2024-I)", desc: "HTML, CSS, and basic Python." },
      edu2: "English - Advanced Level",
      edu2desc: "Completed studies at ICPNA, achieving a C1 advanced level for technical fluency."
    },
    skills: {
      title: "My Skills",
      frontend: "Frontend & Mobile",
      backend: "Backend & Databases",
      tools: "Tools & Methodologies",
      ai: "Artificial Intelligence",
      infoBtn: "More info",
      backBtn: "Back",
      descriptions: {
        frontend: "Frontend is everything the user sees and interacts with. I translate designs into functional, fast, and responsive interfaces that work seamlessly across mobile devices, tablets, and desktop computers.",
        backend: "Backend is the invisible 'engine' of applications. I manage business logic, security, and databases here, ensuring data flows correctly and is stored safely.",
        tools: "I use modern tools and methodologies to ensure code is collaborative, scalable, and delivered in an organized manner, following industry standards like Agile methodologies.",
        ai: "I integrate and utilize AI models to optimize development processes, solve complex problems faster, and explore new ways to enhance the user experience."
      }
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
    <div className="max-w-screen-2xl mx-auto overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-300 relative">
      
      {/* NAVBAR: FIXED */}
      <header className="fixed top-0 left-0 w-full z-50 glass bg-background/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black tracking-[-1.5px] font-sans text-on-background">
            RAMCUBAS<span className="text-primary">.DEV</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center font-sans">
            <a className="label-caps text-on-background hover:text-primary transition-colors" href="#hero">{t.nav.portfolio}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#expertise">{t.nav.studio}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#skills">{t.nav.skills}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#process">{t.nav.archive}</a>
            <a className="label-caps hover:text-primary transition-colors" href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="group p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors flex items-center justify-center text-on-background">
              <Globe size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="ml-2 text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
            <button onClick={toggleTheme} className="group p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors text-on-background">
              {theme === 'light' ? (
                <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
              ) : (
                <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-24 pt-28 md:pt-36">
        
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

        {/* JOURNEY TRAYECTORIA */}
        <section id="expertise" className="flex flex-col gap-20 px-6 md:px-12 lg:px-24 py-20 bg-surface-container rounded-3xl mx-4 md:mx-12 scroll-mt-32">
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-sm sticky top-32">{t.journey.title}</h2>
            <div className="max-w-xl flex flex-col gap-12 w-full">
              <TimelineItem icon={<Code size={24}/>} title={t.journey.c5.title} desc={t.journey.c5.desc} isPrimary />
              <TimelineItem icon={<BookOpen size={24}/>} title={t.journey.c4.title} desc={t.journey.c4.desc} />
              <TimelineItem icon={<Database size={24}/>} title={t.journey.c3.title} desc={t.journey.c3.desc} />
              <TimelineItem icon={<Server size={24}/>} title={t.journey.c2.title} desc={t.journey.c2.desc} />
              <TimelineItem icon={<LayoutGrid size={24}/>} title={t.journey.c1.title} desc={t.journey.c1.desc} />
              <div className="border-t border-outline-variant pt-8 mt-4">
                <TimelineItem icon={<Award size={24}/>} title={t.journey.edu2} desc={t.journey.edu2desc} />
              </div>
            </div>
          </div>
        </section>

        {/* HABILIDADES (FLIP CARDS CON ESTILOS INLINE PARA EVITAR BUGS 3D) */}
        <section id="skills" className="px-6 md:px-12 lg:px-24 scroll-mt-32">
           <SkillsSection t={t} />
        </section>

        {/* PROJECTS CAROUSEL */}
        <section id="process" className="px-6 md:px-12 lg:px-24 scroll-mt-32">
          <ProjectCarousel t={t} />
        </section>

        {/* CONTACTO */}
        <section id="contact" className="px-6 md:px-12 lg:px-24 scroll-mt-32 pb-6 md:pb-12">
          <ContactForm t={t} />
        </section>
      </main>

      {/* MOBILE NAV */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-2 glass-dock rounded-full border border-outline-variant/30 shadow-lg shadow-black/20">
        <a className="p-3 text-on-background hover:text-primary transition-colors" title={t.nav.portfolio} href="#hero"><Home size={18} /></a>
        <a className="p-3 text-tertiary hover:text-primary transition-colors" title={t.nav.studio} href="#expertise"><School size={18} /></a>
        <a className="p-3 text-tertiary hover:text-primary transition-colors" title={t.nav.skills} href="#skills"><Code size={18} /></a>
        <a className="p-3 text-tertiary hover:text-primary transition-colors" title={t.nav.archive} href="#process"><LayoutGrid size={18} /></a>
        <a className="p-3 text-tertiary hover:text-primary transition-colors" title={t.nav.contact} href="#contact"><Mail size={18} /></a>
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTES ---

// COMPONENTE DE TARJETA FLIP INDIVIDUAL
const FlipSkillCard = ({ group, t }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // Aumentamos la altura a h-[360px] para que nada sobresalga
    <div className="h-100 relative" style={{ perspective: "1000px" }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* === LADO FRONTAL === */}
        <div 
          className="absolute inset-0 bg-surface-container rounded-3xl p-8 border border-outline-variant/50 flex flex-col justify-start overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start mb-6">
            {group.icon}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
              className="p-2 bg-background hover:bg-primary hover:text-white rounded-full transition-colors border border-outline-variant/30 shrink-0"
              title={t.skills.infoBtn}
            >
              <Info size={16} />
            </button>
          </div>
          <h3 className="font-bold text-xl mb-6">{group.category}</h3>
          
          <div className="flex flex-wrap gap-2 content-start">
            {group.items.map((item: any, i: number) => (
              <a 
                key={i} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()} 
                className="px-3 py-1.5 bg-background hover:bg-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-outline-variant/30"
              >
                {item.icon} {item.name} <ExternalLink size={10} className="opacity-50 ml-0.5"/>
              </a>
            ))}
          </div>
        </div>

        {/* === LADO TRASERO (LA EXPLICACIÓN) === */}
        <div 
          className="absolute inset-0 bg-primary text-white rounded-3xl p-8 border border-primary flex flex-col justify-between cursor-pointer"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          onClick={() => setIsFlipped(false)}
        >
           <div>
             <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-xl pr-4">{group.category}</h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                  className="p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-colors shrink-0"
                  title={t.skills.backBtn}
                >
                  <RotateCcw size={16} />
                </button>
             </div>
             <p className="text-sm leading-relaxed text-white/90">
               {group.description}
             </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

// COMPONENTE DE SECCIÓN DE HABILIDADES CON LINKS E ICONOS REALES
const SkillsSection = ({ t }: any) => {
  const skillsData = [
    {
      category: t.skills.frontend,
      description: t.skills.descriptions.frontend,
      icon: <Smartphone size={24} className="text-primary" />,
      items: [
        { name: "React", url: "https://react.dev/", icon: <ReactIcon /> },
        { name: "Angular", url: "https://angular.io/", icon: <AngularIcon /> },
        { name: "Flutter", url: "https://flutter.dev/", icon: <FlutterIcon /> },
        { name: "Kotlin", url: "https://kotlinlang.org/", icon: <KotlinIcon /> },
        { name: "HTML/CSS", url: "https://developer.mozilla.org/es/docs/Web", icon: <HtmlIcon /> },
        { name: "Bootstrap", url: "https://getbootstrap.com/", icon: <BootstrapIcon /> }
      ]
    },
    {
      category: t.skills.backend,
      description: t.skills.descriptions.backend,
      icon: <Database size={24} className="text-primary" />,
      items: [
        { name: "Java", url: "https://www.java.com/", icon: <JavaIcon /> },
        { name: "Spring Boot", url: "https://spring.io/projects/spring-boot", icon: <SpringIcon /> },
        { name: "MySQL", url: "https://www.mysql.com/", icon: <MysqlIcon /> },
        { name: "Oracle SQL", url: "https://www.oracle.com/database/", icon: <MysqlIcon /> },
        { name: "Supabase", url: "https://supabase.com/", icon: <SupabaseIcon /> }
      ]
    },
    {
      category: t.skills.tools,
      description: t.skills.descriptions.tools,
      icon: <Wrench size={24} className="text-primary" />,
      items: [
        { name: "Vite", url: "https://vitejs.dev/", icon: <ViteIcon /> },
        { name: "GitHub", url: "https://github.com/", icon: <GithubIcon size={14}/> },
        { name: "npm", url: "https://www.npmjs.com/", icon: <NpmIcon /> },
        { name: "Scrum", url: "https://www.scrum.org/", icon: <ScrumIcon /> }
      ]
    },
    {
      category: t.skills.ai,
      description: t.skills.descriptions.ai,
      icon: <Bot size={24} className="text-primary" />,
      items: [
        { name: "Gemini", url: "https://gemini.google.com/", icon: <GeminiIcon /> },
        { name: "ChatGPT", url: "https://chat.openai.com/", icon: <ChatgptIcon /> },
        { name: "Claude AI", url: "https://claude.ai/", icon: <ClaudeIcon /> }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="font-serif text-5xl tracking-tight mb-8">{t.skills.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillsData.map((group, index) => (
          <FlipSkillCard key={index} group={group} t={t} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ icon, title, desc, isPrimary = false }: any) => (
  <div className="flex gap-6 group">
    <div className={`pt-1 transition-transform group-hover:scale-110 ${isPrimary ? 'text-primary' : 'text-on-surface-variant'}`}>{icon}</div>
    <div>
      <h3 className={`text-xl font-bold mb-2 ${isPrimary ? 'text-primary' : ''}`}>{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant/30 pb-6 gap-4">
        <div>
          <span className="label-caps mb-4 block text-primary">{t.projects.subtitle}</span>
          <h2 className="font-serif text-5xl tracking-tight">{t.projects.title}</h2>
        </div>
        <div className="flex gap-4">
          <button onClick={() => scroll("l")} className="p-3 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all"><ChevronLeft size={20}/></button>
          <button onClick={() => scroll("r")} className="p-3 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-surface-container [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full"
      >
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
      <motion.div
        whileHover={{ y: -10 }}
        className="flex flex-col gap-6 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="aspect-video bg-surface-container overflow-hidden relative rounded-xl group">
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
              className="bg-background w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-primary z-10"
                onClick={handleClose}
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-3/5 bg-surface-container relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none min-h-[40vh] md:min-h-[60vh]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={images[currentImg]}
                      alt={`${title}-${currentImg}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  </AnimatePresence>

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

                  {images.length > 1 && (
                    <>
                      <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full">←</button>
                      <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full">→</button>
                    </>
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/5 p-8 flex flex-col gap-8">
                <h3 className="text-3xl font-bold">{title}</h3>
                <p>{desc}</p>

                <div>
                  <span className="text-primary font-bold uppercase text-[11px] tracking-widest block mb-2">
                    {tText.projects.learned}
                  </span>
                  <p className="italic border-l-2 border-primary pl-4">{learned}</p>
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
    <div className="border-t border-outline-variant pt-16 flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="md:w-1/3">
         <h2 className="font-serif text-[4rem] leading-none mb-8">{t.contact.title}</h2>
         <p className="text-on-surface-variant">{t.contact.subtitle}</p>
      </div>
      <div className="md:w-2/3 flex flex-col gap-8 w-full">
        
        <div className="border-2 border-primary rounded-3xl p-8 md:p-12 shadow-lg bg-surface-container/20">
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
        </div>

        <footer className="mt-8 flex justify-between items-center border-t border-outline-variant pt-8 mb-4">
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