/**
 * Performance Monitoring Utilities
 * Enterprise-grade performance tracking and optimization
 */

// Performance metrics interface
export interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

// Report Web Vitals
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, metric.value)
  }
  
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // })
  }
}

// Measure component render time
export function measureRender(componentName: string, callback: () => void) {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    callback()
    const end = performance.now()
    console.log(`[Render] ${componentName}: ${(end - start).toFixed(2)}ms`)
  } else {
    callback()
  }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Lazy load images
export function lazyLoadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get connection speed
export function getConnectionSpeed(): string {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown'
  }
  
  const connection = (navigator as any).connection
  return connection?.effectiveType || 'unknown'
}

// Check if device is low-end
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  
  const memory = (navigator as any).deviceMemory
  const cores = navigator.hardwareConcurrency
  
  // Consider device low-end if it has less than 4GB RAM or less than 4 cores
  return (memory && memory < 4) || (cores && cores < 4)
}

// Optimize for low-end devices
export function shouldReduceAnimations(): boolean {
  return prefersReducedMotion() || isLowEndDevice() || getConnectionSpeed() === 'slow-2g'
}



