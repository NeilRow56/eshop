'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface LoginFormProps {
  currentUser: any
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
      router.refresh()
    }
  }, [currentUser, router])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        router.push('/')
        router.refresh()
        toast.success('Logged in')
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>
  }

  return (
    <>
      <Heading title="Sign in to E-shop" />
      <hr className=" h-px w-full bg-slate-300" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? 'Loading' : 'log In'}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?
        <Link className="ml-2 text-blue-400 underline" href="/register">
          Sign Up
        </Link>
      </p>
    </>
  )
}

export default LoginForm
