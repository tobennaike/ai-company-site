export function LogoMark({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract "A" / upward growth mark */}
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-gray-900" />
      <path
        d="M16 6L22.5 22H19.2L17.6 18H14.4L12.8 22H9.5L16 6Z"
        fill="white"
      />
      {/* Growth dot accent */}
      <circle cx="16" cy="11.5" r="1.5" fill="white" opacity="0.5" />
    </svg>
  )
}

export function LogoFull({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <div className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-[-0.02em] text-gray-900">Auxo</span>
        <span className="text-[10px] font-medium tracking-[0.15em] text-gray-400 uppercase">Partners</span>
      </div>
    </div>
  )
}

export function LogoFullFooter({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-7 h-7" />
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-gray-900">Auxo</span>
        <span className="text-[9px] font-medium tracking-[0.15em] text-gray-400 uppercase">Partners</span>
      </div>
    </div>
  )
}
