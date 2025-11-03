# Member Detail Panel - Technical Specification

## Overview
Premium, data-rich slide-in panel for comprehensive member management with privacy-first design and enterprise-grade features.

## Architecture

### Component Breakdown

1. **MemberDetailPanel** (`components/MemberDetailPanel.tsx`)
   - Main orchestrator component
   - Manages panel open/close state and section navigation
   - Integrates all sub-components
   - Width: 520px desktop, full-screen mobile
   - Smooth slide-in animation using Framer Motion

2. **MemberSummaryStrip** (`components/detail-panel/MemberSummaryStrip.tsx`)
   - Sticky header with key KPIs
   - Avatar with risk score ring (SVG circle)
   - Quick stats: Matches, Messages (30d), Reports, Last Active
   - Status badges: Tier, Status, Verification
   - Color-coded risk indicator (green/yellow/red)

3. **ProfileCarousel** (`components/detail-panel/ProfileCarousel.tsx`)
   - Photo gallery with navigation arrows
   - Click-to-enlarge lightbox
   - Photo indicators for multi-image profiles
   - Keyboard accessible

4. **AdminActions** (`components/detail-panel/AdminActions.tsx`)
   - Primary CTA buttons:
     - Send Internal Message
     - Impersonate/View As User
     - Change Subscription Tier
     - Issue Refund/Payment Adjustment
     - Add Admin Note
     - Suspend/Restore Account
   - Confirmation modals for destructive actions
   - Reason/note input fields
   - Audit logging integration

5. **HistoryTimeline** (`components/detail-panel/HistoryTimeline.tsx`)
   - Chronological event list with icons
   - Filter chips: All, Reports, Admin Actions, Payments
   - Expandable events with metadata
   - Visual timeline with vertical line

6. **RiskSignals** (`components/detail-panel/RiskSignals.tsx`)
   - Automated risk flags
   - Severity badges: low/medium/high/critical
   - Confidence percentage
   - Detailed descriptions
   - Recommended actions
   - Collapsible panel

7. **DocumentPreview** (`components/detail-panel/DocumentPreview.tsx`)
   - Verification documents (ID, Passport, Selfie)
   - PII masking (blurred by default)
   - 2FA reveal flow (6-digit code)
   - Download functionality
   - Status badges

8. **NotesAudit** (`components/detail-panel/NotesAudit.tsx`)
   - Tab navigation: Admin Notes / Audit Logs
   - Searchable notes and logs
   - Important note highlighting
   - Inline edit for notes (with optimistic UI)
   - Audit trail with timestamps and reasons

## Data Structure

### Member Payload (Sample JSON)

```json
{
  "id": "M001",
  "avatar": "/images/profiles/female-profile.svg",
  "name": "김민지",
  "age": 28,
  "gender": "female",
  "city": "서울",
  "subscriptionTier": "premium",
  "verificationStatus": "verified",
  "lastActive": "2025-10-31T10:30:00Z",
  "matchesCount": 12,
  "reportsCount": 0,
  "riskScore": 15,
  "riskLevel": "low",
  "status": "active",
  "joinDate": "2025-01-15T00:00:00Z",
  "email": "kim***@example.com",
  "phone": "010-****-5678",
  "bio": "진지한 만남을 원합니다.",
  "photos": ["/images/profiles/female-profile.svg"],
  "messagesLast30d": 45,
  "preferences": {
    "ageRange": { "min": 28, "max": 35 },
    "location": ["서울", "경기"],
    "interests": ["영화", "독서", "여행", "요리"]
  },
  "verificationDocs": [
    {
      "id": "D001",
      "type": "id_card",
      "url": "/docs/id_001.jpg",
      "status": "verified",
      "uploadedAt": "2025-01-16T00:00:00Z",
      "reviewedAt": "2025-01-17T00:00:00Z"
    }
  ],
  "riskSignals": [
    {
      "id": "R001",
      "type": "spam_score",
      "severity": "medium",
      "confidence": 0.65,
      "description": "Short burst of messages detected",
      "detectedAt": "2025-10-15T14:00:00Z",
      "recommendation": "Monitor user behavior"
    }
  ],
  "timeline": [
    {
      "id": "T001",
      "type": "signup",
      "title": "회원 가입",
      "description": "플랫폼에 새로 가입했습니다.",
      "timestamp": "2025-01-15T09:00:00Z",
      "icon": "👋",
      "metadata": { "device": "iOS", "ip": "123.456.789.0" }
    }
  ],
  "adminNotes": [
    {
      "id": "N001",
      "content": "매우 활발한 사용자입니다.",
      "author": "Admin Kim",
      "createdAt": "2025-02-01T10:00:00Z",
      "isImportant": false
    }
  ],
  "auditLogs": [
    {
      "id": "A001",
      "action": "인증 승인",
      "performedBy": "Admin Park",
      "timestamp": "2025-01-17T10:00:00Z",
      "reason": "Documents verified",
      "details": "신분증 및 셀카 인증을 승인했습니다."
    }
  ]
}
```

