import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { 
  FileText, 
  Upload, 
  Check, 
  X, 
  ArrowRight,
  Shield,
  AlertCircle
} from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useSignupStore } from '@/stores/useSignupStore'
import { useToast } from '@/hooks/useToast'

interface DocumentUpload {
  id: keyof typeof documentTypes
  file: File | null
  status: 'pending' | 'uploaded' | 'error'
}

const documentTypes = {
  idCard: {
    name: '신분증',
    description: '주민등록증 또는 운전면허증',
    required: true
  },
  marriageCert: {
    name: '혼인관계증명서',
    description: '미혼인 경우 혼인관계증명서',
    required: true
  },
  graduationCert: {
    name: '졸업증명서',
    description: '최종학력 졸업증명서',
    required: true
  },
  employmentCert: {
    name: '재직증명서',
    description: '현재 직장 재직증명서',
    required: true
  },
  familyCert: {
    name: '가족관계증명서',
    description: '가족관계를 확인할 수 있는 서류',
    required: true
  }
}

export default function SignupStep3() {
  const router = useRouter()
  const { data, updateDocuments, nextStep } = useSignupStore()
  const { showToast } = useToast()
  
  const [documents, setDocuments] = useState<DocumentUpload[]>(
    Object.keys(documentTypes).map(id => ({
      id: id as keyof typeof documentTypes,
      file: data.documents[id as keyof typeof documentTypes] || null,
      status: data.documents[id as keyof typeof documentTypes] ? 'uploaded' : 'pending'
    }))
  )

  const handleFileUpload = (documentId: keyof typeof documentTypes, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast('파일 크기는 10MB 이하여야 합니다', 'error')
      return
    }

    // 파일 형식 체크
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      showToast('JPG, PNG, PDF 파일만 업로드 가능합니다', 'error')
      return
    }

    // 문서 상태 업데이트
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, file, status: 'uploaded' as const }
          : doc
      )
    )

    // Zustand 스토어 업데이트
    updateDocuments({ [documentId]: file })
    
    showToast(`${documentTypes[documentId].name}이 업로드되었습니다`, 'success')
  }

  const handleRemoveFile = (documentId: keyof typeof documentTypes) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, file: null, status: 'pending' as const }
          : doc
      )
    )

    updateDocuments({ [documentId]: null })
    showToast(`${documentTypes[documentId].name}이 제거되었습니다`, 'info')
  }

  const allDocumentsUploaded = documents.every(doc => doc.status === 'uploaded')

  const handleSubmit = () => {
    if (!allDocumentsUploaded) {
      showToast('모든 필수 서류를 업로드해주세요', 'error')
      return
    }

    nextStep()
    router.push('/signup/done')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
      <PageHeader 
        title="회원가입 (3/3)"
        showBack={true}
        onBack={() => router.back()}
      />
      
      <div className="px-4 pb-20 pt-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            필수 서류 업로드 📄
          </h1>
          <p className="text-gray-600 leading-relaxed">
            안전한 매칭을 위해 신원 확인이 필요합니다
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-pink-600">STEP 3</span>
            <span className="text-sm text-gray-500">서류 업로드</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full w-full"></div>
          </div>
        </motion.div>

        {/* 업로드 진행률 */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">업로드 진행률</h3>
              <p className="text-sm text-gray-600">
                {documents.filter(doc => doc.status === 'uploaded').length} / {documents.length} 완료
              </p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(documents.filter(doc => doc.status === 'uploaded').length / documents.length) * 100}%` 
              }}
            />
          </div>
        </motion.div>

        {/* 서류 업로드 리스트 */}
        <div className="space-y-4">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              className={`
                bg-white rounded-2xl p-6 border-2 shadow-sm transition-all duration-200
                ${document.status === 'uploaded' 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 hover:border-pink-300'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${document.status === 'uploaded' 
                    ? 'bg-emerald-500' 
                    : 'bg-gray-100'
                  }
                `}>
                  {document.status === 'uploaded' ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <FileText className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {documentTypes[document.id].name}
                    </h4>
                    {documentTypes[document.id].required && (
                      <span className="text-red-500 text-sm">*</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {documentTypes[document.id].description}
                  </p>
                  
                  {document.status === 'uploaded' && document.file ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-100 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">
                          {document.file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(document.id)}
                        className="p-1 hover:bg-emerald-200 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-emerald-600" />
                      </button>
                    </div>
                  ) : (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-200">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-600">
                          파일 선택 또는 드래그하여 업로드
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, PDF (최대 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(document.id, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 주의사항 */}
        <motion.div
          className="bg-amber-50 rounded-xl p-4 mt-6 border border-amber-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-2">📋 서류 업로드 안내</h3>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• 모든 서류는 최근 3개월 이내 발급된 것이어야 합니다</li>
                <li>• 개인정보는 안전하게 암호화되어 보관됩니다</li>
                <li>• 허위 서류 제출 시 서비스 이용이 제한될 수 있습니다</li>
                <li>• 서류 검토는 영업일 기준 1-2일 소요됩니다</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 가입 완료 버튼 */}
        <motion.button
          onClick={handleSubmit}
          disabled={!allDocumentsUploaded}
          className={`
            w-full h-14 mt-8 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
            ${allDocumentsUploaded
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          whileHover={allDocumentsUploaded ? { scale: 1.02 } : {}}
          whileTap={allDocumentsUploaded ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          가입 완료
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}