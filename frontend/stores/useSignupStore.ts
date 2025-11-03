import { create } from 'zustand'

interface SignupData {
  // Step 1: 기본 정보
  name: string
  phone: string
  gender: 'male' | 'female' | ''
  isVerified: boolean
  
  // Step 2: 자기소개
  job: string
  education: string
  hobbies: string[]
  personality: string[]
  idealType: string
  profilePhoto: File | null
  
  // Step 3: 서류 업로드
  documents: {
    idCard: File | null
    marriageCert: File | null
    graduationCert: File | null
    employmentCert: File | null
    familyCert: File | null
  }
}

interface PaymentData {
  planId: string
  planName: string
  price: number
  duration: string
  features: string[]
  paymentMethod: 'credit' | 'bank' | 'kakao' | 'naver' | null
}

interface SignupState {
  data: SignupData
  paymentData: PaymentData | null
  currentStep: number
  updateData: (updates: Partial<SignupData>) => void
  setPaymentData: (data: PaymentData) => void
  updateDocuments: (documents: Partial<SignupData['documents']>) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
  getStepValidation: (step: number) => boolean
  completeSignup: () => void
}

const initialData: SignupData = {
  name: '',
  phone: '',
  gender: '',
  isVerified: false,
  job: '',
  education: '',
  hobbies: [],
  personality: [],
  idealType: '',
  profilePhoto: null,
  documents: {
    idCard: null,
    marriageCert: null,
    graduationCert: null,
    employmentCert: null,
    familyCert: null
  }
}

export const useSignupStore = create<SignupState>((set, get) => ({
  data: initialData,
  paymentData: null,
  currentStep: 1,
  
  updateData: (updates) => set((state) => ({ 
    data: { ...state.data, ...updates } 
  })),
  
  setPaymentData: (data) => set({ paymentData: data }),
  
  updateDocuments: (documents) =>
    set((state) => ({
      data: {
        ...state.data,
        documents: { ...state.data.documents, ...documents }
      }
    })),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 3) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  
  reset: () => set({ 
    data: initialData, 
    paymentData: null,
    currentStep: 1 
  }),
  
  getStepValidation: (step) => {
    const { data } = get()
    
    switch (step) {
      case 1:
        return !!(data.name && data.phone && data.gender && data.isVerified)
      case 2:
        return !!(data.job && data.education && data.hobbies.length > 0 && data.personality.length > 0 && data.idealType)
      case 3:
        const { documents } = data
        return !!(documents.idCard && documents.marriageCert && documents.graduationCert && documents.employmentCert && documents.familyCert)
      default:
        return false
    }
  },

  completeSignup: () => {
    const { data, paymentData } = get()
    console.log('=== 회원가입 완료 ===')
    console.log('선택한 요금제:', paymentData)
    console.log('가입 정보:', data)
    console.log('==================')
  }
}))
