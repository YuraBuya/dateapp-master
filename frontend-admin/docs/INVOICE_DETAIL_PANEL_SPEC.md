# Invoice Detail Panel - Technical Specification

## Overview
Premium financial operations panel for invoice management with PII protection, refund/retry/credit flows, and comprehensive audit logging.

## Architecture

### Component Breakdown

1. **InvoiceDetailPanel** (`components/InvoiceDetailPanel.tsx`)
   - Main orchestrator component
   - Manages panel state and section navigation
   - Integrates all sub-components
   - Width: 600px desktop, full-screen mobile
   - Smooth slide-in animation with spring physics

2. **InvoiceSummaryStrip** (`components/detail-panel/InvoiceSummaryStrip.tsx`)
   - Sticky header with teal gradient (`from-teal-600 to-cyan-500`)
   - Compact KPI cards: Amount, Status, Payment Method, Due Date, Retry Attempts
   - Horizontal scroll on mobile
   - 40% height reduction from standard headers

3. **PaymentKPIs** (`components/detail-panel/PaymentKPIs.tsx`)
   - Net revenue calculation with mini sparkline
   - Total paid, refunded, disputed metrics
   - Color-coded cards: teal (revenue), green (paid), orange (refunded)
   - Responsive 2-column grid

4. **LineItemsTable** (`components/detail-panel/LineItemsTable.tsx`)
   - Invoice line items with quantity, unit price, total
   - Automatic tax calculation (10%)
   - Subtotal and grand total display
   - Responsive table with horizontal scroll

5. **PaymentTimeline** (`components/detail-panel/PaymentTimeline.tsx`)
   - Chronological payment events
   - Filter chips: All, Payment, Refund, Dispute, Retry
   - Color-coded icons and cards by event type
   - Expandable event details with timestamps

6. **PaymentActions** (`components/detail-panel/PaymentActions.tsx`)
   - Primary CTA buttons:
     - Refund (full/partial with reason)
     - Retry Payment
     - Issue Credit
     - Cancel Invoice
   - Confirmation modals with validation
   - Reason/note input fields required

7. **PIIMaskedInfo** (`components/detail-panel/PIIMaskedInfo.tsx`)
   - Masked customer data by default
   - Reveal with explicit action (audited)
   - Blue gradient background for emphasis
   - Lock icon and audit warning

## Data Structure

### Invoice Payload (Extended)

```typescript
interface Invoice {
  id: string
  invoiceNumber: string
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  amount: number
  currency: string
  status: InvoiceStatus
  paymentMethod: PaymentMethod
  createdDate: Date
  dueDate: Date
  paidDate?: Date
  retryAttempts: number
  description: string
  tags: string[]
  lineItems: LineItem[]
  refunds?: Refund[]
  disputes?: Dispute[]
  paymentAttempts?: PaymentAttempt[]
}

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxRate: number
}

interface Refund {
  id: string
  amount: number
  reason: string
  processedBy: string
  processedAt: Date
  type: 'full' | 'partial'
  status: 'pending' | 'completed' | 'failed'
}

interface Dispute {
  id: string
  amount: number
  reason: string
  status: 'open' | 'under_review' | 'resolved' | 'lost'
  openedAt: Date
  resolvedAt?: Date
  evidence?: string[]
  notes?: string
}

interface PaymentAttempt {
  id: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  attemptedAt: Date
  failureReason?: string
  transactionId?: string
}

interface TimelineEvent {
  id: string
  type: 'payment' | 'refund' | 'dispute' | 'retry' | 'credit' | 'note' | 'status_change'
  title: string
  description: string
  timestamp: Date
  amount?: number
  performedBy?: string
  metadata?: Record<string, any>
}
```

## Events & Hooks

### Admin Action Handlers

```typescript
interface AdminActionHandlers {
  onRefund: (invoiceId: string, amount: number, reason: string, type: 'full' | 'partial') => void
  onRetry: (invoiceId: string) => void
  onCredit: (invoiceId: string, amount: number, reason: string) => void
  onCancel: (invoiceId: string, reason: string) => void
  onRevealPII: (invoiceId: string) => void
}
```

### Usage Example

