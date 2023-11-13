'use client'

import { IconType } from 'react-icons'

interface ActionBtnProps {
  icon: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[30px] w-[40px] cursor-pointer items-center justify-center rounded border border-slate-400 text-slate-700 ${
        disabled && 'opacity50 cursor-not-allowed '
      }`}
    >
      <Icon size={18} />
    </button>
  )
}

export default ActionBtn
