import Card, { SectionTitle } from '../components/Card'
import KingsLogo from '../components/KingsLogo'
import Motto from '../components/Motto'
import PlayerHero from '../components/PlayerHero'
import { today, getWeekday, formatJapanese } from '../utils/date'
import { calcStreak, sleepOK, trainingDone, mealOK } from '../utils/streak'
import { getGameMessage } from '../logic/menuGenerator'

export default function Home({ logs, settings, todayMenu, onGo, onOpenSettings }) {
  const todayStr = today()
  const todayLog = logs.find(l => l.date === todayStr)
  const name = settings.name || 'きみ'

  const streakTrain = calcStreak(logs, trainingDone)
  const streakSleep = calcStreak(logs, sleepOK)
  const streakMeal = calcStreak(logs, mealOK)
  // "Current streak" = max of the three
  const maxStreak = Math.max(streakTrain, streakSleep, streakMeal)

  const gameMsg = getGameMessage(settings.game_date)

  const messages = [
    'ちょっとずつで、つよくなる。',
    '今日の一歩が、未来の身長。',
    '休むことも、トレーニング。',
    '記録は、未来への手紙。',
    '小さな積み重ねが、プロへの道。',
    'つかれたら、休む勇気。',
    'うまくなるより、ケガしないこと。',
  ]
  const dayIdx = new Date(todayStr).getDate() % messages.length
  const quote = messages[dayIdx]

  return (
    <div className="space-y-5 pb-28 relative">
      {/* Header bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <KingsLogo
            className="w-10 h-10 object-contain"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(211,32,39,0.4))' }}
          />
          <div>
            <div className="font-num text-2xl tracking-[2px] text-kings-bone leading-none">
              GROW
            </div>
            <div className="font-display text-[9px] tracking-[2px] text-kings-redBright font-bold mt-0.5">
              FUKUI KINGS
            </div>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 bg-kings-card border border-kings-border rounded-full grid place-items-center text-kings-boneDim text-lg tap-scale"
        >
          ⚙
        </button>
      </div>

      {/* Date */}
      <div className="text-center">
        <p className="text-xs text-kings-boneDim tracking-wider">
          {formatJapanese(todayStr)}({getWeekday()})
        </p>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center py-4">
        <PlayerHero
          photoDataUrl={settings.photo_data_url}
          jerseyNumber={settings.jersey_number}
          name={name}
          subtitle="FUKUI KINGS · U12"
          size="lg"
        />

        <div className="mt-5">
          <Motto />
        </div>
      </div>

      {/* Game message */}
      {gameMsg && (
        <Card className="!bg-gradient-to-r !from-kings-gold/20 !to-kings-gold/5 !border-kings-gold/40">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{gameMsg.emoji}</span>
            <span className="text-base font-bold text-kings-gold">{gameMsg.text}</span>
          </div>
        </Card>
      )}

      {/* Streak feature card */}
      <div
        className="relative rounded-2xl p-5 overflow-hidden border border-kings-red/30"
        style={{
          background: 'linear-gradient(135deg, #8B0F15 0%, #4a0809 100%)',
        }}
      >
        <div
          className="absolute -top-5 -right-5 w-36 h-36"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
          }}
        ></div>
        <KingsLogo
          className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-36 opacity-15 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="font-display text-[10px] tracking-[3px] text-white/70 font-bold mb-1">
            CURRENT STREAK
          </div>
          <div className="flex items-baseline gap-2">
            <div className="font-num text-5xl text-kings-bone leading-none">{maxStreak}</div>
            <div className="text-sm text-kings-bone font-bold">日連続</div>
          </div>
          <div className="text-xs text-kings-bone/85 mt-1.5">
            {maxStreak === 0 ? '今日から積み上げよう！' :
             maxStreak < 7 ? `あと${7 - maxStreak}日で1週間達成！` :
             maxStreak < 14 ? `あと${14 - maxStreak}日で2週間達成！` :
             maxStreak < 30 ? `あと${30 - maxStreak}日で30日マスター！` :
             `すごい、${maxStreak}日つづいてる！`}
          </div>
        </div>
      </div>

      {/* Today's quote */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(211,32,39,0.12), rgba(10,10,10,0.4))',
          border: '1px solid rgba(211,32,39,0.2)',
        }}
      >
        <p className="font-display text-[10px] tracking-[3px] text-kings-redBright font-bold mb-1">
          TODAY'S QUOTE
        </p>
        <p className="text-base font-bold text-kings-bone">"{quote}"</p>
      </div>

      {/* Today's menu */}
      <div>
        <SectionTitle english="TODAY'S MENU">きょうの練習</SectionTitle>
        <Card onClick={() => onGo('training')}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block bg-kings-red text-kings-bone font-display text-[10px] tracking-[2px] font-bold px-2 py-0.5 rounded">
                  {todayMenu.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{todayMenu.emoji}</span>
                <span className="font-bold text-lg text-kings-bone">
                  {todayMenu.exercises.length}種目 / やく{todayMenu.duration}分
                </span>
              </div>
              <p className="text-xs text-kings-boneDim mt-1">{todayMenu.message}</p>
            </div>
            <span className="text-2xl text-kings-boneDim">›</span>
          </div>
          {todayLog?.training_done && (
            <div className="mt-3 text-sm font-bold text-success-500 flex items-center gap-1">
              <span>✓</span>今日はもう終わった!
            </div>
          )}
        </Card>
      </div>

      {/* Today's record */}
      <div>
        <SectionTitle english="RECORD">今日のきろく</SectionTitle>
        <Card onClick={() => onGo('log')}>
          <div className="flex items-center justify-between">
            <div>
              {todayLog ? (
                <div>
                  <p className="font-bold text-kings-bone flex items-center gap-2">
                    <span className="text-success-500">✓</span>入力ずみ
                  </p>
                  <p className="text-sm text-kings-boneDim mt-1">
                    睡眠 {todayLog.sleep}h / 疲労 {todayLog.fatigue}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-kings-bone">まだ入力してないよ</p>
                  <p className="text-sm text-kings-boneDim mt-1">タップして入力しよう</p>
                </div>
              )}
            </div>
            <span className="text-2xl text-kings-boneDim">›</span>
          </div>
        </Card>
      </div>

      {/* Streaks grid */}
      <div>
        <SectionTitle english="STREAKS">れんぞく記録</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <Card className="!p-3 text-center">
            <div className="text-2xl mb-1">🛌</div>
            <div className="font-num text-3xl text-kings-redBright leading-none">{streakSleep}</div>
            <div className="text-[10px] text-kings-boneDim mt-1 tracking-wider">すいみん</div>
          </Card>
          <Card className="!p-3 text-center">
            <div className="text-2xl mb-1">🍙</div>
            <div className="font-num text-3xl text-kings-gold leading-none">{streakMeal}</div>
            <div className="text-[10px] text-kings-boneDim mt-1 tracking-wider">ごはん</div>
          </Card>
          <Card className="!p-3 text-center">
            <div className="text-2xl mb-1">🏀</div>
            <div className="font-num text-3xl text-success-500 leading-none">{streakTrain}</div>
            <div className="text-[10px] text-kings-boneDim mt-1 tracking-wider">れんしゅう</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
