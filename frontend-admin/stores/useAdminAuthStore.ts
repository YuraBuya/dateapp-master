import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AdminUser, AdminPermission } from '../types/admin'

interface AdminAuthState {
  admin: AdminUser | null
  isAuthenticated: boolean
  permissions: AdminPermission[]
  token: string | null
  sessionExpiry: number | null
  signIn: (admin: AdminUser, token: string) => void
  signOut: () => void
  updateAdmin: (updates: Partial<AdminUser>) => void
  hasPermission: (resource: string, action: string) => boolean
  checkRole: (requiredRole: 'admin' | 'super_admin') => boolean
  isSessionValid: () => boolean
  refreshSession: () => Promise<boolean>
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      permissions: [],
      token: null,
      sessionExpiry: null,
      
      signIn: (admin, token) => {
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        set({ 
          admin, 
          isAuthenticated: true,
          permissions: admin.permissions,
          token,
          sessionExpiry: expiryTime
        })
      },
      
      signOut: () => set({ 
        admin: null, 
        isAuthenticated: false,
        permissions: [],
        token: null,
        sessionExpiry: null
      }),
      
      updateAdmin: (updates) => {
        const currentAdmin = get().admin
        if (currentAdmin) {
          const updatedAdmin = { ...currentAdmin, ...updates }
          set({ admin: updatedAdmin })
        }
      },
      
      hasPermission: (resource, action) => {
        const { permissions, admin } = get()
        
        // Super admin has all permissions
        if (admin?.role === 'super_admin') return true
        
        return permissions.some(
          permission => 
            permission.resource === resource && 
            permission.actions.includes(action as any)
        )
      },
      
      checkRole: (requiredRole) => {
        const { admin } = get()
        if (!admin) return false
        
        if (requiredRole === 'admin') {
          return admin.role === 'admin' || admin.role === 'super_admin'
        }
        
        return admin.role === requiredRole
      },

      isSessionValid: () => {
        const { sessionExpiry, isAuthenticated } = get()
        if (!isAuthenticated || !sessionExpiry) return false
        return Date.now() < sessionExpiry
      },

      refreshSession: async () => {
        const { token, admin } = get()
        if (!token || !admin) return false

        try {
          const response = await fetch('/api/admin/refresh', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const { token: newToken } = await response.json()
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000)
            set({ 
              token: newToken,
              sessionExpiry: expiryTime
            })
            return true
          }
          
          return false
        } catch {
          return false
        }
      }
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions,
        token: state.token,
        sessionExpiry: state.sessionExpiry
      })
    }
  )
)