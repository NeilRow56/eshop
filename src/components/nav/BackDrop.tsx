interface BackDropProps {
  onClick: () => void
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 z-20 h-screen w-screen bg-slate-200 opacity-50"
    ></div>
  )
}

export default BackDrop
