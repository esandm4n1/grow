import { useState, useRef } from 'react'
import Button from '../components/Button'

export default function Settings({ settings, setSettings, onClose }) {
  const [name, setName] = useState(settings.name || '')
  const [jerseyNumber, setJerseyNumber] = useState(settings.jersey_number || '')
  const [gameDate, setGameDate] = useState(settings.game_date || '')
  const [photo, setPhoto] = useState(settings.photo_data_url || null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('写真のサイズが大きすぎます (5MB以下にしてね)')
      return
    }

    // Read as data URL and resize
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        // Resize to max 400x400
        const canvas = document.createElement('canvas')
        const maxSize = 400
        let w = img.width, h = img.height
        if (w > h) {
          if (w > maxSize) { h = h * maxSize / w; w = maxSize }
        } else {
          if (h > maxSize) { w = w * maxSize / h; h = maxSize }
        }
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
        setPhoto(dataUrl)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    if (!confirm('写真を消していい?')) return
    setPhoto(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSave = () => {
    setSaving(true)
    setSettings({
      ...settings,
      name: name.trim() || settings.name,
      jersey_number: jerseyNumber.trim(),
      game_date: gameDate || null,
      photo_data_url: photo,
    })
    setTimeout(() => {
      setSaving(false)
      onClose()
    }, 600)
  }

  const handleClearAllData = () => {
    if (!confirm('本当に全部のデータを消していい? (もとにもどせないよ)')) return
    Object.keys(localStorage)
      .filter(k => k.startsWith('grow_'))
      .forEach(k => localStorage.removeItem(k))
    location.reload()
  }

  const handleBackup = () => {
    const data = {}
    Object.keys(localStorage)
      .filter(k => k.startsWith('grow_'))
      .forEach(k => { data[k] = localStorage.getItem(k) })
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const d = new Date()
    a.download = `grow_backup_${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto min-h-screen p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between py-4 mb-2">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-kings-card border border-kings-border rounded-full grid place-items-center text-kings-bone text-xl tap-scale"
          >
            ✕
          </button>
          <div className="text-center">
            <div className="font-display text-[11px] tracking-[3px] text-kings-red font-bold">
              SETTINGS
            </div>
            <div className="text-lg font-black text-kings-bone">せってい</div>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Saved toast */}
        {saving && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-success-500 text-white px-6 py-3 rounded-full font-bold z-50 shadow-lg animate-pop">
            ✓ ほぞんしました
          </div>
        )}

        {/* Photo section */}
        <div className="bg-kings-card rounded-2xl p-5 border border-kings-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[3px] h-4 bg-kings-red"></div>
            <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
              PHOTO
            </div>
            <div className="text-sm text-kings-boneDim">きみの写真</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-kings-red bg-gradient-to-br from-gray-700 to-gray-900 grid place-items-center">
                {photo ? (
                  <img src={photo} alt="Your photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl opacity-60">🙂</div>
                )}
              </div>
              {photo && (
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 w-8 h-8 bg-danger-500 rounded-full grid place-items-center text-white font-bold tap-scale shadow-lg"
                  title="消す"
                >
                  ✕
                </button>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-6 py-2.5 bg-kings-red text-kings-bone rounded-xl font-bold text-sm tap-scale tracking-wider"
            >
              📷 {photo ? '写真をかえる' : '写真をえらぶ'}
            </button>
            <p className="text-xs text-kings-boneDim mt-2">
              スマホの中の写真から選べるよ
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="bg-kings-card rounded-2xl p-5 border border-kings-border mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-4 bg-kings-red"></div>
            <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
              NAME
            </div>
            <div className="text-sm text-kings-boneDim">なまえ</div>
          </div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="たいき"
            className="w-full text-xl font-bold py-3 px-4 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none text-kings-bone placeholder-kings-boneDim"
          />
        </div>

        {/* Jersey number */}
        <div className="bg-kings-card rounded-2xl p-5 border border-kings-border mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-4 bg-kings-red"></div>
            <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
              JERSEY #
            </div>
            <div className="text-sm text-kings-boneDim">背番号</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-3xl text-kings-redBright font-black">#</div>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              max="99"
              value={jerseyNumber}
              onChange={e => {
                const v = e.target.value.slice(0, 2)  // max 2 digits
                setJerseyNumber(v)
              }}
              placeholder="4"
              className="flex-1 text-center text-4xl font-jersey py-3 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none text-kings-bone placeholder-kings-boneDim"
            />
          </div>
          <p className="text-xs text-kings-boneDim mt-2 text-center">
            背番号を入れると、ホームに盾バッジで出るよ
          </p>
        </div>

        {/* Game date */}
        <div className="bg-kings-card rounded-2xl p-5 border border-kings-border mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-4 bg-kings-red"></div>
            <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
              GAME DATE
            </div>
            <div className="text-sm text-kings-boneDim">次の試合日</div>
          </div>
          <input
            type="date"
            value={gameDate}
            onChange={e => setGameDate(e.target.value)}
            className="w-full text-lg font-bold py-3 px-4 bg-kings-bg border-2 border-kings-border rounded-xl focus:border-kings-red focus:outline-none text-kings-bone"
          />
          <p className="text-xs text-kings-boneDim mt-2">
            試合日の前日は軽め、当日はストレッチだけ
          </p>
        </div>

        {/* Save button */}
        <Button variant="primary" size="lg" fullWidth onClick={handleSave} className="mb-6">
          ほぞんする
        </Button>

        {/* Data section */}
        <div className="bg-kings-card rounded-2xl p-5 border border-kings-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[3px] h-4 bg-kings-gold"></div>
            <div className="font-display text-xs tracking-[3px] font-bold text-kings-bone">
              DATA
            </div>
            <div className="text-sm text-kings-boneDim">データ</div>
          </div>

          <button
            onClick={handleBackup}
            className="w-full flex items-center gap-3 py-3 px-4 bg-kings-bg border border-kings-border rounded-xl tap-scale mb-3 text-left"
          >
            <span className="text-2xl">💾</span>
            <div className="flex-1">
              <div className="font-bold text-kings-bone text-sm">バックアップ</div>
              <div className="text-xs text-kings-boneDim">データをダウンロード</div>
            </div>
          </button>

          <button
            onClick={handleClearAllData}
            className="w-full flex items-center gap-3 py-3 px-4 bg-danger-500/10 border border-danger-500/30 rounded-xl tap-scale text-left"
          >
            <span className="text-2xl">🗑</span>
            <div className="flex-1">
              <div className="font-bold text-danger-500 text-sm">データを全部消す</div>
              <div className="text-xs text-kings-boneDim">はじめからやり直す</div>
            </div>
          </button>
        </div>

        <div className="text-center text-xs text-kings-boneDim py-4">
          GROW · Fukui Kings Edition
        </div>
      </div>
    </div>
  )
}
