export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
}) {
  const variants = {
    primary: 'bg-kings-red text-kings-bone hover:bg-kings-redBright shadow-lg shadow-kings-red/30',
    secondary: 'bg-kings-card text-kings-bone border border-kings-border hover:bg-kings-cardAlt',
    accent: 'bg-kings-gold text-kings-bg hover:brightness-110',
    success: 'bg-success-500 text-white hover:bg-success-600 shadow-lg shadow-success-500/20',
    danger: 'bg-danger-500 text-white hover:bg-danger-600',
    ghost: 'bg-transparent text-kings-boneDim hover:bg-kings-card',
  }
  const sizes = {
    sm: 'px-4 py-2 text-base',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-xl min-h-[56px]',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-2xl font-black tap-scale
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all tracking-wider
        relative z-10
        ${className}
      `}
    >
      {children}
    </button>
  )
}
