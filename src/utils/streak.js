import { today, daysAgo } from './date'

/**
 * logs配列から条件を満たす連続日数を計算する
 * 今日から過去に遡って、条件を満たし続けた日数を返す
 * @param {Array} logs - 日次記録の配列 [{date, ...}]
 * @param {Function} predicate - 条件関数 (log) => boolean
 * @returns {number} 連続日数
 */
export function calcStreak(logs, predicate) {
  if (!logs || logs.length === 0) return 0

  const logMap = new Map(logs.map(l => [l.date, l]))
  let streak = 0
  for (let i = 0; i < 365; i++) {  // 最大1年
    const dateStr = daysAgo(i)
    const log = logMap.get(dateStr)

    // 今日のログがまだない場合は0日目としてスキップ(連続破らない)
    if (i === 0 && !log) continue

    if (log && predicate(log)) {
      streak++
    } else {
      break
    }
  }
  return streak
}

// プリセットの条件関数
export const sleepOK = (log) => log.sleep >= 8
export const mealOK = (log) => log.meals && log.meals.breakfast && log.meals.lunch && log.meals.dinner
export const trainingDone = (log) => log.training_done === true
