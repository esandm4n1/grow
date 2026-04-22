import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pagesで公開する場合、リポジトリ名を base に指定
// 例: https://username.github.io/grow/ なら base: '/grow/'
// 独自ドメインやルート公開なら base: '/'
export default defineConfig({
  plugins: [react()],
  base: './',  // 相対パスで動くように(ローカルファイル開いても動く)
})
