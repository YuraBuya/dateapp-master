import type { NextApiRequest, NextApiResponse } from 'next'

interface PlanFeature {
  text: string
  included: boolean
}

interface PaymentPlan {
  id: string
  name: string
  price: string
  originalPrice?: string
  period: string
  color: 'pink' | 'mint' | 'purple'
  features: PlanFeature[]
  isPopular?: boolean
  isPremium?: boolean
  description: string
}

const paymentPlans: PaymentPlan[] = [
  {
    id: 'female',
    name: '여성 회원',
    price: '199,000원',
    period: '월',
    color: 'pink',
    isPopular: true,
    description: '여성을 위한 프리미엄 매칭 서비스',
    features: [
      { text: '무제한 매칭 요청', included: true },
      { text: '전문 스타일리스트 상담', included: true },
      { text: '프리미엄 데이트 장소 추천', included: true },
      { text: '24시간 고객 지원', included: true },
      { text: '매칭 성공률 95%', included: true },
      { text: 'VIP 이벤트 초대', included: false }
    ]
  },
  {
    id: 'male',
    name: '남성 회원',
    price: '299,000원',
    period: '월',
    color: 'mint',
    description: '남성을 위한 프리미엄 매칭 서비스',
    features: [
      { text: '무제한 매칭 요청', included: true },
      { text: '전문 이미지 컨설팅', included: true },
      { text: '데이트 코스 기획', included: true },
      { text: '24시간 고객 지원', included: true },
      { text: '프로필 사진 촬영', included: true },
      { text: 'VIP 이벤트 초대', included: false }
    ]
  },
  {
    id: 'black',
    name: 'Black 회원',
    price: '999,000원',
    originalPrice: '1,200,000원',
    period: '월',
    color: 'purple',
    isPremium: true,
    description: '최고급 프리미엄 매칭 서비스',
    features: [
      { text: '무제한 매칭 요청', included: true },
      { text: '전담 매칭 매니저', included: true },
      { text: '럭셔리 데이트 장소 예약', included: true },
      { text: '24시간 전용 컨시어지', included: true },
      { text: '프로필 사진 촬영', included: true },
      { text: 'VIP 이벤트 초대', included: true }
    ]
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: paymentPlans
    })
  } else if (req.method === 'POST') {
    // 결제 처리 시뮬레이션
    const { planId, userId, paymentMethod } = req.body
    
    if (!planId || !userId) {
      return res.status(400).json({
        success: false,
        message: '필수 정보가 누락되었습니다.'
      })
    }
    
    const plan = paymentPlans.find(p => p.id === planId)
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: '존재하지 않는 요금제입니다.'
      })
    }
    
    // 결제 성공 시뮬레이션
    setTimeout(() => {
      res.status(200).json({
        success: true,
        message: '결제가 성공적으로 완료되었습니다.',
        data: {
          transactionId: `txn_${Date.now()}`,
          planId,
          userId,
          amount: plan.price,
          paymentMethod,
          paidAt: new Date().toISOString()
        }
      })
    }, 2000) // 2초 딜레이로 결제 처리 시뮬레이션
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}
