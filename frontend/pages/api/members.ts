import type { NextApiRequest, NextApiResponse } from 'next'

interface Member {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  occupation: string
  education: string
  location: string
  profileImage: string
  membershipType: 'female' | 'male' | 'black'
  isOnline: boolean
  lastSeen: string
}

const dummyMembers: Member[] = [
  {
    id: '1',
    name: '김미소',
    age: 28,
    gender: 'female',
    occupation: '마케팅 전문가',
    education: '연세대학교',
    location: '강남구',
    profileImage: '/api/placeholder/300/400',
    membershipType: 'female',
    isOnline: true,
    lastSeen: '방금 전'
  },
  {
    id: '2',
    name: '박준호',
    age: 32,
    gender: 'male',
    occupation: '소프트웨어 엔지니어',
    education: '서울대학교',
    location: '서초구',
    profileImage: '/api/placeholder/300/400',
    membershipType: 'male',
    isOnline: false,
    lastSeen: '1시간 전'
  },
  {
    id: '3',
    name: '이수정',
    age: 29,
    gender: 'female',
    occupation: '의사',
    education: '고려대학교',
    location: '송파구',
    profileImage: '/api/placeholder/300/400',
    membershipType: 'black',
    isOnline: true,
    lastSeen: '방금 전'
  },
  {
    id: '4',
    name: '최민석',
    age: 35,
    gender: 'male',
    occupation: '변호사',
    education: '서울대학교',
    location: '강남구',
    profileImage: '/api/placeholder/300/400',
    membershipType: 'black',
    isOnline: false,
    lastSeen: '30분 전'
  },
  {
    id: '5',
    name: '한예린',
    age: 26,
    gender: 'female',
    occupation: '그래픽 디자이너',
    education: '홍익대학교',
    location: '마포구',
    profileImage: '/api/placeholder/300/400',
    membershipType: 'female',
    isOnline: true,
    lastSeen: '방금 전'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { gender, membershipType, limit = '10' } = req.query
    
    let filteredMembers = [...dummyMembers]
    
    if (gender) {
      filteredMembers = filteredMembers.filter(member => member.gender === gender)
    }
    
    if (membershipType) {
      filteredMembers = filteredMembers.filter(member => member.membershipType === membershipType)
    }
    
    const limitNum = parseInt(limit as string)
    filteredMembers = filteredMembers.slice(0, limitNum)
    
    res.status(200).json({
      success: true,
      data: filteredMembers,
      total: filteredMembers.length
    })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}
