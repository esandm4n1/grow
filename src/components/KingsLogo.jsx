import logoUrl from '../assets/kings_logo.png'

/**
 * Fukui Kings logo component.
 * Use className to control size. Default respects aspect ratio.
 */
export default function KingsLogo({ className = '', style = {}, ...props }) {
  return (
    <img
      src={logoUrl}
      alt="Fukui Kings"
      className={className}
      style={style}
      {...props}
    />
  )
}

export { logoUrl }
