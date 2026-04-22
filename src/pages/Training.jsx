import { useState } from 'react'
import Card, { SectionTitle } from '../components/Card'
import Button from '../components/Button'
import KingsLogo from '../components/KingsLogo'
import { GLOBAL_NG } from '../logic/exercises'
import { today } from '../utils/date'

export default function Training({ todayMenu, logs, setLogs, onGo }) {
  const todayStr = today()
  const todayLog = logs.find(l => l.date === todayStr)

  const [completedIds, setCompletedIds] = useState(todayLog?.completed_exercises || [])
  const [showDone, setShowDone] = useState(false)

  const toggleDone = (id) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const allDone = todayMenu.exercises.every(e => completedIds.includes(e.id))

  const handleComplete = () => {
    const newLog = {
      ...(todayLog || { date: todayStr, sleep: 8, fatigue: 3, knee_pain: 0, ankle_pain: 0 }),
      training_done: true,
      completed_exercises: completedIds,
      menu_type: todayMenu.type,
    }
    const others = logs.filter(l => l.date !== todayStr)
    setLogs([...others, newLog])
    setShowDone(true)
    setTimeout(() => {
      setShowDone(false)
      onGo('home')
    }, 3200)
  }

  return (
    <div className="space-y-4 pb-28 relative">
      {/* ========== COMPLETION OVERLAY ========== */}
      {showDone && <CompletionOverlay />}

      {/* Header */}
      <div className="pt-2">
        <div className="font-display text-[11px] tracking-[3px] text-kings-redBright font-bold mb-1">
          TODAY'S PRACTICE
        </div>
        <h1 className="text-2xl font-black text-kings-bone">きょうの練習</h1>
      </div>

      {/* Menu hero card */}
      <div
        className="rounded-2xl p-5 overflow-hidden relative border border-kings-red/30"
        style={{
          background: 'linear-gradient(135deg, #8B0F15 0%, #4a0809 100%)',
        }}
      >
        <KingsLogo
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-40 opacity-10 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-kings-bg/40 backdrop-blur text-kings-bone font-display text-[10px] tracking-[2px] font-bold px-2.5 py-1 rounded">
              {todayMenu.type}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{todayMenu.emoji}</span>
            <h2 className="text-xl font-black text-kings-bone">
              {todayMenu.exercises.length}種目 · {todayMenu.duration}分
            </h2>
          </div>
          <p className="text-sm text-kings-bone/85">{todayMenu.message}</p>
        </div>
      </div>

      {/* Exercise list */}
      <div>
        <SectionTitle english="MENU">メニュー</SectionTitle>
        <div className="space-y-3">
          {todayMenu.exercises.map((ex, idx) => {
            const done = completedIds.includes(ex.id)
            return (
              <Card
                key={ex.id + idx}
                onClick={() => toggleDone(ex.id)}
                className={done ? '!bg-success-500/10 !border-success-500/40' : ''}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-num text-lg
                    ${done
                      ? 'bg-success-500 text-white'
                      : 'bg-kings-bg border border-kings-border text-kings-redBright'}
                  `}>
                    {done ? '✓' : String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{ex.emoji}</span>
                      <h3 className={`font-bold text-lg ${done ? 'line-through text-kings-boneDim' : 'text-kings-bone'}`}>
                        {ex.name}
                      </h3>
                    </div>
                    <p className="text-kings-redBright font-bold text-sm mt-1">
                      {ex.reps}
                    </p>
                    {ex.note && (
                      <p className="text-xs text-kings-boneDim mt-1">💡 {ex.note}</p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Today's warnings */}
      <div>
        <SectionTitle english="WARNINGS">きょうの注意</SectionTitle>
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: 'rgba(255,184,0,0.08)',
            borderColor: 'rgba(255,184,0,0.25)',
          }}
        >
          <ul className="space-y-2">
            {todayMenu.ngList.map((ng, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-kings-gold font-medium">
                <span className="text-kings-gold mt-0.5">🚫</span>
                <span>{ng}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Global rules */}
      <details className="bg-kings-card rounded-2xl overflow-hidden border border-kings-border">
        <summary className="p-4 font-bold cursor-pointer text-sm text-kings-bone tap-scale">
          📖 いつも守るルール
        </summary>
        <ul className="px-4 pb-4 space-y-1.5 text-sm text-kings-boneDim">
          {GLOBAL_NG.map((ng, i) => (
            <li key={i}>・{ng}</li>
          ))}
        </ul>
      </details>

      {/* Complete button */}
      <div className="pt-2">
        <Button
          variant={allDone ? 'success' : 'primary'}
          size="lg"
          fullWidth
          onClick={handleComplete}
          disabled={completedIds.length === 0}
        >
          {allDone ? '🎉 ぜんぶ終わった!' : `完了する (${completedIds.length}/${todayMenu.exercises.length})`}
        </Button>
      </div>
    </div>
  )
}

function CompletionOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-5"
      style={{
        background: 'radial-gradient(ellipse at center, #1a0606 0%, #0A0A0A 70%)',
      }}
    >
      {/* Rotating burst rays */}
      <div className="absolute inset-0 burst-conic animate-rotate-burst pointer-events-none"></div>

      {/* Diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent 0, transparent 30px, rgba(211,32,39,0.04) 30px, rgba(211,32,39,0.04) 60px)',
        }}
      ></div>

      {/* Impact flash */}
      <div
        className="absolute inset-0 animate-flash-burst pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, transparent 45%)',
        }}
      ></div>

      {/* Particles */}
      <Particles />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Logo with glow */}
        <div className="relative w-60 h-52 grid place-items-center mb-6">
          <div
            className="absolute w-80 h-80 animate-pulse-glow pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,41,56,0.45) 0%, rgba(255,41,56,0.1) 40%, transparent 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
          <KingsLogo
            className="relative w-56 animate-logo-roar"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(211,32,39,0.5))' }}
          />
        </div>

        <div className="font-display text-xs tracking-[6px] text-kings-redBright mb-2 animate-slide-up-1">
          PRACTICE DONE
        </div>
        <div className="font-black text-3xl text-kings-bone mb-3 text-center text-title-shadow animate-slide-up-2">
          おつかれさま！
        </div>
        <div className="text-sm text-kings-boneDim mb-6 text-center animate-slide-up-3">
          今日もよくがんばった 🔥
        </div>
      </div>
    </div>
  )
}

function Particles() {
  const particles = []
  const colors = ['kings-redBright', 'kings-gold', 'kings-bone']
  const colorValues = ['#FF2938', '#FFB800', '#F5F1E8']
  for (let i = 0; i < 30; i++) {
    const angle = (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.3
    const distance = 140 + Math.random() * 120
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance - 20
    const style = {
      position: 'absolute',
      width: 10,
      height: 10,
      top: '50%',
      left: '50%',
      background: colorValues[i % 3],
      '--tx': tx + 'px',
      '--ty': ty + 'px',
      animationDelay: (0.2 + Math.random() * 0.4) + 's',
      borderRadius: i % 3 === 0 ? '50%' : 0,
    }
    particles.push(<div key={i} className="particle-fly" style={style} />)
  }
  return <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-20">{particles}</div>
}
