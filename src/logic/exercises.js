/**
 * トレーニング種目マスター
 *
 * 設計方針:
 * - 小学6年生(成長期)に安全な種目のみ
 * - 高重量・高負荷種目は除外
 * - 神経系(敏捷性)、体幹、柔軟性を重視
 * - 自重トレーニングのみ
 */

export const EXERCISES = {
  // 🌀 ストレッチ・回復系(毎日OK)
  stretch: [
    { id: 'hip_stretch', name: '股関節ストレッチ', reps: '左右30秒', emoji: '🧘', note: '痛みの手前まで。ゆっくり息を吐きながら。' },
    { id: 'ham_stretch', name: 'ハムストリング伸ばし', reps: '左右30秒', emoji: '🧘', note: '前に倒れすぎない。' },
    { id: 'shoulder_roll', name: '肩甲骨回し', reps: '前後10回ずつ', emoji: '🔄', note: '大きく回す。' },
    { id: 'ankle_roll', name: '足首回し', reps: '左右20回', emoji: '🦶', note: 'ぐるぐる内外。' },
    { id: 'cat_stretch', name: '猫のポーズ', reps: '10回ゆっくり', emoji: '🐱', note: '背中を丸めたり反らしたり。' },
  ],

  // 💪 体幹(毎日OK、軽負荷)
  core: [
    { id: 'plank', name: 'プランク', reps: '20〜30秒 × 2セット', emoji: '🏋️', note: '腰を反らさない。まっすぐ板のように。' },
    { id: 'side_plank', name: 'サイドプランク', reps: '左右15秒 × 2', emoji: '🏋️', note: '横からまっすぐ。' },
    { id: 'dead_bug', name: 'デッドバグ', reps: '左右10回', emoji: '🪲', note: '手と反対の足をゆっくり。' },
    { id: 'bird_dog', name: 'バードドッグ', reps: '左右10回', emoji: '🐕', note: '対角の手足を伸ばしてキープ。' },
  ],

  core_light: [
    { id: 'plank_short', name: 'プランク(短め)', reps: '15秒 × 2', emoji: '🏋️', note: '今日は短く。' },
    { id: 'ball_squeeze', name: 'お腹でボール挟み', reps: '15秒キープ', emoji: '⚽', note: '膝の間にボール(なければクッション)。' },
  ],

  // ⚡ 敏捷性(ゴールデンエイジ、毎日OK)
  agility: [
    { id: 'ladder', name: 'ラダー(いるいる)', reps: '2往復', emoji: '🪜', note: 'ラダーなければ、床に線を引いてOK。' },
    { id: 'side_step', name: 'サイドステップ', reps: '左右10回 × 2', emoji: '↔️', note: '低い姿勢でシャッシャッ。' },
    { id: 'cone_dash', name: '切り返しダッシュ', reps: '5m × 4本', emoji: '🔺', note: 'コーン無ければ目印でOK。' },
    { id: 'reaction_step', name: '反応ステップ', reps: '30秒', emoji: '👆', note: '誰かの合図で動く。一人なら音楽で。' },
  ],

  agility_light: [
    { id: 'ladder_walk', name: 'ラダー歩き(ゆっくり)', reps: '1往復', emoji: '🪜', note: 'ゆっくりでOK。' },
    { id: 'slow_side_step', name: 'ゆっくりサイドステップ', reps: '左右8回', emoji: '↔️', note: '無理せず。' },
  ],

  // 🦘 ジャンプ系(痛みなし & 2日連続NG)
  jump_light: [
    { id: 'jump_in_place', name: 'その場ジャンプ', reps: '10回 × 2', emoji: '🦘', note: '軽く、音立てず。着地は膝を柔らかく。' },
    { id: 'rope', name: '縄跳び(前まわし)', reps: '30秒 × 2', emoji: '🪢', note: '軽やかに。' },
    { id: 'hop', name: 'ケンケン', reps: '左右10回', emoji: '🦘', note: '片足ずつ。' },
    { id: 'box_jump_low', name: 'ボックスジャンプ(低め)', reps: '5回 × 2', emoji: '📦', note: '低い台でOK。着地を優先。' },
  ],

  // 🏋️ 基礎筋力(自重のみ)
  strength: [
    { id: 'squat', name: 'スクワット', reps: '10〜15回 × 2', emoji: '🦵', note: '膝が内に入らないように。つま先と同じ向き。' },
    { id: 'pushup', name: '腕立て伏せ', reps: '8〜10回 × 2', emoji: '💪', note: 'キツければ膝つきでOK。' },
    { id: 'lunge', name: 'ランジ(その場)', reps: '左右8回', emoji: '🚶', note: '前の膝が90度になる位置で。' },
    { id: 'hip_lift', name: 'ヒップリフト', reps: '10回 × 2', emoji: '🍑', note: 'お尻を上げる。' },
  ],

  // 🛌 完全回復
  recovery: [
    { id: 'breathing', name: '深呼吸ストレッチ', reps: '5分', emoji: '😌', note: '寝る前にもおすすめ。' },
    { id: 'gentle_stretch', name: 'ごろごろストレッチ', reps: '3分', emoji: '🛌', note: '床に寝たまま、のんびり。' },
    { id: 'child_pose', name: 'チャイルドポーズ', reps: '1分', emoji: '🧘', note: '正座して前に倒れる。' },
  ],
}

/**
 * 共通のNG/注意事項(全メニューに表示)
 */
export const GLOBAL_NG = [
  '重いバーベル・ダンベルはNG',
  '痛みがあれば途中でもやめる',
  '「もう1セット」の追い込みはしない',
  '1回20分をこえたら今日はおわり',
]

/**
 * ランダムに1つピック(既に選ばれたidは避ける)
 */
export function pickFrom(list, excludeIds = []) {
  const candidates = list.filter(e => !excludeIds.includes(e.id))
  if (candidates.length === 0) return list[0]
  return candidates[Math.floor(Math.random() * candidates.length)]
}
