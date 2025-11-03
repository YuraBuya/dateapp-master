/**
 * Enterprise Logger Utility
 * Structured logging with different levels
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogContext {
  [key: string]: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isProduction = process.env.NODE_ENV === 'production'

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context))
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.info(this.formatMessage(LogLevel.INFO, message, context))
    }
    
    // In production, send to logging service
    if (this.isProduction) {
      // Example: Send to logging service
      // this.sendToLoggingService(LogLevel.INFO, message, context)
    }
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage(LogLevel.WARN, message, context))
    
    if (this.isProduction) {
      // Example: Send to logging service
      // this.sendToLoggingService(LogLevel.WARN, message, context)
    }
  }

  error(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      stack: error?.stack,
      name: error?.name,
      message: error?.message,
    }
    
    console.error(this.formatMessage(LogLevel.ERROR, message, errorContext))
    
    if (this.isProduction) {
      // Example: Send to error tracking service (Sentry, etc.)
      // this.sendToErrorTracking(message, error, errorContext)
    }
  }

  // Performance logging
  performance(label: string, duration: number, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(
        this.formatMessage(
          LogLevel.INFO,
          `Performance: ${label}`,
          { ...context, duration: `${duration.toFixed(2)}ms` }
        )
      )
    }
  }

  // API call logging
  api(method: string, url: string, status: number, duration: number) {
    const context = { method, url, status, duration: `${duration.toFixed(2)}ms` }
    
    if (status >= 400) {
      this.error(`API Error: ${method} ${url}`, undefined, context)
    } else if (this.isDevelopment) {
      this.info(`API Call: ${method} ${url}`, context)
    }
  }

  // User action logging
  userAction(action: string, context?: LogContext) {
    if (this.isDevelopment) {
      this.info(`User Action: ${action}`, context)
    }
    
    // In production, send to analytics
    if (this.isProduction) {
      // Example: Send to analytics service
      // this.sendToAnalytics(action, context)
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export for testing
export { Logger }



