import { EXERCISES, GLOBAL_NG, pickFrom } from './exercises'
import { daysDiff, today } from '../utils/date'

/**
 * ジャンプを含むかどうかの判定
 */
function isJumpMenu(log) {
  if (!log || !log.menu_type) return false
  return ['通常トレーニング', 'ジャンプ強化'].includes(log.menu_type)
}

/**
 * 2日連続でジャンプしたかチェック
 */
function isTwoDaysJumpInARow(logs) {
  if (!logs || logs.length < 2) return false
  // 昨日と一昨日をチェック
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dayBefore = new Date()
  dayBefore.setDate(dayBefore.getDate() - 2)
  
  const y = yesterday.toISOString().slice(0, 10)
  const db = dayBefore.toISOString().slice(0, 10)
  
  const yesterdayLog = logs.find(l => l.date === y)
  const dayBeforeLog = logs.find(l => l.date === db)
  
  return isJumpMenu(yesterdayLog) && isJumpMenu(dayBeforeLog)
}

/**
 * 🌟 今日のメニューを自動生成する
 *
 * @param {Object} input
 * @param {number} input.fatigue - 疲労度 1〜5
 * @param {number} input.sleep - 睡眠時間(時間)
 * @param {number} input.kneePain - 膝痛 0〜5
 * @param {number} input.anklePain - 足首痛 0〜5
 * @param {Array} input.recentLogs - 直近の日次ログ配列
 * @param {string|null} input.gameDate - 試合日 YYYY-MM-DD または null
 * @returns {Object} メニュー
 */
export function generateTodayMenu(input) {
  const {
    fatigue = 3,
    sleep = 8,
    kneePain = 0,
    anklePain = 0,
    recentLogs = [],
    gameDate = null,
  } = input

  // 試合までの日数
  const daysUntilGame = gameDate ? daysDiff(today(), gameDate) : null

  // 判定ブロック
  const blocks = {
    noJump: kneePain >= 2 || anklePain >= 2,
    lowLoad: fatigue >= 4 || sleep < 7,
    recoveryOnly: isTwoDaysJumpInARow(recentLogs),
    gameDayMinus1: daysUntilGame === 1,
    gameDay: daysUntilGame === 0,
    restDay: sleep < 5 || fatigue === 5,
  }

  // ① 試合当日 → 休養
  if (blocks.gameDay) {
    return {
      type: '試合の日',
      duration: 5,
      exercises: [
        pickFrom(EXERCISES.stretch),
        pickFrom(EXERCISES.stretch, ['hip_stretch']),
      ],
      ngList: [
        '試合前にハードな練習NG',
        '新しいストレッチはやらない',
        '水分しっかり',
      ],
      message: '試合がんばって!🏀 軽くほぐすだけでOK。',
      emoji: '🏀',
      color: 'accent',
    }
  }

  // ② 完全休養(睡眠不足 or 疲労MAX)
  if (blocks.restDay) {
    return {
      type: '完全休養',
      duration: 10,
      exercises: [
        pickFrom(EXERCISES.recovery),
        pickFrom(EXERCISES.recovery, ['breathing']),
      ],
      ngList: [
        '今日はトレーニングしない',
        '早めに寝る',
        '水分・食事しっかり',
      ],
      message: '今日は身体を休ませる日。回復が一番。',
      emoji: '🛌',
      color: 'primary',
    }
  }

  // ③ 試合前日 → 軽い刺激
  if (blocks.gameDayMinus1) {
    const list = [
      pickFrom(EXERCISES.agility_light),
      pickFrom(EXERCISES.stretch),
      pickFrom(EXERCISES.stretch, [list => list[0]?.id]),
    ]
    if (!blocks.noJump) {
      list.splice(1, 0, { ...pickFrom(EXERCISES.jump_light), reps: '軽く5回だけ' })
    }
    return {
      type: '試合前日',
      duration: 10,
      exercises: list,
      ngList: [
        '追い込みトレーニングNG',
        '夜ふかしNG',
        '新しいことは今日やらない',
      ],
      message: '明日の試合に備えて、軽く身体を起こすだけ。',
      emoji: '🎯',
      color: 'accent',
    }
  }

  // ④ 低負荷モード
  if (blocks.lowLoad || blocks.recoveryOnly) {
    const reason = blocks.lowLoad
      ? (sleep < 7 ? '睡眠が足りないから' : '疲れが残ってるから')
      : '2日続けてジャンプしたから'
    return {
      type: blocks.recoveryOnly ? '積極的回復' : '回復重視',
      duration: 15,
      exercises: [
        pickFrom(EXERCISES.stretch),
        pickFrom(EXERCISES.core_light),
        pickFrom(EXERCISES.agility_light),
        pickFrom(EXERCISES.stretch, ['hip_stretch']),
      ],
      ngList: [
        'ジャンプ系は今日お休み',
        '筋トレ回数を増やすのはNG',
        '15分で終わる',
      ],
      message: `${reason}、今日はゆっくり。ムリは逆効果。`,
      emoji: '🌱',
      color: 'success',
    }
  }

  // ⑤ 通常モード(バランス型)
  const menu = []
  const usedIds = []

  // 体幹(毎日OK)
  const core = pickFrom(EXERCISES.core)
  menu.push(core)
  usedIds.push(core.id)

  // 敏捷性
  const agility = pickFrom(EXERCISES.agility, usedIds)
  menu.push(agility)
  usedIds.push(agility.id)

  // ジャンプ(許可時のみ)
  let hasJump = false
  if (!blocks.noJump) {
    const jump = pickFrom(EXERCISES.jump_light, usedIds)
    menu.push(jump)
    usedIds.push(jump.id)
    hasJump = true
  } else {
    // 代わりに追加の体幹
    const core2 = pickFrom(EXERCISES.core, usedIds)
    menu.push(core2)
    usedIds.push(core2.id)
  }

  // 基礎筋力
  const strength = pickFrom(EXERCISES.strength, usedIds)
  menu.push(strength)
  usedIds.push(strength.id)

  // 仕上げストレッチ
  const stretch = pickFrom(EXERCISES.stretch, usedIds)
  menu.push(stretch)

  const type = hasJump ? '通常トレーニング' : '痛みケアモード'
  const message = blocks.noJump
    ? '膝か足首が気になるから、ジャンプはお休み。'
    : '今日は元気!バランスよく動こう。'

  return {
    type,
    duration: 20,
    exercises: menu,
    ngList: [
      '20分をこえたら今日はおわり',
      '痛みが出たらすぐ中止',
      '「もう1セット」追い込みNG',
    ],
    message,
    emoji: hasJump ? '💪' : '🛡️',
    color: 'primary',
  }
}

/**
 * 試合日までの日数メッセージ
 */
export function getGameMessage(gameDate) {
  if (!gameDate) return null
  const days = daysDiff(today(), gameDate)
  if (days < 0) return null
  if (days === 0) return { text: '今日は試合!', emoji: '🏀' }
  if (days === 1) return { text: '明日は試合!', emoji: '🎯' }
  if (days <= 7) return { text: `試合まで あと${days}日`, emoji: '📅' }
  return { text: `試合まで ${days}日`, emoji: '📅' }
}
