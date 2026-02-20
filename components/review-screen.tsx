"use client"

import { useState } from "react"
import { Star, MessageCircle, Share2, Heart } from "lucide-react"

export function ReviewScreen() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Leave a Review
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your feedback helps us improve Memory Vault
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vault-teal/20 text-vault-teal">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Thank you!
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your review has been submitted. We really appreciate you taking the time to share your experience.
          </p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i <= rating ? "fill-vault-gold text-vault-gold" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setRating(0); setFeedback(""); }}
            className="mt-6 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Submit another review
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-6 pb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Leave a Review
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your feedback helps us improve and helps other families discover Memory Vault
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
          How would you rate your experience?
        </h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
              aria-label={`${i} star${i > 1 ? "s" : ""}`}
            >
              <Star
                className={`h-10 w-10 transition-colors ${
                  i <= (hoverRating || rating)
                    ? "fill-vault-gold text-vault-gold"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {rating === 0 && "Tap a star to rate"}
          {rating === 1 && "We're sorry things weren't great. We'd love to hear how we can improve."}
          {rating === 2 && "Thanks for the feedback. We're working to do better."}
          {rating === 3 && "We're glad you're somewhat satisfied. Tell us what would make it better."}
          {rating === 4 && "We're glad you're having a good experience!"}
          {rating === 5 && "We're so happy you love Memory Vault. Thank you!"}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
          Tell us more (optional)
        </h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What do you love? What could we improve?"
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-lg bg-vault-teal px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark"
        >
          <MessageCircle className="h-4 w-4" />
          Submit review
        </button>
        <p className="text-xs text-muted-foreground">
          You may also be asked to share your review on the App Store or Google Play.
        </p>
      </div>

      <div className="rounded-xl border border-vault-gold/30 bg-vault-gold/5 p-4">
        <div className="flex gap-3">
          <Share2 className="h-5 w-5 shrink-0 text-vault-gold" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Share Memory Vault</p>
            <p className="text-muted-foreground">
              Know another family who would love to preserve their memories? Invite them to try Memory Vault.
            </p>
            <button className="mt-2 text-sm font-medium text-vault-teal hover:underline">
              Get share link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
