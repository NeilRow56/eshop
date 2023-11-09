import { IconType } from 'react-icons'

interface AdminNavItemProps {
  selected?: boolean
  icon: IconType
  label: string
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`hover:text-slate-80 flex cursor-pointer items-center justify-center gap-1 pb-1 text-center transition ${
        selected
          ? 'border-b-2 border-slate-800 text-slate-800 '
          : 'border-transparent text-slate-500'
      } `}
    >
      <Icon size={20} />
      <div className="break-normal text-center text-sm font-medium">
        {label}
      </div>
    </div>
  )
}

export default AdminNavItem
