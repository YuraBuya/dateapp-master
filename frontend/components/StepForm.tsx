import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface StepFormProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  onNext?: () => void
  onPrev?: () => void
  nextLabel?: string
  prevLabel?: string
  isNextDisabled?: boolean
  showProgress?: boolean
}

export default function StepForm({
  children,
  currentStep,
  totalSteps,
  stepTitles,
  onNext,
  onPrev,
  nextLabel = '다음',
  prevLabel = '이전',
  isNextDisabled = false,
  showProgress = true,
}: StepFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
      {/* Progress Steps */}
      {showProgress && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100">
          <div className="px-4 py-4 max-w-screen-sm mx-auto">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1
                const isCompleted = stepNumber < currentStep
                const isCurrent = stepNumber === currentStep
                
                return (
                  <div key={stepNumber} className="flex items-center">
                    <motion.div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                        ${isCompleted 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                          : isCurrent
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                        }
                      `}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        stepNumber
                      )}
                    </motion.div>
                    
                    {stepNumber < totalSteps && (
                      <div className={`
                        w-8 h-0.5 mx-2
                        ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {stepTitles[currentStep - 1]}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {currentStep} / {totalSteps}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <motion.div
        key={currentStep}
        className="px-4 py-6 max-w-screen-sm mx-auto"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 p-4">
        <div className="max-w-screen-sm mx-auto">
          <div className="flex gap-3">
            {currentStep > 1 && onPrev && (
              <motion.button
                onClick={onPrev}
                className="flex-1 h-12 px-6 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {prevLabel}
              </motion.button>
            )}
            
            {onNext && (
              <motion.button
                onClick={onNext}
                disabled={isNextDisabled}
                className={`
                  flex-1 h-12 px-6 rounded-full font-medium transition-all duration-300
                  ${isNextDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl'
                  }
                `}
                whileHover={!isNextDisabled ? { scale: 1.02 } : {}}
                whileTap={!isNextDisabled ? { scale: 0.98 } : {}}
              >
                {nextLabel}
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Safe area */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  )
}
