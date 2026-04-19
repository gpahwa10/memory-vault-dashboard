"use client";

import { useState, useEffect, useCallback, type CSSProperties, type FC } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────

const pageBase: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
};

const photoBox = (h: string | number, bg = "#c8c0b0"): CSSProperties => ({
  width: "100%",
  height: h,
  background: bg,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  color: "#888",
  marginBottom: 12,
  flexShrink: 0,
});

const twoColBox: CSSProperties = {
  display: "flex",
  gap: 10,
  marginBottom: 12,
  flexShrink: 0,
};

const halfBox = (bg = "#c8c0b0"): CSSProperties => ({
  flex: 1,
  height: 130,
  background: bg,
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11,
  color: "#888",
});

const sectionTitle: CSSProperties = {
  fontSize: 16,
  color: "#2d5a3d",
  fontStyle: "italic",
  marginBottom: 8,
  fontFamily: "Georgia, serif",
  flexShrink: 0,
};

const bodyText: CSSProperties = {
  fontSize: 11.5,
  color: "#666",
  lineHeight: 1.7,
  fontFamily: "Arial, sans-serif",
  flexShrink: 0,
};

const pageNum = (side: "left" | "right", n: number | string): CSSProperties => ({
  position: "absolute",
  bottom: 10,
  [side]: 16,
  fontSize: 11,
  color: "#bbb",
  fontFamily: "Arial, sans-serif",
  letterSpacing: 1,
});

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 0 — COVER
// ─────────────────────────────────────────────────────────────────────────────

const CoverBlank: FC = () => (
  <div style={{ ...pageBase, background: "#f5f0e8" }} />
);

