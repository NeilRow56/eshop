'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

interface CustomCheckboxProps {
  id: string
  label: string
  disabled?: boolean
  register: UseFormRegister<FieldValues>
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="flex w-full flex-row items-center gap-2 ">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  )
}

export default CustomCheckbox
