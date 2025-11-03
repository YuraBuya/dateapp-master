import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  language: 'ko' | 'en'
  notifications: {
    push: boolean
    email: boolean
    sms: boolean
  }
  theme: 'light' | 'dark'
  setLanguage: (language: 'ko' | 'en') => void
  toggleNotification: (type: 'push' | 'email' | 'sms') => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      language: 'ko',
      notifications: {
        push: true,
        email: true,
        sms: false,
      },
      theme: 'light',
      setLanguage: (language) => set({ language }),
      toggleNotification: (type) => set((state) => ({
        notifications: {
          ...state.notifications,
          [type]: !state.notifications[type],
        },
      })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings-storage',
    }
  )
)
