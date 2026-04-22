/**
 * 絵文字で1〜5段階選ぶコンポーネント(疲労や痛み入力用)
 */
export default function EmojiScale({
  value,
  onChange,
  options,
  activeColor = 'primary',
}) {
  const colorMap = {
    primary: 'bg-gradient-to-br from-kings-red to-kings-redDark text-kings-bone border-kings-redBright',
    success: 'bg-success-500 text-white border-success-500',
    danger: 'bg-danger-500 text-white border-danger-500',
    accent: 'bg-kings-gold text-kings-bg border-kings-gold',
  }

  return (
    <div className="flex gap-2 justify-between">
      {options.map((opt) => {
        const active = value === opt.val
        return (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            className={`
              flex-1 flex flex-col items-center justify-center
              py-3 px-1 rounded-xl border-2 tap-scale
              transition-all
              ${active
                ? colorMap[activeColor] + ' scale-105 shadow-lg shadow-kings-red/30 -translate-y-0.5'
                : 'bg-kings-card text-kings-boneDim border-kings-border'}
            `}
          >
            <span className="text-3xl leading-none">{opt.emoji}</span>
            <span className={`text-xs mt-1 font-bold ${active ? '' : 'text-kings-boneDim'}`}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// プリセット
export const FATIGUE_OPTIONS = [
  { val: 1, emoji: '😄', label: 'げんき' },
  { val: 2, emoji: '🙂', label: 'まあまあ' },
  { val: 3, emoji: '😐', label: 'ふつう' },
  { val: 4, emoji: '😫', label: 'つかれた' },
  { val: 5, emoji: '😵', label: 'クタクタ' },
]

export const PAIN_OPTIONS = [
  { val: 0, emoji: '😊', label: 'なし' },
  { val: 1, emoji: '🙂', label: '少し' },
  { val: 2, emoji: '😐', label: '気になる' },
  { val: 3, emoji: '😣', label: 'いたい' },
  { val: 4, emoji: '😖', label: 'つよい' },
]
