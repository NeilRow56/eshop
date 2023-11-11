interface NullDataProps {
  title: string
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center text-xl md:text-2xl">
      <p className="font-medium">{title}</p>
    </div>
  )
}

export default NullData
