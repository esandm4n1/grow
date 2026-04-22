import { useState } from 'react'
import Card, { SectionTitle } from '../components/Card'
import Button from '../components/Button'
import EmojiScale, { FATIGUE_OPTIONS, PAIN_OPTIONS } from '../components/EmojiScale'
import KingsLogo from '../components/KingsLogo'
import { today } from '../utils/date'

export default function DailyLog({ logs, setLogs, heights, setHeights, jumps, setJumps, onGo }) {
  const todayStr = today()
  const existing = logs.find(l => l.date === todayStr)

  const [sleep, setSleep] = useState(existing?.sleep ?? 8)
  const [fatigue, setFatigue] = useState(existing?.fatigue ?? 3)
  const [kneePain, setKneePain] = useState(existing?.knee_pain ?? 0)
  const [anklePain, setAnklePain] = useState(existing?.ankle_pain ?? 0)
  const [meals, setMeals] = useState(existing?.meals || {
    breakfast: false, lunch: false, dinner: false, protein: false, vegetable: false,
  })
  const [jumpCm, setJumpCm] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [saved, setSaved] = useState(false)

  const toggleMeal = (key) => {
    setMeals(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    const newLog = {
      ...(existing || {}),
      date: todayStr,
      sleep,
      fatigue,
      knee_pain: kneePain,
      ankle_pain: anklePain,
      meals,
      jump_cm: jumpCm ? Number(jumpCm) : (existing?.jump_cm || null),
      training_done: existing?.training_done || false,
    }
    setLogs([...logs.filter(l => l.date !== todayStr), newLog])

    if (jumpCm && !isNaN(Number(jumpCm))) {
      setJumps([...jumps.filter(j => j.date !== todayStr), {
        date: todayStr, cm: Number(jumpCm)
      }])
    }
    if (heightCm && !isNaN(Number(heightCm))) {
      setHeights([...heights.filter(h => h.date !== todayStr), {
        date: todayStr, cm: Number(heightCm)
      }])
    }

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onGo('home')
    }, 1800)
  }

  return (
    <div className="space-y-5 pb-28 relative">
      {/* Saved overlay */}
      {saved && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #1a0606 0%, #0A0A0A 70%)',
          }}
        >
          <div className="flex flex-col items-center animate-pop">
            <KingsLogo
              className="w-40 mb-4"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(211,32,39,0.5))' }}
            />
            <div className="font-display text-xs tracking-[6px] text-kings-redBright mb-2">
              RECORDED
            </div>
            <div className="text-2xl font-black text-kings-bone">きろく完了！</div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <div className="font-display text-[11px] tracking-[3px] text-kings-redBright font-bold mb-1">
          DAILY CHECK
        </div>
        <h1 className="text-2xl font-black text-kings-bone">今日のきろく ✏️</h1>
        <p className="text-sm text-kings-boneDim mt-1">かんたんに入力しよう</p>
      </div>

      {/* Sleep */}
      <Card>
        <SectionTitle english="SLEEP">ねた時間</SectionTitle>
        <div className="flex items-center gap-3 justify-center py-2">
          <button
            onClick={() => setSleep(Math.max(4, sleep - 0.5))}
            className="w-12 h-12 rounded-full bg-kings-bg border border-kings-border text-2xl font-bold tap-scale text-kings-bone"
          >
            −
          </button>
          <div className="text-center min-w-[120px]">
            <div className="font-num text-5xl text-kings-redBright leading-none">{sleep}</div>
            <div className="text-xs text-kings-boneDim mt-1 tracking-wider">時間</div>
          </div>
          <button
            onClick={() => setSleep(Math.min(14, sleep + 0.5))}
            className="w-12 h-12 rounded-full bg-kings-bg border border-kings-border text-2xl font-bold tap-scale text-kings-bone"
          >
            +
          </button>
        </div>
        {sleep < 8 && (
          <p className="text-center text-sm text-kings-gold font-medium mt-2">
            💡 成長期は 8〜10時間がおすすめ
          </p>
        )}
      </Card>

      {/* Fatigue */}
      <Card>
        <SectionTitle english="FATIGUE">今日のつかれ</SectionTitle>
        <EmojiScale value={fatigue} onChange={setFatigue} options={FATIGUE_OPTIONS} activeColor="primary" />
      </Card>

      {/* Knee pain */}
      <Card>
        <SectionTitle english="KNEE PAIN">ひざの痛み</SectionTitle>
        <EmojiScale value={kneePain} onChange={setKneePain} options={PAIN_OPTIONS} activeColor="danger" />
      </Card>

      {/* Ankle pain */}
      <Card>
        <SectionTitle english="ANKLE PAIN">足首の痛み</SectionTitle>
        <EmojiScale value={anklePain} onChange={setAnklePain} options={PAIN_OPTIONS} activeColor="danger" />
      </Card>

      {/* Meals */}
      <Card>
        <SectionTitle english="MEALS">ごはん</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'breakfast', emoji: '🌅', label: 'あさごはん' },
            { key: 'lunch', emoji: '☀️', label: 'おひるごはん' },
            { key: 'dinner', emoji: '🌙', label: 'よるごはん' },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => toggleMeal(m.key)}
              className={`
                py-3 rounded-xl border-2 tap-scale transition-all
                ${meals[m.key]
                  ? 'bg-success-500 text-white border-success-500 scale-105 shadow-lg shadow-success-500/30'
                  : 'bg-kings-bg text-kings-boneDim border-kings-border'}
              `}
            >
              <div className="text-2xl">{m.emoji}</div>
              <div className="text-xs font-bold mt-1">{m.label}</div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            { key: 'protein', emoji: '🍗', label: 'たんぱく質' },
            { key: 'vegetable', emoji: '🥬', label: 'やさい' },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => toggleMeal(m.key)}
              className={`
                py-3 rounded-xl border-2 tap-scale transition-all flex items-center justify-center gap-2
                ${meals[m.key]
                  ? 'bg-kings-gold text-kings-bg border-kings-gold'
                  : 'bg-kings-bg text-kings-boneDim border-kings-border'}
              `}
            >
              <span className="text-xl">{m.emoji}</span>
              <span className="text-sm font-bold">{m.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Jump (optional) */}
      <Card>
        <SectionTitle english="JUMP (OPT)">ジャンプ きろく (任意)</SectionTitle>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="number"
            inputMode="numeric"
            value={jumpCm}
            onChange={e => setJumpCm(e.target.value)}
            placeholder="--"
            className="w-32 text-center font-num text-4xl py-3 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none text-kings-bone placeholder-kings-boneDim"
          />
          <span className="text-xl font-bold text-kings-boneDim">cm</span>
        </div>
        <p className="text-xs text-kings-boneDim text-center mt-2">
          はかったときだけでOK
        </p>
      </Card>

      {/* Height (optional) */}
      <Card>
        <SectionTitle english="HEIGHT (OPT)">身長 きろく (任意)</SectionTitle>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            value={heightCm}
            onChange={e => setHeightCm(e.target.value)}
            placeholder="--.--"
            className="w-32 text-center font-num text-4xl py-3 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none text-kings-bone placeholder-kings-boneDim"
          />
          <span className="text-xl font-bold text-kings-boneDim">cm</span>
        </div>
        <p className="text-xs text-kings-boneDim text-center mt-2">
          月に1回、朝おきてすぐがおすすめ
        </p>
      </Card>

      <Button variant="primary" size="lg" fullWidth onClick={handleSave}>
        きろくする
      </Button>
    </div>
  )
}
