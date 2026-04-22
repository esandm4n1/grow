// 日付を YYYY-MM-DD 形式に
export function toDateStr(date = new Date()) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 今日の日付
export function today() {
  return toDateStr()
}

// 日数差(b - a、正の整数で返す)
export function daysDiff(aStr, bStr) {
  const a = new Date(aStr)
  const b = new Date(bStr)
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}

// N日前の日付
export function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toDateStr(d)
}

// 表示用 YYYY年M月D日
export function formatJapanese(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// 曜日
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
export function getWeekday(dateStr = today()) {
  return WEEKDAYS[new Date(dateStr).getDay()]
}
