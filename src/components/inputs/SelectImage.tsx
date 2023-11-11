'use client'

import { useDropzone } from 'react-dropzone'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import { useCallback } from 'react'

interface SelectImageProps {
  item?: ImageType
  handleFileChange: (value: File) => void
}

const SelectImage: React.FC<SelectImageProps> = ({
  item,
  handleFileChange,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0])
      }
    },
    [handleFileChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'] },
  })
  return (
    <div
      {...getRootProps()}
      className="border-slate400 flex cursor-pointer items-center justify-center border-2 border-dashed p-2 text-sm font-normal text-slate-400"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here....</p>
      ) : (
        <p>+ {item?.color} Image</p>
      )}
    </div>
  )
}

export default SelectImage
