/* The Drifted mark: a D whose counter has drifted off-axis, printed twice out of
   register. Offset and rotation come from the mark spec — 9 units at -3.5deg.

   Per the handoff, the two-plate cut closes up and reads as a blob below 32px, so
   `plain` renders the single-plate version instead. */

export function PlateDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <g id="plate">
          <path
            fillRule="evenodd"
            d="M14 10 H48 C74 10 88 26 88 50 C88 74 74 90 48 90 H14 Z M46 40 H54 C64 40 70 47 70 58 C70 69 64 76 54 76 H46 Z"
          />
        </g>
      </defs>
    </svg>
  );
}

export function Mark({ size = 30, plain = false }: { size?: number; plain?: boolean }) {
  /* Below 32px the offset plate closes up — drop to the single plate. */
  const single = plain || size < 32;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {!single && (
        <use href="#plate" fill="#AFE304" transform="rotate(-3.5 50 50) translate(-9 -7.8)" />
      )}
      <use href="#plate" fill="#F2F0EA" />
    </svg>
  );
}