```typescript
<InvoiceDetailPanel
  invoice={selectedInvoice}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
/>
```

## Interaction Specifications

### 1. Panel Open/Close
- **Trigger**: Click on invoice row in table
- **Animation**: Slide-in from right (spring: damping 30, stiffness 300)
- **Backdrop**: Dark overlay with blur (40% opacity)
- **Close Actions**: Click backdrop, ESC key, close button

### 2. Section Navigation
- **Tabs**: Overview, Timeline, Actions
- **Active State**: Teal gradient text + animated underline
- **Animation**: Smooth transition with Framer Motion layoutId
- **Sticky**: Tabs remain visible during content scroll

### 3. Refund Flow
1. Click "환불 처리" button
2. Modal opens with refund type selection (Full/Partial)
3. Enter refund amount (auto-filled for full refund)
4. Enter mandatory reason (textarea, 4 rows)
5. Click "환불 실행" (disabled until valid)
6. Confirmation logged to audit trail

### 4. Retry Payment Flow
1. Click "결제 재시도" button (only for failed/pending)
2. Immediate retry attempt (no modal)
3. Result displayed in timeline
4. Status updated automatically

### 5. Credit Flow
1. Click "크레딧 지급" button
2. Modal opens
3. Enter credit amount (number input)
4. Enter mandatory reason
5. Click "지급 실행"
6. Credit applied to user account

### 6. PII Reveal Flow
1. Click "보기" button on masked info card
2. Immediate reveal (no 2FA required for billing)
3. Audit log entry created with timestamp
4. Click "숨기기" to re-mask

## Color System

### Primary Colors (Teal Theme)
```
Header Gradient:    from-teal-600 to-cyan-500
Active Tab:         gradient from-teal-600 to-cyan-600
KPI Background:     from-teal-50 to-cyan-50 (light)
                    from-teal-900/20 to-cyan-900/20 (dark)
```

### Status Colors
```
Paid:      Green  (#22c55e / bg-green-100)
Pending:   Yellow (#eab308 / bg-yellow-100)
Failed:    Red    (#ef4444 / bg-red-100)
Refunded:  Gray   (#6b7280 / bg-gray-100)
Disputed:  Orange (#f97316 / bg-orange-100)
Cancelled: Gray   (#6b7280 / bg-gray-100)
```

