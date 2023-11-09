import AdminNav from '@/components/admin/AdminNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'e-shop Admin',
  description: 'e-shop Admin Dashboard',
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  )
}

export default AdminLayout
