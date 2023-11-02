'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={type}
        type=""
        className={`p--4 disabled: disabled: peer w-full cursor-not-allowed rounded-md border-2 bg-white pt-6 font-light opacity-70 outline-none transition
         ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
         ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}`}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform cursor-text duration-150  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-4 peer-focus:scale-75"
      >
        {label}
      </label>
    </div>
  )
}

export default Input
