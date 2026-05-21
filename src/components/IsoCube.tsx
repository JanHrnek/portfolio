/**
 * Isometric wireframe cube — technical drawing placeholder.
 * ViewBox 200×200. Cube centered at (100,100), side ≈60px.
 *
 * Vertex layout (isometric projection, s=60, hs=52, vs=30):
 *   A(100,40)  — top apex
 *   B(152,70)  — top-right
 *   C(100,100) — near vertex (front-center, shared projection of far vertex)
 *   D(48,70)   — top-left
 *   E(152,130) — right
 *   F(100,160) — bottom apex
 *   G(48,130)  — left
 *
 * 9 visible edges (solid) + 3 hidden edges (dashed).
 */
export default function IsoCube() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <g fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
        {/* Hidden edges — dashed, faint */}
        <g strokeWidth="0.8" strokeDasharray="4 3.5" opacity="0.22">
          <line x1="100" y1="100" x2="100" y2="40" />  {/* C→A (back vertical) */}
          <line x1="100" y1="100" x2="152" y2="130" /> {/* C→E (bottom-right) */}
          <line x1="48"  y1="130" x2="100" y2="100" /> {/* G→C (bottom-left) */}
        </g>
        {/* Visible edges — solid */}
        <g strokeWidth="1.5">
          {/* Top face */}
          <line x1="100" y1="40"  x2="152" y2="70"  /> {/* A→B */}
          <line x1="100" y1="40"  x2="48"  y2="70"  /> {/* A→D */}
          <line x1="152" y1="70"  x2="100" y2="100" /> {/* B→C */}
          <line x1="48"  y1="70"  x2="100" y2="100" /> {/* D→C */}
          {/* Right face */}
          <line x1="152" y1="70"  x2="152" y2="130" /> {/* B→E */}
          <line x1="152" y1="130" x2="100" y2="160" /> {/* E→F */}
          {/* Left face */}
          <line x1="48"  y1="70"  x2="48"  y2="130" /> {/* D→G */}
          <line x1="48"  y1="130" x2="100" y2="160" /> {/* G→F */}
          {/* Shared front edge */}
          <line x1="100" y1="100" x2="100" y2="160" /> {/* C→F */}
        </g>
      </g>
    </svg>
  )
}
