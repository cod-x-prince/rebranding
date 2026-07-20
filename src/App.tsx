import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, Pause, Play, X } from "lucide-react";
import { reels } from "./data/reels";

const EMAIL = "parmbeeredits@gmail.com";
const TEMPORARY_SHOWREEL = reels[0];

const principles = [
  ["01", "Find the actual hook", "Start where the tension, useful idea, or unexpected truth begins—not where the recording begins."],
  ["02", "Protect the message", "Remove repetition and filler without flattening the speaker's personality."],
  ["03", "Give the viewer a path", "Use motion, text, B-roll, and sound only when they make the next idea easier to follow."],
  ["04", "Leave a clear final beat", "End with a takeaway, a feeling, or a next step that makes the idea stay with the viewer."],
];

const process = [
  ["01", "Send the raw material", "A brief, footage, reference, and the point the video needs to make."],
  ["02", "Set the editorial direction", "Agree the hook, format, tone, and what good means before the timeline takes over."],
  ["03", "Receive the first cut", "A focused first version with room for feedback that strengthens the message."],
  ["04", "Refine and deliver", "Final files prepared for the platform, audience, and moment they need to meet."],
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function VideoFrame({ reel, className = "", autoPlay = false }: { reel: (typeof reels)[number]; className?: string; autoPlay?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    if (!video.current) return;
    if (video.current.paused) {
      video.current.play();
      setPlaying(true);
    } else {
      video.current.pause();
      setPlaying(false);
    }
  };
  return (
    <div className={`video-frame ${className}`}>
      <video
        ref={video}
        className="video-media"
        poster={reel.cloudPosterUrl}
        muted
        playsInline
        loop
        preload="metadata"
        autoPlay={autoPlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={reel.cloudVideoUrl} type="video/mp4" />
      </video>
      <button className="play-button" type="button" aria-label={playing ? "Pause video" : "Play video"} onClick={toggle}>
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <span className="timecode">{reel.duration}</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof reels)[number] | null>(null);
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: reduceMotion ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: reduceMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] } });

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Addictive Edits home">ADDICTIVE<span>®</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#showreel">Showreel</a><a href="#approach">Approach</a>
        </nav>
        <a className="header-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a onClick={() => setMenuOpen(false)} href="#work">Work</a><a onClick={() => setMenuOpen(false)} href="#showreel">Showreel</a><a onClick={() => setMenuOpen(false)} href="#approach">Approach</a><a onClick={() => setMenuOpen(false)} href="#contact">Start a project</a></nav>}
      </header>

      <main id="main">
        <section id="top" className="hero section-pad">
          <motion.div {...reveal()} className="hero-copy">
            <SectionLabel>ADDlCTIVE EDITS / VIDEO EDITORIAL</SectionLabel>
            <h1>Make the idea<br/><em>impossible</em> to<br/>scroll past.</h1>
            <p className="hero-intro">Retention-led editing for founders, creators, and brands with something worth saying.</p>
            <div className="hero-actions"><a className="button button-dark" href="#showreel">Watch showreel <ArrowDownRight size={17}/></a><a className="text-link" href="#work">View selected work <ArrowDownRight size={16}/></a></div>
          </motion.div>
          <motion.div {...reveal(0.12)} className="hero-art" aria-label="A selection of Addictive Edits project imagery">
            <div className="hero-rule hero-rule-one"/><div className="hero-rule hero-rule-two"/>
            <div className="hero-art-label">EDITORIAL / MOTION / SOUND</div>
            <img src={reels[1].cloudPosterUrl} alt="Still from a talking head edit" className="hero-image hero-image-main" />
            <img src={reels[4].cloudPosterUrl} alt="Still from a property reel" className="hero-image hero-image-accent" />
            <p className="hero-caption">Ideas worth watching,<br/>edited to be remembered.</p>
          </motion.div>
          <div className="hero-foot"><span>BASED IN BENGALURU / WORKING REMOTELY</span><span>SCROLL TO EXPLORE <ArrowDownRight size={14}/></span></div>
        </section>

        <section id="showreel" className="showreel section-pad dark-section">
          <motion.div {...reveal()} className="section-head section-head-light"><div><SectionLabel>01 / THE REEL</SectionLabel><h2>A fast look at<br/>the <em>range.</em></h2></div><p>A selection of hooks, stories, and visual systems built to make the message land—not just move.</p></motion.div>
          <motion.div {...reveal(0.1)} className="showreel-stage">
            <VideoFrame reel={TEMPORARY_SHOWREEL} autoPlay className="showreel-video" />
            <div className="showreel-meta"><span>SHOWREEL / 2026</span><span>EDITING · MOTION TYPOGRAPHY · SOUND DESIGN</span></div>
          </motion.div>
          <p className="asset-note">Temporary preview media is in place on this branch. Replace it with your dedicated showreel file or streaming link before launch.</p>
        </section>

        <section id="work" className="work section-pad">
          <motion.div {...reveal()} className="section-head"><div><SectionLabel>02 / SELECTED WORK</SectionLabel><h2>The edit changes<br/>with what it needs<br/>to <em>do.</em></h2></div><p>Every project is a piece of evidence: the brief, the editorial decision, and the finished video.</p></motion.div>
          <div className="project-grid">
            {reels.slice(0, 6).map((reel, index) => <motion.article {...reveal(index * 0.04)} className={`project-card project-${index + 1}`} key={reel.id}>
              <button type="button" className="project-media" onClick={() => setActiveProject(reel)} aria-label={`Open ${reel.title}`}>
                <img src={reel.cloudPosterUrl} alt="" /><span className="project-view">View edit <ArrowUpRight size={16}/></span>
              </button>
              <div className="project-copy"><div><p className="project-kicker">{reel.client}</p><h3>{reel.title}</h3></div><p>{reel.description}</p><button type="button" onClick={() => setActiveProject(reel)} className="project-link">Project details <ArrowUpRight size={15}/></button></div>
            </motion.article>)}
          </div>
        </section>

        <section id="approach" className="approach section-pad">
          <motion.div {...reveal()} className="approach-intro"><SectionLabel>03 / EDITORIAL THINKING</SectionLabel><h2>Retention isn’t a trick.<br/>It’s a sequence of <em>good decisions.</em></h2></motion.div>
          <div className="principles">{principles.map(([number, title, body], index) => <motion.article {...reveal(index * 0.06)} className="principle" key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></motion.article>)}</div>
        </section>

        <section className="fit section-pad dark-section">
          <motion.div {...reveal()} className="fit-heading"><SectionLabel>04 / THE RIGHT FIT</SectionLabel><h2>For people who care about<br/>the <em>message</em> as much<br/>as the reach.</h2></motion.div>
          <div className="fit-grid"><motion.div {...reveal(0.08)}><p className="fit-label">A GOOD FIT</p><ul><li>You have ideas, expertise, interviews, podcasts, or footage with substance.</li><li>You want a partner who can make editorial decisions—not just add effects.</li><li>You value clear feedback and a dependable rhythm.</li></ul></motion.div><motion.div {...reveal(0.14)}><p className="fit-label">PROBABLY NOT</p><ul><li>You need a promised view count or a “viral” guarantee.</li><li>You want every second overloaded with effects.</li><li>You want generic template edits with no message or direction.</li></ul></motion.div></div>
        </section>

        <section className="process section-pad">
          <motion.div {...reveal()} className="section-head"><div><SectionLabel>05 / HOW IT WORKS</SectionLabel><h2>Clear inputs.<br/>Thoughtful edits.<br/><em>No guessing games.</em></h2></div><p>A simple, transparent route from the raw idea to a video that is ready to meet its audience.</p></motion.div>
          <div className="process-list">{process.map(([number,title,body], index) => <motion.article {...reveal(index * 0.07)} key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></motion.article>)}</div>
        </section>

        <section id="contact" className="contact section-pad">
          <motion.div {...reveal()}><SectionLabel>06 / START HERE</SectionLabel><h2>Have an idea<br/>worth <em>watching?</em></h2></motion.div>
          <motion.div {...reveal(0.1)} className="contact-side"><p>Tell me what you’re building, what needs to change, and where the video will live. I’ll reply with the best next step.</p><a className="contact-email" href={`mailto:${EMAIL}?subject=Project%20enquiry%20for%20Addictive%20Edits`}>{EMAIL} <ArrowUpRight size={22}/></a><p className="contact-note">I read every enquiry personally.</p></motion.div>
        </section>
      </main>
      <footer><a className="wordmark" href="#top">ADDICTIVE<span>®</span></a><p>© {new Date().getFullYear()} Addictive Edits. Video editorial for ideas worth watching.</p><div><a href="https://www.instagram.com/edit_x_parmbeer" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/in/parmbeer-singh-672b62279" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>

      {activeProject && <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} details`}><button className="modal-backdrop" aria-label="Close project" onClick={() => setActiveProject(null)}/><article className="modal-card"><button className="modal-close" type="button" aria-label="Close project" onClick={() => setActiveProject(null)}><X /></button><VideoFrame reel={activeProject} /><div className="modal-copy"><SectionLabel>SELECTED WORK / {activeProject.niche.toUpperCase()}</SectionLabel><h2>{activeProject.title}</h2><p>{activeProject.description}</p><dl><div><dt>Client</dt><dd>{activeProject.client}</dd></div><div><dt>Format</dt><dd>{activeProject.tags.join(" / ")}</dd></div><div><dt>Role</dt><dd>Editing, visual rhythm, motion typography</dd></div></dl><a href="#contact" onClick={() => setActiveProject(null)} className="button button-dark">Start a similar project <ArrowUpRight size={17}/></a></div></article></div>}
    </div>
  );
}
