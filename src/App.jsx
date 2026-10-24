import { useEffect, useRef, useState } from 'react'
import { Apple, ArrowLeft, ArrowRight, ArrowUpRight, Brain, Check, Dumbbell, Footprints, HeartHandshake, Mail, MapPin, Menu, MessageCircle, Moon, Phone, Sprout, Stethoscope, Sun, UsersRound, Utensils, X } from 'lucide-react'
import logo from '../assets/PNG/LOGOTIPO_1.png'
import footerLogo from '../assets/PNG/IMAGOTIPO_2.png'
import heroPhoto from '../assets/IMAGEN PROMOCIONAL 2.jpg'
import familyPhoto from '../assets/IMAGEN PROMOCIONAL 1.png'
import philosophyPhoto from '../assets/web/IMAGEN_PROMOCIONAL_3.webp'
import { contact, whatsappUrl } from './siteContent.js'

const portraitFiles = import.meta.glob('../assets/MIEMBROS RENACER/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const portraits = Object.entries(portraitFiles).map(([path, url]) => ({
  name: normalize(path.split('/').pop().split('_')[0].replace(/\.png$/i, '')),
  url,
}))
const portraitFor = (name) => portraits.find((item) => item.name === normalize(name))?.url

const pillars = [
  ['Rendimiento cognitivo', 'Estimulamos la memoria, la atención y las funciones ejecutivas.', Brain],
  ['Ejercicio funcional', 'Fortalecemos el cuerpo, la movilidad y la independencia cotidiana.', Dumbbell],
  ['Nutrición inteligente', 'Cuidamos la alimentación y el bienestar nutricional de cada persona.', Apple],
  ['Acompañamiento y conexión', 'Impulsamos vínculos, convivencia, pertenencia y propósito.', HeartHandshake],
  ['Equilibrio emocional', 'Damos lugar a la salud emocional y la tranquilidad mental.', Sprout],
  ['Descanso y recuperación', 'Reconocemos el valor del sueño y la recuperación física y mental.', Moon],
]

const team = [
  {
    name: 'Dr. Santiago López Malo',
    role: 'Director y fundador',
    detail: 'Formación en neuropsicología, gerontología, psicogerontología y cuidado del adulto mayor.',
    photoKey: 'Dr. Santiago López Malo',
    framing: 'wide',
  },
  { name: 'Teresa Guerrero', role: 'Psicóloga' },
  { name: 'Dra. Paola Gerard', role: 'MPSS', photoKey: 'Paola Gerard' },
  { name: 'Aranza García', role: 'Fisioterapeuta a domicilio', framing: 'low' },
  { name: 'María José Muñoz', role: 'Odontología integral' },
  { name: 'Juan Pablo Casco', role: 'Enfermería' },
  { name: 'Rodolfo Sánchez', role: 'Psicólogo' },
  { name: 'Diego Molares', role: 'Fisioterapeuta', photoKey: 'Diego Morales' },
  { name: 'Aline Vivanco', role: 'Pasante de enfermería' },
  { name: 'Joshua Delgado', role: 'Pasante de enfermería' },
  { name: 'Erika Muñoz', role: 'Pasante de enfermería' },
].map((person) => ({ ...person, portrait: portraitFor(person.photoKey || person.name) }))
  .filter((person) => person.portrait)

const navItems = [
  ['Renacer', '#renacer'],
  ['Nuestro enfoque', '#enfoque'],
  ['Servicios', '#servicios'],
  ['Equipo', '#equipo'],
  ['Vida en Renacer', '#vida'],
]

