/**
 * Player profile hero with rotating ring photo + shield jersey number badge.
 *
 * Props:
 *   photoDataUrl: base64 data URL string or null (shows placeholder)
 *   jerseyNumber: number string or null
 *   name: string
 *   size: 'sm' | 'md' | 'lg' (default 'lg')
 */
export default function PlayerHero({
  photoDataUrl,
  jerseyNumber,
  name,
  subtitle = 'FUKUI KINGS · U12',
  size = 'lg',
}) {
  const sizes = {
    sm: { stack: 140, photoInset: 6, ring: 2, jerseyW: 60, jerseyH: 62, jerseyFont: 32, jerseyOffset: -6 },
    md: { stack: 180, photoInset: 7, ring: 3, jerseyW: 72, jerseyH: 76, jerseyFont: 40, jerseyOffset: -8 },
    lg: { stack: 220, photoInset: 8, ring: 3, jerseyW: 84, jerseyH: 88, jerseyFont: 46, jerseyOffset: -10 },
  }
  const s = sizes[size] || sizes.lg

  return (
    <div className="flex flex-col items-center">
      {/* Photo + jersey stack */}
      <div
        className="relative"
        style={{ width: s.stack, height: s.stack }}
      >
        {/* Rotating ring */}
        <div
          className="absolute inset-0 rounded-full ring-rotating animate-rotate-ring"
          style={{ padding: `${s.ring}px` }}
        >
          <div
            className="absolute bg-kings-bg rounded-full"
            style={{ inset: s.ring }}
          ></div>
        </div>

        {/* Photo circle */}
        <div
          className="absolute rounded-full overflow-hidden border-2 border-kings-red bg-gradient-to-br from-gray-700 to-gray-900"
          style={{ inset: s.photoInset }}
        >
          <div className="w-full h-full grid place-items-center relative bg-stripe-diag">
            {photoDataUrl ? (
              <img
                src={photoDataUrl}
                alt={name || 'Player'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-8xl opacity-60" style={{ fontSize: s.stack * 0.45 }}>🙂</div>
            )}
          </div>
        </div>

        {/* Shield jersey badge */}
        {jerseyNumber && (
          <div
            className="absolute z-10"
            style={{
              width: s.jerseyW,
              height: s.jerseyH,
              bottom: s.jerseyOffset,
              right: s.jerseyOffset,
              filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))',
            }}
          >
            {/* Crown on top */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-20"
              style={{
                top: -18,
                fontSize: s.jerseyW * 0.28,
                filter: 'drop-shadow(0 2px 4px rgba(255,184,0,0.6))',
              }}
            >
              👑
            </div>

            {/* Outer black shield (border) */}
            <div className="w-full h-full bg-kings-bg clip-shield p-[3px]">
              {/* Inner red shield with stripes */}
              <div
                className="w-full h-full clip-shield relative grid place-items-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FF2938 0%, #8B0F15 100%)',
                }}
              >
                {/* Stripe overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'repeating-linear-gradient(-45deg, transparent 0, transparent 6px, rgba(0,0,0,0.12) 6px, rgba(0,0,0,0.12) 12px)',
                  }}
                ></div>
                {/* Number */}
                <div
                  className="relative z-10 font-jersey text-kings-bone text-jersey-shadow"
                  style={{ fontSize: s.jerseyFont, lineHeight: 1, marginTop: -s.jerseyH * 0.09 }}
                >
                  {jerseyNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Name & subtitle */}
      {(name || subtitle) && (
        <div className="mt-5 text-center">
          {name && (
            <div className="text-2xl font-black text-kings-bone mb-0.5">{name}</div>
          )}
          {subtitle && (
            <div className="font-display text-[10px] tracking-[3px] text-kings-boneDim">
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
