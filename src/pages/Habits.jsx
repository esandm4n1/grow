import Card, { SectionTitle } from '../components/Card'
import { calcStreak, sleepOK, mealOK, trainingDone } from '../utils/streak'
import { daysAgo } from '../utils/date'

export default function Habits({ logs }) {
  const streaks = {
    sleep: calcStreak(logs, sleepOK),
    meal: calcStreak(logs, mealOK),
    training: calcStreak(logs, trainingDone),
  }

  // Past 30 days calendar
  const days = []
  for (let i = 29; i >= 0; i--) {
    const dateStr = daysAgo(i)
    const log = logs.find(l => l.date === dateStr)
    days.push({
      date: dateStr,
      sleep: log ? sleepOK(log) : null,
      meal: log ? mealOK(log) : null,
      training: log ? trainingDone(log) : null,
    })
  }

  const thisMonthLogs = logs.filter(l => {
    const d = new Date(l.date)
    const now = new Date()
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  })
  const monthDays = new Date().getDate()

  const rates = {
    sleep: Math.round((thisMonthLogs.filter(sleepOK).length / monthDays) * 100) || 0,
    meal: Math.round((thisMonthLogs.filter(mealOK).length / monthDays) * 100) || 0,
    training: Math.round((thisMonthLogs.filter(trainingDone).length / monthDays) * 100) || 0,
  }

  const habits = [
    {
      key: 'sleep', emoji: '🛌', label: 'すいみん8時間以上',
      color: 'bg-kings-redBright', bgColor: 'rgba(255,41,56,0.12)',
      textColor: 'text-kings-redBright',
    },
    {
      key: 'meal', emoji: '🍙', label: '3食しっかり',
      color: 'bg-kings-gold', bgColor: 'rgba(255,184,0,0.12)',
      textColor: 'text-kings-gold',
    },
    {
      key: 'training', emoji: '🏀', label: 'れんしゅう完了',
      color: 'bg-success-500', bgColor: 'rgba(52,199,89,0.12)',
      textColor: 'text-success-500',
    },
  ]

  const getBadge = (streak) => {
    if (streak >= 30) return { emoji: '🏆', label: '30日マスター' }
    if (streak >= 14) return { emoji: '🥇', label: '2週間つづき' }
    if (streak >= 7) return { emoji: '⭐', label: '1週間達成' }
    if (streak >= 3) return { emoji: '🔥', label: '3日突破' }
    return null
  }

  return (
    <div className="space-y-4 pb-28">
      <div className="pt-2">
        <div className="font-display text-[11px] tracking-[3px] text-kings-redBright font-bold mb-1">
          HABITS
        </div>
        <h1 className="text-2xl font-black text-kings-bone">しゅうかん ⭐</h1>
        <p className="text-sm text-kings-boneDim mt-1">小さな積み重ねが、大きなチカラになる</p>
      </div>

      {/* Streak cards */}
      <div className="space-y-3">
        {habits.map(h => {
          const streak = streaks[h.key]
          const badge = getBadge(streak)
          return (
            <Card key={h.key}>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: h.bgColor }}
                >
                  {h.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-kings-bone">{h.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-num text-3xl ${h.textColor}`}>{streak}</span>
                    <span className="text-sm text-kings-boneDim">日つづいてる</span>
                  </div>
                </div>
                {badge && (
                  <div className="text-center">
                    <div className="text-3xl">{badge.emoji}</div>
                    <p className="text-[10px] text-kings-boneDim mt-0.5">{badge.label}</p>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Monthly rates */}
      <div>
        <SectionTitle english="THIS MONTH">今月のたっせい率</SectionTitle>
        <Card>
          <div className="space-y-4">
            {habits.map(h => (
              <div key={h.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium flex items-center gap-2 text-kings-bone">
                    <span>{h.emoji}</span>
                    <span>{h.label}</span>
                  </span>
                  <span className={`font-num text-xl ${h.textColor}`}>{rates[h.key]}%</span>
                </div>
                <div className="h-3 bg-kings-bg rounded-full overflow-hidden border border-kings-border">
                  <div
                    className={`h-full ${h.color} rounded-full transition-all`}
                    style={{ width: `${rates[h.key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Calendar */}
      <div>
        <SectionTitle english="LAST 30 DAYS">この30日</SectionTitle>
        <Card>
          <div className="space-y-3">
            {habits.map(h => (
              <div key={h.key}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{h.emoji}</span>
                  <span className="text-sm font-medium text-kings-bone">{h.label}</span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      title={d.date}
                      className={`
                        aspect-square rounded-md
                        ${d[h.key] === true
                          ? h.color
                          : d[h.key] === false
                            ? 'bg-kings-border'
                            : 'bg-kings-bg border border-kings-border'}
                      `}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center mt-4 text-xs text-kings-boneDim">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-kings-bg border border-kings-border rounded-sm"></span>
              未入力
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-kings-border rounded-sm"></span>
              できなかった
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-kings-redBright rounded-sm"></span>
              できた
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