function TextLink({ href, children, light = false }) {
  return <a className={`text-link${light ? ' text-link--light' : ''}`} href={href}>{children}<ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  useEffect(() => {
    const updateHeight = () => document.documentElement.style.setProperty('--header-height', `${header.current.offsetHeight}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header.current)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return (
    <header className="site-header" id="inicio" ref={header}>
      <div className="container header-inner">
        <a className="brand-link" href="#inicio" aria-label="Instituto Renacer Puebla, ir al inicio"><img src={logo} alt="Instituto Renacer" /></a>
        <nav className={`main-nav${open ? ' main-nav--open' : ''}`} id="main-nav" aria-label="Navegación principal">
          {navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-mobile-cta" href={whatsappUrl} onClick={() => setOpen(false)}>Agenda una visita <ArrowUpRight size={18} aria-hidden="true" /></a>
        </nav>
        <a className="button button--small header-cta" href={whatsappUrl}>Agenda una visita <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="section-kicker">Residencia para adultos mayores en Puebla</p>
          <h1 id="hero-title">Bienestar y compañía para seguir viviendo <em>plenamente.</em></h1>
          <p className="hero-lead">En Instituto Renacer acompañamos a cada persona con atención integral y personalizada, cuidando su salud, su independencia y su vida cotidiana.</p>
          <div className="hero-actions">
            <a className="button" href={whatsappUrl}>Agenda una visita <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" /></a>
            <TextLink href="#enfoque">Conoce nuestro enfoque</TextLink>
          </div>
        </div>
        <div className="hero-media">
          <img src={heroPhoto} alt="Mujer mayor sonriendo mientras observa unas flores" fetchPriority="high" />
          <span className="hero-media-note">Una etapa para seguir disfrutando la vida.</span>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="intro section" id="renacer" aria-labelledby="intro-title">
      <div className="container intro-layout">
        <div className="intro-media"><img src={familyPhoto} alt="Una mujer joven y una mujer mayor comparten un abrazo" loading="lazy" /></div>
        <div className="intro-main">
          <p className="section-kicker">Quiénes somos</p>
          <h2 id="intro-title">Un lugar donde la atención se convierte en <span>calidad de vida.</span></h2>
          <div className="intro-bottom">
            <p>Somos una residencia para adultos mayores en Puebla. Nuestro enfoque reúne acompañamiento cercano, planes individuales y un equipo multidisciplinario para atender a cada persona de forma integral.</p>
            <TextLink href="#servicios">Descubre cómo acompañamos</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="philosophy section" id="enfoque" aria-labelledby="philosophy-title">
      <div className="container philosophy-layout">
        <div className="philosophy-visual">
          <div className="philosophy-word" aria-hidden="true"><span>vida.</span><small>en cada etapa</small></div>
          <img src={philosophyPhoto} alt="Mujer mayor sonriendo al observar unas flores" loading="lazy" />
        </div>
        <div className="philosophy-copy">
          <p className="section-kicker section-kicker--light">Una forma de entender esta etapa</p>
          <h2 id="philosophy-title">El bienestar se construye <em>todos los días.</em></h2>
          <p>Creemos en actuar antes de que aparezca la dependencia: cuidar el movimiento, la mente, la alimentación y los vínculos que dan sentido a la vida cotidiana.</p>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section className="pillars section" aria-labelledby="pillars-title">
      <div className="container pillars-layout">
        <div className="pillars-intro">
          <p className="section-kicker">Nuestro enfoque</p>
          <h2 id="pillars-title">Seis pilares.<br /><span>Una vida con más posibilidades.</span></h2>
          <p>Esta es la base de nuestra forma de acompañar el envejecimiento: mirar a la persona completa, no sólo sus necesidades de cuidado.</p>
        </div>
        <ol className="pillar-list">
          {pillars.map(([title, description, Icon], index) => (
            <li className="pillar-item" key={title}>
              <span className="pillar-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h3><Icon className="pillar-icon" size={28} strokeWidth={1.6} aria-hidden="true" /><span>{title}</span></h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services section" id="servicios" aria-labelledby="services-title">
      <div className="container services-layout">
        <div className="services-heading">
          <div>
            <p className="section-kicker">Acompañamiento profesional</p>
            <h2 id="services-title">Cuidado profesional.<br /><em>A su medida.</em></h2>
          </div>
          <div className="services-intro">
            <p>Cada persona necesita apoyos distintos. Reunimos atención en salud, movimiento y bienestar en un plan individual.</p>
            <TextLink href="#equipo">Conoce a quienes le acompañan</TextLink>
          </div>
        </div>
        <div className="service-list">
          <article className="service-row"><Stethoscope className="service-icon" size={34} strokeWidth={1.5} aria-hidden="true" /><div><h3>Salud y seguimiento</h3><p>Enfermería, seguimiento médico y apoyo con medicamentos para cuidar su salud día a día.</p></div></article>
          <article className="service-row"><Dumbbell className="service-icon" size={34} strokeWidth={1.5} aria-hidden="true" /><div><h3>Movimiento y rehabilitación</h3><p>Rehabilitación física y pulmonar, y actividad física para conservar movilidad e independencia.</p></div></article>
          <article className="service-row"><HeartHandshake className="service-icon" size={34} strokeWidth={1.5} aria-hidden="true" /><div><h3>Mente y bienestar emocional</h3><p>Estimulación cognitiva y acompañamiento psicológico para cuidar la mente y las emociones.</p></div></article>
          <article className="service-row"><Utensils className="service-icon" size={34} strokeWidth={1.5} aria-hidden="true" /><div><h3>Nutrición y convivencia</h3><p>Alimentación, apoyo nutricional y actividades compartidas para nutrir el cuerpo y los vínculos.</p></div></article>
        </div>
      </div>
    </section>
  )
}

function Team() {
  const track = useRef(null)
  const [position, setPosition] = useState({ prev: false, next: true })

  useEffect(() => {
    const element = track.current
    if (!element) return
    const update = () => setPosition({
      prev: element.scrollLeft > 4,
      next: element.scrollLeft + element.clientWidth < element.scrollWidth - 4,
    })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })
    return () => { observer.disconnect(); element.removeEventListener('scroll', update) }
  }, [])

  const move = (direction) => {
    const element = track.current
    if (!element) return
    const card = element.querySelector('.team-person')
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 300) + gap), behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <section className="team section" id="equipo" aria-labelledby="team-title">
      <div className="container">
        <div className="team-heading">
          <div><p className="section-kicker">Nuestro equipo</p><h2 id="team-title">Personas detrás de cada cuidado.</h2><p>Distintas disciplinas, una misma atención cercana a quienes viven en Renacer y a sus familias.</p></div>
          <div className="carousel-controls" aria-label="Controles del equipo">
            <button type="button" aria-label="Ver integrantes anteriores" onClick={() => move(-1)} disabled={!position.prev}><ArrowLeft size={21} aria-hidden="true" /></button>
            <button type="button" aria-label="Ver siguientes integrantes" onClick={() => move(1)} disabled={!position.next}><ArrowRight size={21} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="team-track" ref={track} tabIndex="0" role="region" aria-label="Integrantes del equipo; desplázate para ver más">
          {team.map((person) => {
            return <article className="team-person" key={person.name}>
              <div className={`team-portrait${person.framing ? ` team-portrait--${person.framing}` : ''}`}>
                <img src={person.portrait} alt={`Retrato de ${person.name}`} loading="lazy" />
              </div>
              <div className="team-person-info"><h3>{person.name}</h3><p className="team-role">{person.role}</p>{person.detail && <p className="team-detail">{person.detail}</p>}</div>
            </article>
          })}
        </div>
        <p className="carousel-hint">Desliza para conocer al equipo <ArrowRight size={16} aria-hidden="true" /></p>
      </div>
    </section>
  )
}

function DailyLife() {
  return (
    <section className="life section" id="vida" aria-labelledby="life-title">
      <div className="container life-layout">
        <div className="life-copy">
          <p className="section-kicker">Vida en Renacer</p>
          <h2 id="life-title">Cada día,<br />algo que <em>disfrutar.</em></h2>
          <p>El bienestar también está en una conversación, en moverse y en compartir. En Renacer, la convivencia y las actividades forman parte del cuidado cotidiano.</p>
          <TextLink href={whatsappUrl}>Ven a conocer la residencia</TextLink>
        </div>
        <div className="life-visual">
          <p className="life-label">Pequeños momentos, más vida</p>
          <ul className="life-moments">
            <li><h3><UsersRound className="life-icon" size={28} strokeWidth={1.5} aria-hidden="true" /><span>Convivir.</span></h3><p>Conversaciones y actividades sociales para crear vínculos y sentirse parte.</p></li>
            <li><h3><Footprints className="life-icon" size={28} strokeWidth={1.5} aria-hidden="true" /><span>Moverse.</span></h3><p>Movimiento y actividad física para acompañar la independencia cotidiana.</p></li>
            <li><h3><Sun className="life-icon" size={28} strokeWidth={1.5} aria-hidden="true" /><span>Disfrutar.</span></h3><p>Actividades recreativas para participar, compartir y encontrar propósito.</p></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Family() {
  return (
    <section className="family section" aria-labelledby="family-title">
      <div className="container family-layout">
        <div className="family-media"><div className="family-media-backdrop" /><img src={familyPhoto} alt="Mujer adulta y mujer mayor compartiendo un abrazo y una sonrisa" loading="lazy" /></div>
        <div className="family-copy">
          <p className="section-kicker">Para quienes acompañan desde cerca</p>
          <h2 id="family-title">También estamos aquí para <em>tu familia.</em></h2>
          <p>Elegir una residencia es una decisión importante. Te acompañamos a conocer Renacer con calma y a conversar sobre lo que necesita tu familiar.</p>
          <div className="family-visit">
            <h3>Un espacio para tus preguntas</h3>
            <ul>
              <li><Check size={17} aria-hidden="true" /><span>Conoce la residencia y a nuestro equipo.</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Conversa sobre los apoyos que necesita tu familiar.</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Resuelve tus dudas antes de decidir.</span></li>
            </ul>
          </div>
          <TextLink href={whatsappUrl}>Conversemos por WhatsApp</TextLink>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section className="visit section" id="visita" aria-labelledby="visit-title">
      <div className="container visit-layout">
        <div><p className="section-kicker section-kicker--light">El siguiente paso</p><h2 id="visit-title">Conoce Renacer <em>personalmente.</em></h2><p>Visita la residencia, conoce al equipo y resuelve tus dudas con calma.</p></div>
        <div className="visit-action"><a className="button button--cream" href={whatsappUrl}>Agenda una visita <MessageCircle size={20} aria-hidden="true" /></a><small>Escríbenos por WhatsApp para coordinar tu visita.</small></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="container footer-grid">
        <div className="footer-brand"><img src={footerLogo} alt="Instituto Renacer" /><p>Calidad de vida, independencia y acompañamiento para adultos mayores en Puebla.</p></div>
        <div className="footer-col"><h2>Explora</h2><a href="#renacer">Renacer</a><a href="#enfoque">Nuestro enfoque</a><a href="#servicios">Servicios</a><a href="#equipo">Equipo</a><a href="#vida">Vida en Renacer</a></div>
        <div className="footer-col footer-contact"><h2>Contacto</h2>
          <p><Phone size={17} aria-hidden="true" /> <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a></p>
          <p><MessageCircle size={17} aria-hidden="true" /> <a href={whatsappUrl}>WhatsApp · Agenda una visita</a></p>
          {contact.email && <p><Mail size={17} aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
          <p><MapPin size={17} aria-hidden="true" /> {contact.address}</p>
          {contact.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Instituto Renacer Puebla</span><span>Un espacio para seguir viviendo plenamente.</span></div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const visualSelectors = '.hero-media, .intro-media, .philosophy-visual, .life-visual, .family-media'
    const groupSelectors = '.pillar-item, .service-row, .team-person'
    const targetSelectors = `${visualSelectors}, ${groupSelectors}, main section h1, main section h2, main section h3, main section p, main section img`
    const targets = [...document.querySelectorAll(targetSelectors)].filter((element) => {
      const parent = element.closest(`${visualSelectors}, ${groupSelectors}`)
      return !parent || parent === element
    })

    const sectionCounts = new Map()
    targets.forEach((element) => {
      element.classList.add('reveal-target')
      if (element.matches(visualSelectors)) element.dataset.reveal = 'image'
      if (element.matches('.pillar-item')) {
        const index = [...element.parentElement.children].indexOf(element)
        element.style.setProperty('--reveal-delay', `${Math.min(index * 55, 275)}ms`)
      } else {
        const section = element.closest('section')
        const index = sectionCounts.get(section) || 0
        element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`)
        sectionCounts.set(section, index + 1)
      }
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' })

    targets.forEach((element) => observer.observe(element))
    document.documentElement.classList.add('motion-ready')
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <Header />
    <main id="contenido"><Hero /><Intro /><Philosophy /><Pillars /><Services /><Team /><DailyLife /><Family /><Visit /></main>
    <Footer />
  </>
}
