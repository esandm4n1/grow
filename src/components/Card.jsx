export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-kings-card rounded-2xl p-5 border border-kings-border
        relative z-10
        ${onClick ? 'cursor-pointer tap-scale' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, emoji, english, className = '' }) {
  return (
    <div className={`flex items-center gap-3 mb-3 relative z-10 ${className}`}>
      <div className="w-[3px] h-4 bg-kings-red"></div>
      {english && (
        <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
          {english}
        </div>
      )}
      {emoji && !english && <span className="text-2xl">{emoji}</span>}
      <h2 className="text-sm text-kings-boneDim font-medium">{children}</h2>
    </div>
  )
}
