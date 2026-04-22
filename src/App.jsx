import { useState, useMemo } from 'react'
import { useLocalStorage } from './logic/storage'
import { generateTodayMenu } from './logic/menuGenerator'
import { today } from './utils/date'
import BottomNav from './components/BottomNav'
import AppBackground from './components/AppBackground'
import KingsLogo from './components/KingsLogo'
import Home from './pages/Home'
import Training from './pages/Training'
import DailyLog from './pages/DailyLog'
import Growth from './pages/Growth'
import Habits from './pages/Habits'
import Settings from './pages/Settings'

export default function App() {
  const [tab, setTab] = useState('home')
  const [logs, setLogs] = useLocalStorage('logs', [])
  const [heights, setHeights] = useLocalStorage('heights', [])
  const [jumps, setJumps] = useLocalStorage('jumps', [])
  const [settings, setSettings] = useLocalStorage('settings', {
    name: '',
    birth_date: null,
    game_date: null,
    start_height_cm: null,
    jersey_number: '',
    photo_data_url: null,
  })
  const [showSettings, setShowSettings] = useState(false)

  // 今日のメニュー
  const todayMenu = useMemo(() => {
    const todayStr = today()
    const todayLog = logs.find(l => l.date === todayStr)
    return generateTodayMenu({
      fatigue: todayLog?.fatigue ?? 3,
      sleep: todayLog?.sleep ?? 8,
      kneePain: todayLog?.knee_pain ?? 0,
      anklePain: todayLog?.ankle_pain ?? 0,
      recentLogs: logs,
      gameDate: settings.game_date,
    })
  }, [logs, settings.game_date])

  const go = (tabId) => {
    setTab(tabId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen max-w-2xl mx-auto">
      {/* App-wide background (scattered logos + red stripe) */}
      <AppBackground />

      <div className="relative z-10 px-4 pt-3">
        {tab === 'home' && (
          <Home
            logs={logs}
            settings={settings}
            todayMenu={todayMenu}
            onGo={go}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {tab === 'training' && (
          <Training
            todayMenu={todayMenu}
            logs={logs}
            setLogs={setLogs}
            onGo={go}
          />
        )}
        {tab === 'log' && (
          <DailyLog
            logs={logs}
            setLogs={setLogs}
            heights={heights}
            setHeights={setHeights}
            jumps={jumps}
            setJumps={setJumps}
            onGo={go}
          />
        )}
        {tab === 'growth' && (
          <Growth heights={heights} jumps={jumps} logs={logs} />
        )}
        {tab === 'habits' && <Habits logs={logs} />}
      </div>

      <BottomNav current={tab} onChange={go} />

      {/* Settings modal */}
      {showSettings && (
        <Settings
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* First-time setup */}
      {!settings.name && tab === 'home' && logs.length === 0 && !showSettings && (
        <WelcomeModal onSave={(name) => setSettings({ ...settings, name })} />
      )}
    </div>
  )
}

function WelcomeModal({ onSave }) {
  const [name, setName] = useState('')
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-kings-card rounded-3xl p-6 max-w-sm w-full border border-kings-border relative overflow-hidden">
        {/* Decoration: red stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-kings-redBright to-transparent"
        ></div>

        <div className="text-center mb-5">
          <div className="mb-3 flex justify-center">
            <KingsLogo className="w-20 h-auto" />
          </div>
          <div className="font-display text-[10px] tracking-[4px] text-kings-redBright font-bold mb-1">
            WELCOME TO
          </div>
          <h2 className="text-3xl font-black text-kings-bone tracking-wider">GROW</h2>
          <div className="font-display text-[10px] tracking-[3px] text-kings-boneDim mt-1">
            FUKUI KINGS · EDITION
          </div>
          <p className="text-sm text-kings-boneDim mt-4">
            きみの名前をおしえて
          </p>
        </div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="なまえ"
          className="w-full text-center text-2xl font-bold py-3 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none mb-4 text-kings-bone placeholder-kings-boneDim"
          autoFocus
        />
        <button
          onClick={() => name.trim() && onSave(name.trim())}
          disabled={!name.trim()}
          className="w-full bg-kings-red text-kings-bone text-xl font-black py-3 rounded-xl tap-scale disabled:opacity-40 tracking-wider shadow-lg shadow-kings-red/30"
        >
          はじめる
        </button>
      </div>
    </div>
  )
}
