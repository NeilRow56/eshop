'use client'

import { Product } from '@prisma/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md'
import ActionBtn from '@/components/ActionBtn'
import { useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/libs/firebase'

interface ManageProductsClientProps {
  products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter()
  const storage = getStorage(firebaseApp)
  let rows: any = []

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      }
    })
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price(GBP)',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        )
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 120,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row.inStock === true ? (
              <Status
                text="In Stock"
                icon={MdDone}
                bg="bg-teal-100"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Out of Stock"
                icon={MdClose}
                bg="bg-rose-100"
                color="text-rose-700"
              />
            )}
          </div>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex w-full justify-between gap-4">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock)
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images)
              }}
            />
            <ActionBtn icon={MdRemoveRedEye} onClick={() => {}} />
          </div>
        )
      },
    },
  ]

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put('/api/product', {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          toast.success('Product status changed')
          router.refresh()
        })
        .catch((err: any) => {
          toast.error('Oops! Something went wrong')
          console.log(err)
        })
    },
    [router]
  )

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast('Deleting product, please wait...')
      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image)
              await deleteObject(imageRef)
              console.log('Image deleted', item.image)
            }
          }
        } catch (error) {
          return console.log('Deleting images error', error)
        }
      }
      await handleImageDelete()

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success('Product deleted')
          router.refresh()
        })
        .catch((err: any) => {
          toast.error('Oops! Something went wrong')
          console.log(err)
        })
    },
    [storage, router]
  )
  return (
    <div className="m-auto max-w-[1150px] text-xl">
      <div className="mb-4 mt-4">
        <Heading title="Manage Products" />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]} // Amend number of rows as required
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default ManageProductsClient