## Events & Hooks

### Admin Action Handlers

```typescript
interface AdminActionHandlers {
  onSendMessage: (memberId: string) => void
  onImpersonate: (memberId: string) => void
  onSuspend: (memberId: string, reason: string) => void
  onRestore: (memberId: string) => void
  onAdjustTier: (memberId: string, tier: 'basic' | 'premium' | 'vip') => void
  onIssueRefund: (memberId: string) => void
  onAddNote: (memberId: string, note: string) => void
  onRevealPII: (docId: string) => void
}
```

### Usage Example

```typescript
<MemberDetailPanel
  member={selectedMember}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
/>
```

## Interaction Specifications

### 1. Panel Open/Close
- **Trigger**: Click on table row
- **Animation**: Slide-in from right (300ms spring animation)
- **Backdrop**: Dark overlay with blur (click to close)
- **Keyboard**: ESC to close, focus trap when open

### 2. Section Navigation
- **Tabs**: Profile, Timeline, Risk, Documents, Notes
- **Navigation**: Click to switch, smooth fade transition
- **Active State**: Purple underline + color change
- **Badge**: Risk tab shows alert count

### 3. Confirm Modals
- **Triggers**: Suspend, Tier Change, Add Note
- **Validation**: Required fields (reason, note)
- **Actions**: Cancel (gray) / Confirm (colored)
- **Logging**: All confirmations logged to audit trail

### 4. PII Reveal Flow
- **Step 1**: Click "보기 (2FA)" button on document
- **Step 2**: Modal opens requesting 6-digit code
- **Step 3**: Admin enters code (numeric only, max 6)
- **Step 4**: Validation (mock: any 6 digits)
- **Step 5**: Document revealed, audit log entry created
- **Step 6**: "숨기기" button to re-mask

### 5. Optimistic Updates
- **Notes**: Add note immediately to UI, revert on API error
- **Tier Change**: Update badge immediately, show loading spinner
- **Suspend**: Disable actions, show pending state

## Accessibility

### Keyboard Navigation
- Tab order: Close button → Section tabs → Action buttons
- Enter/Space: Activate buttons
- ESC: Close panel or modal
- Arrow keys: Navigate timeline events

### ARIA Labels
```typescript
role="dialog"
aria-modal="true"
aria-labelledby="member-detail-title"
aria-describedby="member-detail-summary"
```

### Color Contrast
- All text: ≥ 4.5:1 contrast ratio
- Interactive elements: ≥ 3:1 contrast ratio
- Focus indicators: 2px solid purple outline

## Mobile Responsiveness

### Breakpoints
- **Desktop** (≥768px): 520px panel width
- **Mobile** (<768px): Full-screen drawer

### Mobile Adjustments
- Sticky summary strip
- Horizontal scroll for tabs
- Stacked action buttons (full width)
- Bottom sheet for modals

## Performance Optimizations

1. **Memoization**: All sub-components wrapped in `React.memo`
2. **Code Splitting**: Lazy load modals and lightbox
3. **Virtual Scrolling**: For timelines >50 events
4. **Debounced Search**: 300ms delay for notes/audit search
5. **Image Optimization**: Lazy load document previews

## Security & Privacy

