'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import CustomCheckbox from '@/components/inputs/CustomCheckbox'
import Input from '@/components/inputs/Input'
import SelectColor from '@/components/inputs/SelectColor'
import TextArea from '@/components/inputs/TextArea'
import { categories } from '@/utils/Categories'
import { colors } from '@/utils/Colors'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export type ImageType = {
  color: string
  colorCode: string
  image: File | null
}
export type UploadedImageType = {
  color: string
  colorCode: string
  image: string
}

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
    },
  })

  useEffect(() => {
    setCustomValue('images', images)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product Date:', data)
  }

  const category = watch('category')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }
      return [...prev, value]
    })
  }, [])
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color !== value.color)
        return filteredImages
      }

      return prev
    })
  }, [])

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid max-h-[50vh] grid-cols-2 gap-3  overflow-y-auto md:grid-cols-3">
          {categories.map((item) => {
            if (item.label === 'All') {
              return null
            }
            return (
              <div key={item.icon} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
                />
              </div>
            )
          })}
        </div>
        <div className="flex w-full flex-col flex-wrap gap-4">
          <div>
            <div className="font-bold">
              Select the available produt colors and upload their images.
            </div>
            <div className="text-sm">
              You must upload an image for each selected coor otherwise your
              color selection will be ignored.
            </div>
          </div>
          <div className="grid grid-cols-2">
            {colors.map((item) => {
              return (
                <div key={item.color}>
                  <SelectColor
                    item={item}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageFromState}
                    isProductCreated={isProductCreated}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <Button
          label={isLoading ? 'Loading' : 'Add Product'}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  )
}

export default AddProductForm
