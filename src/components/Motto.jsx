/**
 * NEVER / GIVE UP badge with diagonal stripes and neon pulse
 */
export default function Motto({ size = 'md' }) {
  const sizes = {
    sm: { px: 'px-4', py: 'py-1', textSize: 'text-[10px]', tracking: 'tracking-[3px]' },
    md: { px: 'px-6', py: 'py-1.5', textSize: 'text-sm', tracking: 'tracking-[4px]' },
    lg: { px: 'px-7', py: 'py-2', textSize: 'text-base', tracking: 'tracking-[5px]' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className="relative inline-block py-2">
      {/* Diagonal stripe background with skew */}
      <div className="absolute inset-0 motto-bg-stripes skew-neg-15"></div>
      {/* Black cutout */}
      <div className="absolute inset-y-1 inset-x-2 bg-kings-bg skew-neg-15"></div>
      {/* Text content */}
      <div
        className={`
          relative z-10 inline-flex items-center gap-2 ${s.px} ${s.py}
          font-display font-bold ${s.textSize} ${s.tracking}
          text-kings-bone
        `}
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
      >
        <span>NEVER</span>
        <span className="text-kings-redBright font-black text-lg opacity-80">/</span>
        <span className="text-kings-redBright font-bold animate-neon-pulse">GIVE UP</span>
      </div>
    </div>
  )
}
