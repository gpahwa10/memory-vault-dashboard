"use client"

import { useState } from "react"
import { Film, Music, Clock, Sparkles, Play, Download } from "lucide-react"

const durationOptions = [
  { value: 30, label: "30 seconds" },
  { value: 60, label: "1 minute" },
  { value: 90, label: "1 min 30 sec" },
  { value: 120, label: "2 minutes" },
]

const musicOptions = [
  { id: "soft", label: "Soft piano" },
  { id: "upbeat", label: "Upbeat acoustic" },
  { id: "none", label: "No music" },
]

export function MakeReelScreen() {
  const [duration, setDuration] = useState(60)
  const [music, setMusic] = useState("soft")
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setDone(true)
    }, 2500)
  }

  if (done) {
    return (
      <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Make a Reel
          </h1>
          <p className="mt-1 text-muted-foreground">
            Create a short video from your memories
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative aspect-[9/16] w-full max-w-[200px] overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-vault-teal/20">
                <Play className="h-12 w-12 text-vault-teal" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Your reel is ready
              </h2>
              <p className="text-sm text-muted-foreground">
                We&apos;ve created a 1-minute reel from your baby book memories. You can preview it below or download to share.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark">
                  <Play className="h-4 w-4" />
                  Preview
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDone(false)}
            className="mt-6 text-sm font-medium text-vault-teal hover:underline"
          >
            Create another reel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Make a Reel
        </h1>
        <p className="mt-1 text-muted-foreground">
          Turn your memory book into a short, shareable video
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Reel settings
          </h2>
          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="h-4 w-4 text-vault-teal" />
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDuration(opt.value)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      duration === opt.value
                        ? "border-vault-teal bg-vault-teal/15 text-vault-teal"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Music className="h-4 w-4 text-vault-teal" />
                Background music
              </label>
              <div className="flex flex-wrap gap-2">
                {musicOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMusic(opt.id)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      music === opt.id
                        ? "border-vault-teal bg-vault-teal/15 text-vault-teal"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            Source book
          </h2>
          <div className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-lg border-2 border-vault-teal bg-vault-teal/10 p-4 text-left">
              <div className="h-14 w-20 rounded bg-muted" />
              <div>
                <p className="font-medium text-foreground">Our Baby Book</p>
                <p className="text-xs text-muted-foreground">24 photos · 6 chapters</p>
              </div>
            </button>
            <p className="text-xs text-muted-foreground">
              We&apos;ll pick the best moments from this book for your reel. You can reorder or exclude pages after generation.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-vault-gold/30 bg-vault-gold/5 p-4">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-vault-gold" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Pro tip</p>
            <p className="text-muted-foreground">
              Reels with 1–2 minutes and soft music tend to get the most engagement when shared with family.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-vault-teal py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-vault-teal-dark disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {generating ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Creating your reel…
          </>
        ) : (
          <>
            <Film className="h-5 w-5" />
            Generate reel
          </>
        )}
      </button>
    </div>
  )
}
