import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, Pause, Play, X } from "lucide-react";
import { reels, type Reel } from "./data/reels";

const EMAIL = "parmbeeredits@gmail.com";
const SHOWREEL = reels[0];

const capabilities = [
  ["01", "Narrative structure", "The edit finds the tension before it finds the transition."],
  ["02", "Retention systems", "Rhythm, visual resets and typography designed around attention."],
  ["03", "Sound-led finish", "A final layer of pace, texture and emphasis that makes a cut land."],
];

function Player({ reel, className = "", priority = false }: { reel: Reel; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(priority);

  const toggle = async () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      await ref.current.play();
      setIsPlaying(true);
    } else {
      ref.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`player ${className}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        autoPlay={priority}
        poster={reel.cloudPosterUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={reel.cloudVideoUrl} type="video/mp4" />
      </video>
      <button className="player-toggle" onClick={toggle} type="button" aria-label={isPlaying ? "Pause video" : "Play video"}>
        {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
      </button>
      <span className="player-time">{reel.duration}</span>
    </div>
  );
}

function Index({ value }: { value: string }) {
  return <span className="index">({value})</span>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Reel | null>(null);
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="vhs-site">
      <a href="#main" className="skip">Skip to content</a>
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Addictive Edits home">ADDICTIVE<br /><i>EDITS</i></a>
        <nav className="desktop-links" aria-label="Primary navigation">
          <a href="#reel">Reel</a><a href="#work">Selected cuts</a><a href="#method">Method</a>
        </nav>
        <a className="inquire" href="#contact">Start a cut <ArrowUpRight size={14} /></a>
        <button className="mobile-menu" type="button" onClick={() => setMenu(!menu)} aria-label="Open navigation" aria-expanded={menu}>
          {menu ? <X /> : <Menu />}
        </button>
        {menu && <nav className="drawer" aria-label="Mobile navigation">
          <a onClick={() => setMenu(false)} href="#reel">Reel</a>
          <a onClick={() => setMenu(false)} href="#work">Selected cuts</a>
          <a onClick={() => setMenu(false)} href="#method">Method</a>
          <a onClick={() => setMenu(false)} href="#contact">Start a cut</a>
        </nav>}
      </header>

      <main id="main">
        <section id="top" className="opening">
          <div className="opening-grid" aria-hidden="true" />
          <motion.p className="eyebrow opening-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span>Independent video editor</span><span>Based in India / Working worldwide</span>
          </motion.p>
          <motion.div className="hero-title" initial={{ opacity: 0, y: reducedMotion ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p className="eyebrow"><Index value="01" /> THE ATTENTION ECONOMY IS VISUAL.</p>
            <h1>MAKE<br /><em>THE NEXT</em><br />SECOND<br />MATTER.</h1>
          </motion.div>
          <motion.div className="hero-panel" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} transition={{ duration: 1.05, delay: 0.25, ease: [0.77, 0, 0.18, 1] }}>
            <img src={reels[1].cloudPosterUrl} alt="A still from an Addictive Edits talking head project" />
            <div className="panel-stamp">CUT / RHYTHM / RESPONSE</div>
          </motion.div>
          <div className="opening-bottom">
            <p>Video editing for founders, creators and brands who want to earn attention without pretending to be someone else.</p>
            <a href="#reel" className="circle-cta" aria-label="Watch the showreel"><ArrowDownRight size={24} /></a>
          </div>
        </section>

        <section id="reel" className="reel-section">
          <div className="ticker" aria-hidden="true"><span>MAKE IT LAND — MAKE IT LAND — MAKE IT LAND — MAKE IT LAND — </span></div>
          <div className="section-wrap reel-intro">
            <motion.div {...reveal}>
              <p className="eyebrow light"><Index value="02" /> THE SHOWREEL / 01:00</p>
              <h2>THE CUT<br />IS THE<br /><em>ARGUMENT.</em></h2>
            </motion.div>
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="reel-copy">This is a pace sample, not a montage of effects. Every frame exists to make the next idea more difficult to ignore.</motion.p>
          </div>
          <motion.div {...reveal} className="reel-stage">
            <Player reel={SHOWREEL} priority className="showreel-player" />
            <div className="reel-annotation"><span>SHOWREEL / 2026</span><span>EDIT · MOTION · SOUND</span><span>01:00</span></div>
          </motion.div>
          <p className="showreel-placeholder">Dedicated showreel placeholder: swap the source in <code>src/App.tsx</code> once your final showreel is ready. Selected projects remain separate below.</p>
        </section>

        <section id="work" className="work-section">
          <div className="section-wrap work-heading">
            <motion.div {...reveal}>
              <p className="eyebrow"><Index value="03" /> SELECTED CUTS / 2024—2026</p>
              <h2>WORK THAT<br />KNOWS WHAT<br />IT'S <em>TRYING<br />TO DO.</em></h2>
            </motion.div>
            <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>Not a collection of templates. Each cut starts with the audience, the platform, and the point that needs to survive the scroll.</motion.p>
          </div>

          <div className="work-list">
            {reels.slice(0, 6).map((reel, i) => (
              <motion.article {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="work-item" key={reel.id}>
                <button className="work-number" type="button" onClick={() => setSelected(reel)} aria-label={`View ${reel.title}`}><Index value={`0${i + 1}`} /></button>
                <button className="work-visual" type="button" onClick={() => setSelected(reel)}>
                  <img src={reel.cloudPosterUrl} alt={`Still from ${reel.title}`} />
                  <span>OPEN CUT <ArrowUpRight size={16} /></span>
                </button>
                <div className="work-info">
                  <p>{reel.niche} / {reel.duration}</p>
                  <h3>{reel.title}</h3>
                  <p className="work-desc">{reel.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="method" className="method-section">
          <div className="section-wrap method-heading">
            <motion.p {...reveal} className="eyebrow light"><Index value="04" /> THE EDITING SYSTEM</motion.p>
            <motion.h2 {...reveal}>GREAT EDITING<br />FEELS <em>INEVITABLE.</em></motion.h2>
          </div>
          <div className="capability-grid">
            {capabilities.map(([number, title, copy], i) => (
              <motion.article {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} key={number}>
                <div><Index value={number} /><span className="capability-dot" /></div>
                <h3>{title}</h3><p>{copy}</p>
              </motion.article>
            ))}
          </div>
          <div className="method-line section-wrap"><p>NO VIRALITY PROMISES.</p><p>NO EFFECTS FOR THEIR OWN SAKE.</p><p>JUST A BETTER REASON TO STAY.</p></div>
        </section>

        <section className="proof-section section-wrap">
          <motion.div {...reveal} className="proof-head"><p className="eyebrow"><Index value="05" /> THE WORKING RELATIONSHIP</p><h2>THE BEST PART<br />ISN'T THE<br /><em>DELIVERY.</em></h2></motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="proof-copy">
            <p>It is the moment someone understands what they want to say more clearly because the edit gave it shape.</p>
            <ul><li>Clear edit direction before the first cut</li><li>Honest feedback, not defensive revision loops</li><li>Files delivered for the way people actually watch</li></ul>
          </motion.div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid" aria-hidden="true" />
          <div className="section-wrap contact-inner">
            <motion.p {...reveal} className="eyebrow"><Index value="06" /> START A PROJECT</motion.p>
            <motion.h2 {...reveal}>LET'S MAKE<br />THE NEXT<br />SECOND <em>COUNT.</em></motion.h2>
            <motion.div {...reveal} className="contact-action"><p>Tell me what you are building, where it will live, and what has to happen after someone watches.</p><a href={`mailto:${EMAIL}?subject=Addictive%20Edits%20project%20enquiry`}>{EMAIL} <ArrowUpRight size={22} /></a></motion.div>
          </div>
        </section>
      </main>

      <footer><a href="#top" className="brand">ADDICTIVE<br /><i>EDITS</i></a><p>© {new Date().getFullYear()} / Built for the next second.</p><div><a href="https://www.instagram.com/edit_x_parmbeer" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/in/parmbeer-singh-672b62279" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>

      {selected && <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${selected.title} project details`}>
        <button className="modal-scrim" type="button" aria-label="Close project detail" onClick={() => setSelected(null)} />
        <article className="case-card"><button className="close-case" type="button" onClick={() => setSelected(null)} aria-label="Close project"><X /></button><Player reel={selected} priority /><div className="case-copy"><p className="eyebrow"><Index value="CUT" /> {selected.niche.toUpperCase()}</p><h2>{selected.title}</h2><p>{selected.description}</p><dl><div><dt>Project</dt><dd>{selected.client}</dd></div><div><dt>Format</dt><dd>{selected.tags.join(" / ")}</dd></div><div><dt>Role</dt><dd>Edit / rhythm / motion type</dd></div></dl><a href="#contact" onClick={() => setSelected(null)}>Start a similar cut <ArrowUpRight size={17} /></a></div></article>
      </div>}
    </div>
  );
}
