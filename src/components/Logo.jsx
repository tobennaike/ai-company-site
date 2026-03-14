export function LogoMark({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-gray-900" />
      {/* Minimal upward arrow / growth symbol */}
      <path
        d="M16 8L22 18H18.5V24H13.5V18H10L16 8Z"
        fill="white"
      />
    </svg>
  )
}

export function LogoFull({ className = "" }) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="text-[20px] font-bold tracking-[-0.03em] text-gray-900">Auxo</span>
      <span className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Solutions</span>
    </div>
  )
}

export function LogoFullFooter({ className = "" }) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-gray-900">Auxo</span>
      <span className="text-[9px] font-medium tracking-[0.15em] text-gray-400 uppercase">Solutions</span>
    </div>
  )
}
