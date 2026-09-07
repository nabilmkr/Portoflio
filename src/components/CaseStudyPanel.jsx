/* SPEC-12/13 — Case Study Panel
/* Renders 10 sections per SPEC-12 §7 Information Hierarchy
/* SPEC-12 §29 — Component mapping: Hero, Overview, Problem, Challenges, DecisionCards, ArchitectureFlow, ImplementationSection, GallerySection, ReflectionSection, FutureWorkSection
/* SPEC-13 §7 — Content hierarchy order */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Calendar, Users, Clock, Database, Layers } from "lucide-react";
import { motionConfig, fadeInUp } from "../styles/motion";
import caseStudies from "../data/projectCaseStudies";

/* ------------------------------------------------------------------ */
/* Main Panel                                                          */
/* ------------------------------------------------------------------ */

export default function CaseStudyPanel({ projectId, open, onClose }) {
  const shouldReduceMotion = useReducedMotion();
  const caseStudy = projectId ? caseStudies[projectId] : null;

  return (
    <AnimatePresence>
      {open && caseStudy && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-y-auto bg-bg-primary/90 px-4 py-8 md:px-10 md:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            className="mx-auto min-h-[80vh] max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-bg-primary shadow-[0_30px_150px_rgba(0,0,0,0.65)]"
            initial={shouldReduceMotion ? { opacity: 1 } : { y: 40, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: motionConfig.duration.normal, ease: motionConfig.ease.entrance }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* ── Header ────────────────────────────────────────────── */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg-primary/95 backdrop-blur-sm border-border px-6 py-5 md:px-8 md:py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary">
                  Project Case Study
                </p>
                <h2 id="case-study-title" className="mt-2 text-2xl font-bold text-text-heading md:text-3xl lg:text-4xl">
                  {caseStudy.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-text-body md:text-base">
                  {caseStudy.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg-surface text-text-body transition hover:border-accent-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                aria-label="Close case study"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Content (spec order: §7 Information Hierarchy) ─────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              className="space-y-12 p-6 md:p-8 lg:p-10"
            >
              {/* 1. Hero (spec: project summary) — already shown in header */}

              {/* 2. Overview — metadata cards per SPEC-12 §13 */}
              <OverviewSection overview={caseStudy.overview} />

              {/* 3. Problem — SPEC-12 §14 */}
              <SectionGroup title="Problem" content={caseStudy.problem} />

              {/* 4. Challenges — SPEC-12 §15 */}
              <ChallengesSection challenges={caseStudy.challenges} />

              {/* 5. Engineering Decisions — SPEC-12 §16 */}
              <DecisionCards decisions={caseStudy.decisions || caseStudy.implementation} />

              {/* 6. Architecture — SPEC-12 §17 */}
              <ArchitectureSection content={caseStudy.architecture} />

              {/* 7. Implementation — SPEC-12 §18 */}
              <ImplementationSection implementation={caseStudy.implementation} />

              {/* 8. Gallery — SPEC-12 §19 */}
              <GallerySection artifacts={caseStudy.artifacts} projectId={projectId} />

              {/* 9. Reflection — SPEC-12 §20 */}
              <SectionGroup title="Reflection" content={caseStudy.reflection} />

              {/* 10. Future Improvements — SPEC-12 §21 */}
              <FutureWorkSection items={caseStudy.futureImprovements} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Overview Section — SPEC-12 §13                                  */
/* 5 metadata cards max: Role, Duration, Team Size, Status, Database    */
/* ------------------------------------------------------------------ */

function OverviewSection({ overview }) {
  if (!overview) return null;

  const cards = [
    { label: "Role", value: overview.role, icon: Layers },
    { label: "Duration", value: overview.duration, icon: Clock },
    { label: "Team Size", value: overview.teamSize ? `${overview.teamSize} members` : "—", icon: Users },
    { label: "Status", value: overview.status, icon: Calendar },
    { label: "Database", value: overview.database, icon: Database },
  ];

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Overview</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-bg-surface p-4 text-center"
          >
            <Icon size={16} strokeWidth={1.5} className="mx-auto mb-2 text-accent-primary" aria-hidden="true" />
            <p className="text-xs text-text-body uppercase tracking-wider">{label}</p>
            <p className="mt-1 text-sm font-medium text-text-heading">{value}</p>
          </div>
        ))}
      </div>
      {/* Primary Technologies */}
      <div className="rounded-2xl border border-border bg-bg-surface p-4">
        <p className="text-xs text-text-body uppercase tracking-wider mb-3">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {(overview.technologies || []).map((tech) => (
            <span
              key={tech}
              className="inline-block px-3 py-1 text-xs font-medium text-accent-primary bg-bg-primary border border-border rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 & 9. Generic SectionGroup (Problem, Reflection)                  */
/* SPEC-12 §14 Problem, §20 Reflection                                 */
/* ------------------------------------------------------------------ */

function SectionGroup({ title, content }) {
  if (!content) return null;
  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">{title}</h3>
      <p className="text-text-body leading-relaxed">{content}</p>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Architecture Section — Structured System Architecture Cards     */
/* Organizes dataflow pipeline into layered system stages             */
/* ------------------------------------------------------------------ */

function ArchitectureSection({ content }) {
  if (!content) return null;

  const rawSteps = typeof content === "string" && content.includes(" → ")
    ? content.split(" → ")
    : null;

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">System Architecture</h3>

      {rawSteps ? (
        <div className="rounded-2xl border border-border bg-bg-surface p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rawSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-xl border border-border bg-bg-primary/80 p-4 transition-all duration-300 hover:border-accent-primary/30 flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-primary">
                    Stage 0{idx + 1}
                  </span>
                  {idx < rawSteps.length - 1 && (
                    <span className="text-text-body/30 text-xs font-mono group-hover:text-accent-primary transition-colors">
                      ↓ next
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-text-heading leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-text-body leading-relaxed">{content}</p>
      )}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Challenges — SPEC-12 §15                                        */
/* Format: Challenge → Why difficult → Solution → Outcome              */
/* Max 4 cards                                                         */
/* ------------------------------------------------------------------ */

function ChallengesSection({ challenges }) {
  if (!challenges || challenges.length === 0) return null;

  const visible = challenges.slice(0, 4);

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Challenges</h3>
      <div className="space-y-4">
        {visible.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-bg-surface p-5 space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-xs font-bold text-accent-primary">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-text-heading">{item.challenge}</p>
            </div>
            {item.why && (
              <p className="pl-8 text-xs text-text-body">
                <span className="font-medium text-accent-primary">Why: </span>
                {item.why}
              </p>
            )}
            {(item.response || item.outcome) && (
              <div className="pl-8 border-l-2 border-border space-y-2">
                {item.response && (
                  <p className="text-xs text-text-body">
                    <span className="font-medium text-text-heading">Response: </span>
                    {item.response}
                  </p>
                )}
                {item.outcome && (
                  <p className="text-xs text-text-body">
                    <span className="font-medium text-text-heading">Outcome: </span>
                    {item.outcome}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Engineering Decisions — SPEC-12 §16                              */
/* Format: Technology → Reason → Trade-off → Contribution             */
/* Max 6 cards                                                         */
/* ------------------------------------------------------------------ */

function DecisionCards({ decisions }) {
  if (!decisions || decisions.length === 0) return null;

  const items = decisions.slice(0, 6);

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Engineering Decisions</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-bg-surface p-5 space-y-2"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
              {item.area || (Array.isArray(item.technology) ? item.technology.join(", ") : item.technology)}
            </p>
            <div className="space-y-1">
              {item.area && item.technology && (
                <p className="text-sm font-medium text-text-heading">
                  {Array.isArray(item.technology) ? item.technology.join(", ") : item.technology}
                </p>
              )}
              {item.reason && (
                <p className="text-sm font-medium text-text-heading">
                  {item.reason}
                </p>
              )}
              {(item.responsibility || item.contribution) && (
                <p className="text-sm text-text-body leading-relaxed">
                  {item.responsibility || item.contribution}
                </p>
              )}
              {item.tradeoff && (
                <p className="text-xs text-text-body/70 italic">
                  Tradeoff: {item.tradeoff}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Implementation — SPEC-12 §18                                     */
/* Accordion per area: What → How → Why                                */
/* ------------------------------------------------------------------ */

function ImplementationSection({ implementation }) {
  if (!implementation || implementation.length === 0) return null;

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Implementation</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {implementation.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-bg-surface p-5 space-y-2"
          >
            <p className="text-sm font-semibold text-text-heading">{item.area}</p>
            {item.technology && (
              <p className="text-xs text-accent-primary font-medium">
                {Array.isArray(item.technology) ? item.technology.join(", ") : item.technology}
              </p>
            )}
            {item.responsibility && (
              <p className="text-sm text-text-body leading-relaxed">{item.responsibility}</p>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Gallery / Artifacts — SPEC-12 §19                              */
/* Renders image/diagram grid if available, clean fallback if empty   */
/* ------------------------------------------------------------------ */

function GallerySection({ artifacts, projectId }) {
  if (!artifacts || artifacts.length === 0) {
    return (
      <motion.section variants={fadeInUp} className="space-y-4">
        <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Project Artifacts</h3>
        <div className="rounded-2xl border border-border bg-bg-surface p-6 text-center">
          <p className="text-sm text-text-body mb-2">
            Technical architecture & system deliverables for <span className="text-accent-primary font-medium">{projectId}</span>.
          </p>
          <p className="text-xs text-text-body/60">
            Detailed flowcharts, API endpoints, and database schemas available upon request.
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Project Artifacts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artifacts.map((art, index) => (
          <div key={index} className="rounded-2xl border border-border bg-bg-surface overflow-hidden group transition-all duration-300 hover:border-accent-primary/40">
            {art.image && (
              <div className="relative aspect-video bg-bg-primary overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4 space-y-1">
              <h4 className="text-sm font-semibold text-text-heading">{art.title}</h4>
              {art.description && <p className="text-xs text-text-body leading-relaxed">{art.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Future Work — SPEC-12 §21                                       */
/* Max 4 items                                                         */
/* ------------------------------------------------------------------ */

function FutureWorkSection({ items }) {
  if (!items || items.length === 0) return null;

  const visible = items.slice(0, 4);

  return (
    <motion.section variants={fadeInUp} className="space-y-4">
      <h3 className="text-xl font-semibold text-text-heading md:text-2xl">Future Improvements</h3>
      <ul className="space-y-2 rounded-2xl border border-border bg-bg-surface p-5">
        {visible.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-text-body">
            <span className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true">→</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}