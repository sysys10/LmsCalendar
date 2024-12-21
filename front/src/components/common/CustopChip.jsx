export default function CustomChip({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) {
  const baseStyles = 'rounded-2xl transition-colors'

  const variants = {
    default:
      'bg-white flex flex items-center justify-center gap-2 md:text-sm text-xs',
    outlined: 'border-2 border-gray-700 hover:bg-gray-100 bg-white',
    filled: 'bg-gray-700 text-white hover:bg-gray-800'
  }

  const sizes = {
    none: '',
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