const CoverRight: FC = () => (
  <div
    style={{
      ...pageBase,
      background: "linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 50%, #1a3a2a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px",
      textAlign: "center",
    }}
  >
    <div
      style={{
        width: 90,
        height: 90,
        border: "3px solid #d4af6a",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 28, color: "#d4af6a" }}>♥</span>
    </div>
    <div
      style={{
        fontSize: 26,
        color: "#f5ede0",
        letterSpacing: 3,
        fontWeight: 400,
        marginBottom: 8,
        fontFamily: "Georgia, serif",
        flexShrink: 0,
      }}
    >
      Forever & Always
    </div>
    <div
      style={{ width: 60, height: 1, background: "#d4af6a", margin: "0 auto 16px", flexShrink: 0 }}
    />
    <div
      style={{
        fontSize: 13,
        color: "#a8c89a",
        letterSpacing: 4,
        textTransform: "uppercase",
        marginBottom: 20,
        fontFamily: "Georgia, serif",
        flexShrink: 0,
      }}
    >
      Wedding Album
    </div>
    <div
      style={{
        fontSize: 13,
        color: "#c8b99a",
        letterSpacing: 2,
        fontFamily: "Georgia, serif",
        flexShrink: 0,
      }}
    >
      June 14, 2024
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 1 — Our Story (left) | Opening spread (right)
// ─────────────────────────────────────────────────────────────────────────────

const S1Left: FC = () => (
  <div
    style={{
      ...pageBase,
      background: "#f9f4ec",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 36, color: "#d4af6a", marginBottom: 12 }}>♥</div>
    <div style={{ fontSize: 20, color: "#2d5a3d", fontStyle: "italic", marginBottom: 8, fontFamily: "Georgia, serif" }}>
      Our Story
    </div>
    <div style={{ width: 50, height: 1, background: "#d4af6a", margin: "0 auto 12px" }} />
    <div style={{ fontSize: 12, color: "#888", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      A love story written in the stars, bound in the pages of forever.
    </div>
  </div>
);

const S1Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={bodyText}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry standard dummy text since the 1500s.
    </div>
    <div style={twoColBox}>
      <div style={halfBox("#c8c0b0")}>📸 Sweet Love</div>
      <div style={halfBox("#b0a898")}>📸 Mirror</div>
    </div>
    <div style={sectionTitle}>Lorem Ipsum</div>
    <div style={{ ...bodyText, marginBottom: 8 }}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
    <div style={{ fontSize: 11.5, color: "#666", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
    </div>
    <span style={pageNum("right", 2)}>2</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 2 — Ceremony (left) | Vows (right)
// ─────────────────────────────────────────────────────────────────────────────

const S2Left: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", display: "flex", flexDirection: "column" }}>
    <div style={{ width: "100%", height: "60%", background: "#c8c0b0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888" }}>
      📸 Ceremony Photo
    </div>
    <div style={{ padding: "16px 18px" }}>
      <div style={sectionTitle}>The Ceremony</div>
      <div style={bodyText}>
        A beautiful morning filled with tears of joy, vows spoken from the heart, and a love that will
        last a lifetime.
      </div>
    </div>
    <span style={pageNum("left", 3)}>3</span>
  </div>
);

const S2Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={{ ...bodyText, marginBottom: 12 }}>
      With hearts full of joy and eyes full of wonder, they said "I do" and began a new chapter.
    </div>
    <div style={{ ...photoBox("45%"), marginBottom: 12 }}>📸 Vows Photo</div>
    <div style={sectionTitle}>The Vows</div>
    <div style={bodyText}>Every word spoken from the heart, every promise sealed with a kiss.</div>
    <span style={pageNum("right", 4)}>4</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 3 — Chapter Two divider (left) | Flowers & Décor (right)
// ─────────────────────────────────────────────────────────────────────────────

const S3Left: FC = () => (
  <div
    style={{
      ...pageBase,
      background: "#1a3a2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 15, color: "#a8c89a", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia, serif" }}>
      Chapter Two
    </div>
    <div style={{ fontSize: 26, color: "#f5ede0", fontStyle: "italic", marginBottom: 10, fontFamily: "Georgia, serif" }}>
      The Reception
    </div>
    <div style={{ width: 40, height: 1, background: "#d4af6a", margin: "0 auto" }} />
  </div>
);

const S3Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={twoColBox}>
      <div style={{ ...halfBox("#c8c0b0"), height: 130 }}>📸 Flowers</div>
      <div style={{ ...halfBox("#b8b0a0"), height: 130 }}>📸 Decor</div>
    </div>
    <div style={sectionTitle}>Flowers & Décor</div>
    <div style={bodyText}>
      Every bloom hand-picked, every detail curated to create a setting as beautiful as their love.
    </div>
    <span style={pageNum("right", 6)}>6</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 4 — First Dance (left) | The Feast (right)
// ─────────────────────────────────────────────────────────────────────────────

const S4Left: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", display: "flex", flexDirection: "column" }}>
    <div style={{ width: "100%", height: "55%", background: "#b8b0a0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888" }}>
      📸 Dance Floor
    </div>
    <div style={{ padding: "14px 18px" }}>
      <div style={sectionTitle}>First Dance</div>
      <div style={bodyText}>
        Under a canopy of stars, they moved as one — lost in the music, lost in each other.
      </div>
    </div>
    <span style={pageNum("left", 7)}>7</span>
  </div>
);

const S4Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={{ ...photoBox("50%"), background: "#c8c0b0" }}>📸 Reception Hall</div>
    <div style={sectionTitle}>The Feast</div>
    <div style={bodyText}>
      Tables adorned with candlelight, laughter echoing through the hall, glasses raised in a toast to
      the happy couple.
    </div>
    <span style={pageNum("right", 8)}>8</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 5 — Sweet Moments (left) | Little Details (right)
// ─────────────────────────────────────────────────────────────────────────────

const S5Left: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", display: "flex", flexDirection: "column" }}>
    <div style={{ width: "100%", height: "50%", background: "#c0b8a8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888" }}>
      📸 Cake Cutting
    </div>
    <div style={{ padding: "14px 18px" }}>
      <div style={sectionTitle}>Sweet Moments</div>
      <div style={bodyText}>
        The cake, the smiles, the laughter — every sweet detail crafted with love and shared with the
        people they cherish most.
      </div>
    </div>
    <span style={pageNum("left", 9)}>9</span>
  </div>
);

const S5Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={twoColBox}>
      <div style={{ ...halfBox("#c0b8a8"), height: 120 }}>📸 Details</div>
      <div style={{ ...halfBox("#b0a898"), height: 120 }}>📸 Rings</div>
    </div>
    <div style={sectionTitle}>Little Details</div>
    <div style={bodyText}>
      The rings, the ribbons, the little things that made the day truly unforgettable.
    </div>
    <span style={pageNum("right", 10)}>10</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 6 — Chapter Three divider (left) | All Together (right)
// ─────────────────────────────────────────────────────────────────────────────

const S6Left: FC = () => (
  <div
    style={{
      ...pageBase,
      background: "#2d5a3d",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 15, color: "#a8c89a", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia, serif" }}>
      Chapter Three
    </div>
    <div style={{ fontSize: 24, color: "#f5ede0", fontStyle: "italic", marginBottom: 10, fontFamily: "Georgia, serif" }}>
      Family & Friends
    </div>
    <div style={{ width: 40, height: 1, background: "#d4af6a", margin: "0 auto" }} />
  </div>
);

const S6Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={{ ...photoBox("48%"), background: "#c8c0b0" }}>📸 Group Photo</div>
    <div style={{ fontSize: 15, color: "#2d5a3d", fontStyle: "italic", marginBottom: 8, fontFamily: "Georgia, serif" }}>
      All Together
    </div>
    <div style={bodyText}>
      Family and friends gathered around, sharing in the joy and warmth of a perfect celebration.
    </div>
    <span style={pageNum("right", 12)}>12</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 7 — Bridal Party (left) | Golden Hour (right)
// ─────────────────────────────────────────────────────────────────────────────

const S7Left: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", gap: 8, padding: "14px 14px 8px", height: "55%" }}>
      <div style={{ flex: 1, background: "#c8c0b0", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>📸</div>
      <div style={{ flex: 1, background: "#b8b0a0", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>📸</div>
    </div>
    <div style={{ padding: "6px 18px 14px" }}>
      <div style={{ fontSize: 14, color: "#2d5a3d", fontStyle: "italic", marginBottom: 6, fontFamily: "Georgia, serif" }}>The Bridal Party</div>
      <div style={{ fontSize: 11, color: "#666", fontFamily: "Arial, sans-serif", lineHeight: 1.65 }}>
        Side by side, step by step — these friends made the day complete.
      </div>
    </div>
    <span style={pageNum("left", 13)}>13</span>
  </div>
);

const S7Right: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
    <div style={{ ...photoBox("50%"), background: "#b8b0a0" }}>📸 Sunset</div>
    <div style={{ fontSize: 15, color: "#2d5a3d", fontStyle: "italic", marginBottom: 8, fontFamily: "Georgia, serif" }}>
      Golden Hour
    </div>
    <div style={bodyText}>
      As the golden hour painted the sky, the couple slipped away for a few private moments — just the
      two of them.
    </div>
    <span style={pageNum("right", 14)}>14</span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD 8 — Family Portrait (left) | The End & Beginning (right)
// ─────────────────────────────────────────────────────────────────────────────

const S8Left: FC = () => (
  <div style={{ ...pageBase, background: "#f9f4ec", display: "flex", flexDirection: "column" }}>
    <div style={{ width: "100%", height: "58%", background: "#d0c8b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888" }}>
      📸 Family Portrait
    </div>
    <div style={{ padding: "14px 18px" }}>
      <div style={sectionTitle}>Two Families, One Love</div>
      <div style={bodyText}>
        Two families came together on this day, bound by love and the promise of a shared future.
      </div>
    </div>
    <span style={pageNum("left", 15)}>15</span>
  </div>
);

const S8Right: FC = () => (
  <div
    style={{
      ...pageBase,
      background: "#1a3a2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 28,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 28, color: "#d4af6a", marginBottom: 14 }}>♥</div>
    <div style={{ fontSize: 22, color: "#f5ede0", fontStyle: "italic", marginBottom: 10, fontFamily: "Georgia, serif" }}>
      The End & The Beginning
    </div>
    <div style={{ width: 50, height: 1, background: "#d4af6a", margin: "0 auto 14px" }} />
    <div style={{ fontSize: 12, color: "#a8c89a", fontFamily: "Arial, sans-serif", lineHeight: 1.8 }}>
      Every ending is a new beginning.
      <br />
      Here's to forever.
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD MAP
// ─────────────────────────────────────────────────────────────────────────────

interface SpreadDef {
  left: FC;
  right: FC;
}

const SPREADS: SpreadDef[] = [
  { left: CoverBlank, right: CoverRight },   // 0 — Cover
  { left: S1Left, right: S1Right },          // 1 — Our Story
  { left: S2Left, right: S2Right },          // 2 — Ceremony / Vows
  { left: S3Left, right: S3Right },          // 3 — Chapter 2 / Flowers
  { left: S4Left, right: S4Right },          // 4 — First Dance / Feast
  { left: S5Left, right: S5Right },          // 5 — Sweet Moments / Details
  { left: S6Left, right: S6Right },          // 6 — Chapter 3 / All Together
  { left: S7Left, right: S7Right },          // 7 — Bridal Party / Golden Hour
  { left: S8Left, right: S8Right },          // 8 — Portrait / The End
];

const TOTAL_SPREADS = SPREADS.length; // 9

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION STATE
// ─────────────────────────────────────────────────────────────────────────────

interface AnimState {
  dir: "forward" | "backward";
  from: number;
  to: number;
  phase: "enter" | "go";
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AlbumFlipbook() {
  const [spread, setSpread] = useState(0);
  const [anim, setAnim] = useState<AnimState | null>(null);

  // ── Turn page ──────────────────────────────────────────────────────────────
  const turn = useCallback(
    (dir: 1 | -1) => {
      if (anim) return;
      const to = spread + dir;
      if (to < 0 || to >= TOTAL_SPREADS) return;
      setAnim({ dir: dir === 1 ? "forward" : "backward", from: spread, to, phase: "enter" });
    },
    [anim, spread]
  );

  // ── Animation lifecycle ────────────────────────────────────────────────────
  useEffect(() => {
    if (!anim) return;

    if (anim.phase === "enter") {
      // Two rAF passes to ensure the browser paints the flip layer at rotateY(0)
      // before we start the CSS transition.
      let id: number;
      id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => {
          setAnim((a) => (a ? { ...a, phase: "go" } : null));
        });
      });
      return () => cancelAnimationFrame(id);
    }

    if (anim.phase === "go") {
      const t = setTimeout(() => {
        setSpread(anim.to);
        setAnim(null);
      }, 820);
      return () => clearTimeout(t);
    }
  }, [anim]);

  // ── Current static pages ───────────────────────────────────────────────────
  const LeftPage = SPREADS[spread].left;
  const RightPage = SPREADS[spread].right;

  // ── Flip layer faces ───────────────────────────────────────────────────────
  // Forward flip  : front = current RIGHT,   back = next LEFT
  // Backward flip : front = current LEFT,    back = prev RIGHT
  let FlipFront: FC | null = null;
  let FlipBack: FC | null = null;

  if (anim) {
    const from = SPREADS[anim.from];
    const to = SPREADS[anim.to];
    if (anim.dir === "forward") {
      FlipFront = from.right;
      FlipBack = to.left;
    } else {
      FlipFront = from.left;
      FlipBack = to.right;
    }
  }

  // ── Flip layer position & rotation ────────────────────────────────────────
  // Forward  : layer sits on the RIGHT half, hinged at LEFT edge,
  //            rotates 0 → -180deg (sweeps left → left side of book)
  // Backward : layer sits on the LEFT half, hinged at RIGHT edge,
  //            rotates 0 → +180deg (sweeps right → right side of book)

  const flipLayerStyle: CSSProperties = anim
    ? {
        position: "absolute",
        top: 0,
        left: anim.dir === "forward" ? "50%" : 0,
        width: "50%",
        height: "100%",
        transformOrigin: anim.dir === "forward" ? "left center" : "right center",
        transformStyle: "preserve-3d",
        transform:
          anim.phase === "go"
            ? anim.dir === "forward"
              ? "rotateY(-180deg)"
              : "rotateY(180deg)"
            : "rotateY(0deg)",
        transition:
          anim.phase === "go"
            ? "transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1.0)"
            : "none",
        zIndex: 10,
        pointerEvents: "none",
      }
    : {};

  // ── Page label ─────────────────────────────────────────────────────────────
  const pageLabel =
    spread === 0
      ? "Cover"
      : spread === TOTAL_SPREADS - 1
      ? "Last Page"
      : `Pages ${spread * 2 - 1}–${spread * 2} of ${(TOTAL_SPREADS - 1) * 2}`;

  return (
    <div
      style={{
        width: "100%",
        minHeight: 0,
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        borderRadius: 0,
        fontFamily: "Georgia, serif",
        userSelect: "none",
      }}
    >
      {/* ── Book scene (perspective wrapper) ─────────────────────────────── */}
      <div
        style={{
          perspective: "2000px",
          perspectiveOrigin: "center center",
          width: "100%",
          maxWidth: 840,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ── Book ─────────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 840,
            height: 440,
            display: "flex",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Static left page ─────────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              width: "50%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "8px 0 0 8px",
              borderRight: "2px solid #c8b99a",
              boxShadow:
                "-6px 0 20px rgba(0,0,0,0.35), inset -4px 0 12px rgba(0,0,0,0.12)",
            }}
          >
            <LeftPage />
          </div>

          {/* ── Static right page ────────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              width: "50%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "0 8px 8px 0",
              boxShadow:
                "6px 0 20px rgba(0,0,0,0.35), inset 4px 0 12px rgba(0,0,0,0.1)",
            }}
          >
            <RightPage />
          </div>

          {/* ── Flip layer ───────────────────────────────────────────────── */}
          {anim && FlipFront && FlipBack && (
            <div style={flipLayerStyle}>
              {/* Front face — the page being lifted */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  overflow: "hidden",
                  borderRadius:
                    anim.dir === "forward" ? "0 8px 8px 0" : "8px 0 0 8px",
                  boxShadow:
                    anim.dir === "forward"
                      ? "4px 0 24px rgba(0,0,0,0.3), inset -4px 0 12px rgba(0,0,0,0.08)"
                      : "-4px 0 24px rgba(0,0,0,0.3), inset 4px 0 12px rgba(0,0,0,0.08)",
                }}
              >
                <FlipFront />
              </div>

              {/* Back face — revealed as page flips over */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  overflow: "hidden",
                  borderRadius:
                    anim.dir === "forward" ? "8px 0 0 8px" : "0 8px 8px 0",
                  boxShadow:
                    anim.dir === "forward"
                      ? "-4px 0 24px rgba(0,0,0,0.25), inset 4px 0 12px rgba(0,0,0,0.08)"
                      : "4px 0 24px rgba(0,0,0,0.25), inset -4px 0 12px rgba(0,0,0,0.08)",
                }}
              >
                <FlipBack />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Controls ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <CtrlButton
          label="←"
          disabled={spread === 0 || !!anim}
          onClick={() => turn(-1)}
        />

        <span
          style={{
            color: "white",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            letterSpacing: 1,
            minWidth: 120,
            textAlign: "center",
          }}
        >
          {pageLabel}
        </span>

        <CtrlButton
          label="→"
          disabled={spread === TOTAL_SPREADS - 1 || !!anim}
          onClick={() => turn(1)}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROL BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function CtrlButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "white",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        boxShadow: hovered && !disabled
          ? "0 4px 14px rgba(0,0,0,0.28)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        opacity: disabled ? 0.35 : 1,
        transform: hovered && !disabled ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
      }}
    >
      {label}
    </button>
  );
}
