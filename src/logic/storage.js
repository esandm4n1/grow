import { useState, useEffect } from 'react'

const PREFIX = 'grow_'

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (e) {
    console.error('storage.getItem', e)
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.error('storage.setItem', e)
  }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key)
}

/**
 * localStorage と同期する useState
 */
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => getItem(key, initialValue))

  useEffect(() => {
    setItem(key, state)
  }, [key, state])

  return [state, setState]
}

/**
 * 全データクリア(デバッグ用)
 */
export function clearAll() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k))
}
