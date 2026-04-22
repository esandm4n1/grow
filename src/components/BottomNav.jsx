const TABS = [
  { id: 'home', label: 'ホーム', emoji: '🏠' },
  { id: 'training', label: '練習', emoji: '🏀' },
  { id: 'log', label: 'きろく', emoji: '✏️' },
  { id: 'growth', label: 'のび', emoji: '📈' },
  { id: 'habits', label: 'しゅうかん', emoji: '⭐' },
]

export default function BottomNav({ current, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-kings-border z-50"
      style={{
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex max-w-2xl mx-auto pb-safe">
        {TABS.map(tab => {
          const active = current === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex-1 flex flex-col items-center justify-center
                py-2 pb-4 min-h-[64px] tap-scale
                ${active ? 'text-kings-redBright' : 'text-kings-boneDim'}
              `}
            >
              <span className={`text-2xl leading-none ${active ? 'animate-bounce-short' : ''}`}>
                {tab.emoji}
              </span>
              <span className="text-[10px] font-bold mt-1 tracking-wide">{tab.label}</span>
              {active && <span className="w-8 h-1 bg-kings-red rounded-full mt-1"></span>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