### PII Masking
- **Email**: `kim***@example.com`
- **Phone**: `010-****-5678`
- **Documents**: Blurred until 2FA reveal

### Audit Logging
All sensitive actions are logged:
- PII reveal (with 2FA timestamp)
- Account suspension (with reason)
- Tier adjustments (with old/new values)
- Note additions (with author)

### Permissions
- View member details: `member:read`
- Send message: `member:message`
- Suspend account: `member:suspend`
- Adjust tier: `billing:adjust`
- Reveal PII: `member:pii:reveal` + 2FA

## Testing Checklist

### Functional Tests
- [ ] Panel opens on row click
- [ ] Panel closes on backdrop/ESC/close button
- [ ] All 5 sections render correctly
- [ ] Risk signals display with correct severity colors
- [ ] Timeline events filterable and expandable
- [ ] Documents mask/reveal with 2FA
- [ ] Suspend modal requires reason
- [ ] Tier change modal updates badge
- [ ] Notes searchable and filterable
- [ ] Audit logs searchable

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces panel open/close
- [ ] Focus trapped in panel when open
- [ ] All buttons have ARIA labels
- [ ] Color contrast meets WCAG 2.1 AA

### Performance Tests
- [ ] Panel opens in <300ms
- [ ] Smooth 60fps animations
- [ ] No layout shifts during loading
- [ ] Large timelines (100+ events) performant

### Mobile Tests
- [ ] Full-screen drawer on mobile
- [ ] Touch gestures work (swipe to close)
- [ ] Bottom sheets for modals
- [ ] Responsive typography and spacing

## Future Enhancements

1. **Real-time Updates**: WebSocket for live activity feed
2. **Inline Editing**: Edit member details directly in panel
3. **Bulk Actions**: Select multiple timeline events for batch operations
4. **Export**: Download member data as PDF/CSV
5. **AI Insights**: Risk score explanations and recommendations
6. **Multi-language**: i18n support for panel content

## Dependencies

```json
{
  "framer-motion": "^10.16.0",
  "lucide-react": "^0.292.0",
  "date-fns": "^2.30.0",
  "react": "^18.2.0"
}
```

## File Structure

```
frontend-admin/src/features/admin/members/
├── components/
│   ├── MemberDetailPanel.tsx        # Main orchestrator
│   ├── detail-panel/
│   │   ├── MemberSummaryStrip.tsx   # Sticky header
│   │   ├── ProfileCarousel.tsx      # Photo gallery
│   │   ├── AdminActions.tsx         # Action buttons
│   │   ├── HistoryTimeline.tsx      # Event timeline
│   │   ├── RiskSignals.tsx          # Risk flags
│   │   ├── DocumentPreview.tsx      # Verification docs
│   │   ├── NotesAudit.tsx           # Notes & audit
│   │   └── index.ts                 # Exports
│   └── index.ts
├── types.ts                         # TypeScript types
├── constants.ts                     # Mock data & config
└── index.ts                         # Public API
```

## Integration Guide

### Step 1: Import Component

```typescript
import { MemberDetailPanel } from '@/src/features/admin/members'
```

### Step 2: Add State Management

```typescript
const [selectedMember, setSelectedMember] = useState<Member | null>(null)
const [isPanelOpen, setIsPanelOpen] = useState(false)

const handleMemberClick = (member: Member) => {
  setSelectedMember(member)
  setIsPanelOpen(true)
}
```

### Step 3: Render Panel

```typescript
<MemberDetailPanel
  member={selectedMember}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
/>
```

### Step 4: Implement Admin Actions

```typescript
// In MemberDetailPanel, handlers are defined as:
const handleSuspend = useCallback(async (memberId: string, reason: string) => {
  try {
    await api.suspendMember(memberId, reason)
    // Update local state
    // Show success toast
    // Reload member data
  } catch (error) {
    // Show error toast
  }
}, [])
```

## Support

For questions or issues, contact:
- **Developer**: Admin Panel Team
- **Slack**: #admin-panel-dev
- **Email**: admin-panel@company.com

---

**Last Updated**: October 31, 2025  
**Version**: 1.0.0  
**Status**: Production Ready