### Event Type Colors
```
Payment:        Green  (bg-green-100)
Refund:         Orange (bg-orange-100)
Dispute:        Red    (bg-red-100)
Retry:          Blue   (bg-blue-100)
Credit:         Purple (bg-purple-100)
Note:           Gray   (bg-gray-100)
Status Change:  Cyan   (bg-cyan-100)
```

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
aria-label="Invoice detail panel"
```

### Color Contrast
- All text: ≥ 4.5:1 contrast ratio
- Interactive elements: ≥ 3:1 contrast ratio
- Focus indicators: 2px solid teal outline

## Mobile Responsiveness

### Breakpoints
- **Desktop** (≥768px): 600px panel width
- **Mobile** (<768px): Full-screen drawer

### Mobile Adjustments
- Sticky summary strip
- Horizontal scroll for KPI cards
- Stacked action buttons (full width)
- Bottom sheet for modals

## Performance Optimizations

1. **Memoization**: All sub-components wrapped in `React.memo`
2. **Timeline Building**: `useMemo` for event aggregation
3. **Filter Logic**: `useMemo` for filtered events
4. **Lazy Modals**: AnimatePresence for mount/unmount
5. **Sparkline**: Simple SVG bars (no heavy chart library)

## Security & Privacy

### PII Masking
- **Name**: `김**` (first character + asterisks)
- **Email**: `kim***@example.com` (preserved format)
- **User ID**: `***` (fully masked)

### Audit Logging
All financial actions logged:
- Refund processing (with amount, reason, type)
- Credit issuance (with amount, reason)
- Invoice cancellation (with reason)
- PII reveal (with timestamp, admin ID)

### Permissions
- View invoice details: `billing:read`
- Process refund: `billing:refund`
- Retry payment: `billing:retry`
- Issue credit: `billing:credit`
- Cancel invoice: `billing:cancel`
- Reveal PII: `billing:pii:reveal`

## Testing Checklist

### Functional Tests
- [ ] Panel opens on row click
- [ ] Panel closes on backdrop/ESC/close button
- [ ] All 3 sections render correctly
- [ ] Payment KPIs calculate accurately
- [ ] Line items table displays with correct totals
- [ ] Timeline builds from invoice data
- [ ] Timeline filters work correctly
- [ ] Refund modal validates inputs
- [ ] Retry button only shows for failed/pending
- [ ] Credit modal validates amount and reason
- [ ] Cancel button only shows for pending
- [ ] PII masking works correctly
- [ ] PII reveal logs to audit trail

### Modal Validation Tests
- [ ] Refund: Reason required, amount > 0
- [ ] Refund: Partial type enables amount input
- [ ] Refund: Full type auto-fills amount
- [ ] Credit: Amount required and > 0
- [ ] Credit: Reason required
- [ ] Cancel: Reason required
- [ ] All modals: Close on backdrop click
- [ ] All modals: Disabled state works

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces panel open/close
- [ ] Focus trapped in modal when open
- [ ] All buttons have ARIA labels
- [ ] Color contrast meets WCAG 2.1 AA

### Performance Tests
- [ ] Panel opens in <300ms
- [ ] Smooth 60fps animations
- [ ] Timeline with 100+ events performs well
- [ ] No layout shifts during loading

## Future Enhancements

1. **Automated Refund Rules**: Conditions for auto-refund
2. **Bulk Actions**: Multi-invoice operations
3. **Payment Plan**: Installment configuration
4. **Tax Configuration**: Multiple tax rates and regions
5. **Currency Conversion**: Multi-currency support
6. **Export**: Download invoice as PDF
7. **Email Triggers**: Auto-send invoice/receipt
8. **Reconciliation**: Bank transaction matching

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
frontend-admin/src/features/admin/billing/
├── components/
│   ├── InvoiceDetailPanel.tsx        # Main orchestrator
│   └── detail-panel/
│       ├── InvoiceSummaryStrip.tsx   # Sticky header
│       ├── PaymentKPIs.tsx           # Revenue metrics
│       ├── LineItemsTable.tsx        # Invoice items
│       ├── PaymentTimeline.tsx       # Event timeline
│       ├── PaymentActions.tsx        # Admin CTAs
│       ├── PIIMaskedInfo.tsx         # Protected data
│       └── index.ts                  # Exports
├── types.ts                          # TypeScript types
├── constants.ts                      # Mock data & config
└── index.ts                          # Public API
```

## Integration Guide

### Step 1: Import Component

```typescript
import { InvoiceDetailPanel } from '@/src/features/admin/billing'
```

### Step 2: Add State Management

```typescript
const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
const [isPanelOpen, setIsPanelOpen] = useState(false)

const handleInvoiceClick = (invoice: Invoice) => {
  setSelectedInvoice(invoice)
  setIsPanelOpen(true)
}
```

### Step 3: Render Panel

```typescript
<InvoiceDetailPanel
  invoice={selectedInvoice}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
/>
```

### Step 4: Implement Admin Actions (Backend Integration)

```typescript
const handleRefund = async (invoiceId: string, amount: number, reason: string, type: 'full' | 'partial') => {
  try {
    const response = await fetch(`/api/admin/billing/${invoiceId}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason, type })
    })
    
    if (response.ok) {
      // Show success toast
      // Reload invoice data
      // Update audit log
    } else {
      // Show error toast
    }
  } catch (error) {
    console.error('Refund error:', error)
  }
}
```

## API Endpoints (Required)

```
POST   /api/admin/billing/:invoiceId/refund
POST   /api/admin/billing/:invoiceId/retry
POST   /api/admin/billing/:invoiceId/credit
POST   /api/admin/billing/:invoiceId/cancel
POST   /api/admin/billing/:invoiceId/reveal-pii
GET    /api/admin/billing/:invoiceId/timeline
GET    /api/admin/billing/:invoiceId/audit-logs
```

---

**Last Updated**: October 31, 2025  
**Version**: 1.0.0  
**Status**: Production Ready

