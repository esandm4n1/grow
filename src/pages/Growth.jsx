import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card, { SectionTitle } from '../components/Card'

export default function Growth({ heights, jumps, logs }) {
  const [tab, setTab] = useState('height')

  const heightData = [...heights]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(h => ({ date: h.date.slice(5), value: h.cm }))

  const jumpData = [...jumps]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(j => ({ date: j.date.slice(5), value: j.cm }))

  const sleepData = [...logs]
    .filter(l => l.sleep != null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map(l => ({ date: l.date.slice(5), value: l.sleep }))

  const heightGrowth = heightData.length >= 2
    ? (heightData[heightData.length - 1].value - heightData[0].value).toFixed(1)
    : null
  const jumpGrowth = jumpData.length >= 2
    ? jumpData[jumpData.length - 1].value - jumpData[0].value
    : null

  const tabs = [
    { id: 'height', label: '身長', emoji: '📏', color: '#FF2938' },
    { id: 'jump', label: 'ジャンプ', emoji: '🦘', color: '#FFB800' },
    { id: 'sleep', label: 'すいみん', emoji: '🛌', color: '#34C759' },
  ]

  // Dark theme tooltip
  const tooltipContentStyle = {
    background: '#1A1A1A',
    border: '1px solid #222',
    borderRadius: 8,
    color: '#F5F1E8',
    fontSize: 13,
  }

  return (
    <div className="space-y-4 pb-28">
      <div className="pt-2">
        <div className="font-display text-[11px] tracking-[3px] text-kings-redBright font-bold mb-1">
          GROWTH
        </div>
        <h1 className="text-2xl font-black text-kings-bone">のびグラフ 📈</h1>
        <p className="text-sm text-kings-boneDim mt-1">コツコツが、かならず形になる</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-kings-card border border-kings-border p-1 rounded-xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`
              flex-1 py-2 rounded-lg font-bold text-sm tap-scale transition-all
              ${tab === t.id
                ? 'bg-kings-bg text-kings-bone shadow-lg'
                : 'text-kings-boneDim'}
            `}
          >
            <span className="mr-1">{t.emoji}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Height */}
      {tab === 'height' && (
        <>
          <Card>
            <SectionTitle english="HEIGHT">身長のうつりかわり</SectionTitle>
            {heightData.length < 2 ? (
              <div className="py-12 text-center text-kings-boneDim">
                <p>まだデータが少ないよ</p>
                <p className="text-sm mt-1">月に1回、きろくしてみよう</p>
              </div>
            ) : (
              <>
                <div className="mb-3 text-center">
                  <span className="text-sm text-kings-boneDim">のびた:</span>
                  <span className="font-num text-4xl text-kings-redBright mx-2">+{heightGrowth}</span>
                  <span className="text-sm text-kings-boneDim">cm</span>
                </div>
                <div className="h-56">
                  <ResponsiveContainer>
                    <LineChart data={heightData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A8A49D' }} />
                      <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#A8A49D' }} />
                      <Tooltip contentStyle={tooltipContentStyle} />
                      <Line type="monotone" dataKey="value" stroke="#FF2938" strokeWidth={3} dot={{ r: 5, fill: '#FF2938' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </Card>
          <Card>
            <p className="text-sm font-bold text-kings-redBright mb-2">💡 成長のための習慣</p>
            <ul className="text-sm text-kings-bone space-y-1">
              <li>・しっかり寝る (8〜10時間)</li>
              <li>・バランスよく食べる</li>
              <li>・適度に動く (ムリしない)</li>
            </ul>
          </Card>
        </>
      )}

      {/* Jump */}
      {tab === 'jump' && (
        <Card>
          <SectionTitle english="JUMP">ジャンプ力</SectionTitle>
          {jumpData.length < 2 ? (
            <div className="py-12 text-center text-kings-boneDim">
              <p>まだデータがないよ</p>
              <p className="text-sm mt-1">きろく画面で入力できるよ</p>
            </div>
          ) : (
            <>
              <div className="mb-3 text-center">
                <span className="text-sm text-kings-boneDim">のびた:</span>
                <span className="font-num text-4xl text-kings-gold mx-2">
                  {jumpGrowth >= 0 ? '+' : ''}{jumpGrowth}
                </span>
                <span className="text-sm text-kings-boneDim">cm</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={jumpData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A8A49D' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#A8A49D' }} />
                    <Tooltip contentStyle={tooltipContentStyle} />
                    <Bar dataKey="value" fill="#FFB800" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Sleep */}
      {tab === 'sleep' && (
        <Card>
          <SectionTitle english="SLEEP">すいみん (直近14日)</SectionTitle>
          {sleepData.length < 2 ? (
            <div className="py-12 text-center text-kings-boneDim">
              <p>まだデータがないよ</p>
            </div>
          ) : (
            <>
              <div className="mb-3 text-center">
                <span className="text-sm text-kings-boneDim">へいきん:</span>
                <span className="font-num text-4xl text-success-500 mx-2">
                  {(sleepData.reduce((a, b) => a + b.value, 0) / sleepData.length).toFixed(1)}
                </span>
                <span className="text-sm text-kings-boneDim">時間</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={sleepData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#A8A49D' }} />
                    <YAxis domain={[0, 12]} tick={{ fontSize: 11, fill: '#A8A49D' }} />
                    <Tooltip contentStyle={tooltipContentStyle} />
                    <Bar dataKey="value" fill="#34C759" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
