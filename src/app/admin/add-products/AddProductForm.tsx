'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import CustomCheckbox from '@/components/inputs/CustomCheckbox'
import Input from '@/components/inputs/Input'
import SelectColor from '@/components/inputs/SelectColor'
import TextArea from '@/components/inputs/TextArea'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/Categories'
import { colors } from '@/utils/Colors'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import axios from 'axios'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

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

    // upload images to firebase
    setIsLoading(true)
    let uploadedImages: UploadedImageType[] = []

    if (!data.category) {
      setIsLoading(false)
      return toast.error('Please select a category')
    }

    if (!data.images || data.length === 0) {
      setIsLoading(false)
      return toast.error('Please add at least one image')
    }

    const handleImageUploads = async () => {
      toast('Creating product, please wait...')
      try {
        for (const item of data.images) {
          if (item.image) {
            const filename = new Date().getTime() + '-' + item.image.name
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${filename}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  console.log('Upload is ' + progress + '% done')
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused')
                      break
                    case 'running':
                      console.log('Upload is running')
                      break
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log('Error uploading image', error)
                  reject(error)
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      })
                      console.log('File available at', downloadURL)
                      resolve()
                    })
                    .catch((error: any) => {
                      console.log('Error downloading the URL', error)
                      reject(error)
                    })
                }
              )
            })
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log('Error handling image uploads', error)
        return toast.error('Error handling image uploads')
      }
    }

    //save product to mongodbå
    await handleImageUploads()
    const productData = { ...data, images: uploadedImages }
    axios
      .post('/api/product', productData)
      .then(() => {
        toast.success('Product created')
        setIsProductCreated(true)
        router.refresh()
      })
      .finally(() => {
        setIsLoading(false)
      })
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
