import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  PlayCircle,
  Sparkles,
  Youtube,
} from "lucide-react";

const steps = [
  {
    id: "paste",
    label: "Paste playlist",
    description: "Drop a DSA YouTube playlist URL into the import box.",
  },
  {
    id: "extract",
    label: "Extract problems",
    description: "Algo Note maps videos to LeetCode problems and topic flow.",
  },
  {
    id: "practice",
    label: "Practice faster",
    description: "Open the generated sheet and move it into your workspace.",
  },
];

const featurePoints = [
  "Extract playlist problems into one clean sheet",
  "Keep the original playlist context and links",
  "Push the generated sheet into your workspace later",
];

const PlaylistHeroSection = ({
  isGenerating,
  playlistUrl,
  onSubmit,
  onUrlChange,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0c10] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_24%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div className="relative z-10 px-6 py-8 lg:px-8 lg:py-9">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-500/20 bg-[#14171d] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70"
          >
            <PlayCircle size={13} />
            Hero Feature
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-[3.35rem]"
          >
            You bring the playlist.
            <br />
            Algo Note gives you the problem sheet.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.92 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="mt-5 h-px w-32 bg-gradient-to-r from-white/75 via-slate-300/45 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 max-w-3xl text-base leading-7 text-zinc-400"
          >
            Drop in one DSA playlist URL and generate a structured sheet of
            practice problems you can review, expand, and later move into your
            main workspace.
          </motion.p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 + index * 0.05 }}
                className="rounded-2xl border border-slate-500/14 bg-[#13161d] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  0{index + 1}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {step.label}
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-400">
                  {step.description}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            onSubmit={onSubmit}
            className="mt-7 rounded-[24px] border border-slate-500/18 bg-[#11141b] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                <Youtube size={14} className="text-white/70" />
                Playlist Import
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/12 to-transparent sm:block" />
            </div>

            <div className="mt-3 flex flex-col gap-3 lg:flex-row">
              <input
                type="url"
                value={playlistUrl}
                onChange={(event) => onUrlChange(event.target.value)}
                placeholder="https://www.youtube.com/playlist?list=PLxxxxxx"
                disabled={isGenerating}
                required
                className="h-14 flex-1 rounded-2xl border border-slate-400/18 bg-[#181c25] px-4 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition placeholder:text-slate-500 focus:border-white/28 focus:bg-[#1d2330] focus:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              />

              <button
                type="submit"
                disabled={isGenerating || !playlistUrl.trim()}
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-[#f4f4f5] px-5 text-sm font-semibold text-black shadow-[0_14px_30px_rgba(255,255,255,0.08)] transition hover:bg-white disabled:cursor-not-allowed disabled:border-white/8 disabled:bg-white/35 disabled:text-black/60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating Sheet
                  </>
                ) : (
                  <>
                    Generate Sheet
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 border-t border-white/8 pt-3 text-sm text-slate-400">
              Best for structured DSA playlists where each video maps to a
              problem or concept.
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 }}
            className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="rounded-[24px] border border-slate-500/16 bg-[#141821] p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                <Sparkles size={13} className="text-white/70" />
                What You Get
              </div>
              <div className="mt-3 h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
              <div className="mt-4 space-y-3">
                {featurePoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-slate-500/14 bg-[#1a1f2a] px-4 py-3"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <div className="text-sm leading-6 text-zinc-300">{point}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-500/16 bg-[#101319] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Output
              </div>
              <div className="mt-3 h-px w-24 bg-gradient-to-r from-white/40 to-transparent" />
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Playlist in</span>
                    <span className="font-semibold text-white">1 URL</span>
                  </div>
                  <div className="mt-3 h-px bg-gradient-to-r from-white/12 to-transparent" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Problems out</span>
                    <span className="font-semibold text-white">Structured sheet</span>
                  </div>
                  <div className="mt-3 h-px bg-gradient-to-r from-white/12 to-transparent" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Use after import</span>
                    <span className="font-semibold text-white">Review or add to workspace</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaylistHeroSection;
