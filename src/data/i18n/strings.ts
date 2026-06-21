export const es = {
	"site.skip": "Saltar al contenido",
	"nav.projects": "Proyectos",
	"nav.stack": "Stack",
	"nav.contact": "Contacto",
	"hero.eyebrow": "Full-Stack, seguridad y sistemas en tiempo real",
	"hero.title": "José Carlos Gómez R.",
	"hero.tagline":
		"Construyo aplicaciones web claras, rápidas y seguras: desde paneles de control y PWAs hasta sistemas con datos en tiempo real, Supabase, PostgreSQL y despliegues listos para producción.",
	"hero.cta.projects": "Ver proyectos",
	"hero.cta.linkedin": "LinkedIn",
	"hero.cta.cv": "Descargar CV",
	"hero.card.build": "build(secureProducts)",
	"hero.card.deploy": "deploy(fastExperiences)",
	"hero.card.scale": "scale(realTimeSystems)",
	"hero.card.pwa": "PWA",
	"hero.card.pwaDesc": "offline-ready",
	"hero.card.rls": "RLS",
	"hero.card.rlsDesc": "secure data",
	"hero.card.rtc": "RTC",
	"hero.card.rtcDesc": "low latency",
	"about.title": "Desarrollo con enfoque práctico.",
	"about.body1":
		"Actualmente estudio Ingeniería de Software y trabajo proyectos Full-Stack donde combino frontend, backend, bases de datos, seguridad y despliegue.",
	"about.body2":
		"Me gusta construir productos que se entiendan rápido, respondan bien y sean confiables para quien los usa: interfaces limpias, arquitectura simple y detalles cuidados sin complicar de más.",
	"skills.title": "Tecnologías que uso para construir.",
	"skills.subtitle":
		"Herramientas que he usado en interfaces, APIs, bases de datos, seguridad y despliegues.",
	"projects.eyebrow": "Proyectos destacados",
	"projects.title":
		"Proyectos reales con interfaz, lógica de negocio y despliegue.",
	"projects.viewGithub": "Ver en GitHub",
	"projects.viewLarger": "Ver grande",
	"projects.carousel.prev": "Imagen anterior",
	"projects.carousel.next": "Imagen siguiente",
	"education.eyebrow": "Formación continua",
	"education.title": "Base académica y certificaciones aplicadas.",
	"education.subtitle":
		"Mi formación combina ingeniería, seguridad, Python, datos e inglés técnico. Lo aplico directamente en proyectos con frontend, backend y bases de datos.",
	"contact.title": "Hablemos de tu próxima idea.",
	"contact.subtitle":
		"Si quieres revisar mi trabajo, proponer una colaboración o simplemente contactarme, aquí tienes mis canales principales.",
	"contact.eyebrow": "Contacto directo",
	"contact.helper":
		"Elige el canal que prefieras y te responderé lo antes posible.",
	"contact.viewEmail": "Ver email",
	"contact.copyStatus": "Email copiado al portapapeles.",
	"footer.copyright": "© 2026 José Carlos Gómez R.",
	"lang.toggle": "Cambiar idioma a inglés",
	"theme.toggle": "Cambiar tema",
	"theme.label.dark": "Dark",
	"theme.label.light": "Light",
	"lightbox.close": "Cerrar",
	"lightbox.aria": "Vista ampliada del proyecto",
} as const;

export const en = {
	"site.skip": "Skip to content",
	"nav.projects": "Projects",
	"nav.stack": "Stack",
	"nav.contact": "Contact",
	"hero.eyebrow": "Full-stack, security and real-time systems",
	"hero.title": "José Carlos Gómez R.",
	"hero.tagline":
		"I build clear, fast and secure web applications: from dashboards and PWAs to real-time data systems with Supabase, PostgreSQL and production-ready deployments.",
	"hero.cta.projects": "View projects",
	"hero.cta.linkedin": "LinkedIn",
	"hero.cta.cv": "Download CV",
	"hero.card.build": "build(secureProducts)",
	"hero.card.deploy": "deploy(fastExperiences)",
	"hero.card.scale": "scale(realTimeSystems)",
	"hero.card.pwa": "PWA",
	"hero.card.pwaDesc": "offline-ready",
	"hero.card.rls": "RLS",
	"hero.card.rlsDesc": "secure data",
	"hero.card.rtc": "RTC",
	"hero.card.rtcDesc": "low latency",
	"about.title": "Practical product-focused development.",
	"about.body1":
		"I am currently studying Software Engineering and work on full-stack projects that combine frontend, backend, databases, security and deployment.",
	"about.body2":
		"I like building products that are easy to understand, responsive and reliable for users: clean interfaces, simple architecture and careful details without overcomplicating things.",
	"skills.title": "Technologies I use to build.",
	"skills.subtitle":
		"Tools I have used across interfaces, APIs, databases, security and deployments.",
	"projects.eyebrow": "Featured projects",
	"projects.title": "Real projects with interface, business logic and deployment.",
	"projects.viewGithub": "View on GitHub",
	"projects.viewLarger": "View larger",
	"projects.carousel.prev": "Previous image",
	"projects.carousel.next": "Next image",
	"education.eyebrow": "Continuous learning",
	"education.title": "Academic foundation and applied certifications.",
	"education.subtitle":
		"My training combines engineering, security, Python, data and technical English. I apply it directly in projects with frontend, backend and databases.",
	"contact.title": "Let's talk about your next idea.",
	"contact.subtitle":
		"If you want to review my work, propose a collaboration or simply contact me, here are my main channels.",
	"contact.eyebrow": "Direct contact",
	"contact.helper": "Choose the channel you prefer and I will reply as soon as possible.",
	"contact.viewEmail": "View email",
	"contact.copyStatus": "Email copied to clipboard.",
	"footer.copyright": "© 2026 José Carlos Gómez R.",
	"lang.toggle": "Switch language to Spanish",
	"theme.toggle": "Toggle theme",
	"theme.label.dark": "Dark",
	"theme.label.light": "Light",
	"lightbox.close": "Close",
	"lightbox.aria": "Expanded project preview",
} as const;

export const translations = { es, en } as const;
export type TranslationKey = keyof typeof es;
