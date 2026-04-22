import KingsLogo from './KingsLogo'

/**
 * Scattered Kings logos and a red diagonal stripe as app background.
 * Absolutely positioned behind everything.
 */
export default function AppBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Red diagonal stripe at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[280px]"
        style={{
          background: 'linear-gradient(135deg, #8B0F15 0%, transparent 60%)',
          opacity: 0.25,
        }}
      ></div>

      {/* Logo 1 - left side colored */}
      <KingsLogo
        className="absolute"
        style={{
          top: '280px',
          left: '-100px',
          width: '400px',
          opacity: 0.08,
          filter: 'grayscale(0.3)',
          transform: 'rotate(-15deg)',
        }}
      />

      {/* Logo 2 - bottom right greyscale */}
      <KingsLogo
        className="absolute"
        style={{
          bottom: '180px',
          right: '-120px',
          width: '380px',
          opacity: 0.05,
          filter: 'grayscale(1) brightness(2)',
          transform: 'rotate(20deg)',
        }}
      />

      {/* Logo 3 - top right small */}
      <KingsLogo
        className="absolute"
        style={{
          top: '50px',
          right: '-60px',
          width: '200px',
          opacity: 0.04,
          filter: 'grayscale(1) brightness(2)',
        }}
      />
    </div>
  )
}
