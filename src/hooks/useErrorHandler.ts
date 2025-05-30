import { useCallback } from 'react';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  reportToService?: boolean;
  toastTitle?: string;
  toastDescription?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback(
    (
      error: Error | unknown,
      context?: string,
      options: ErrorHandlerOptions = {}
    ) => {
      const {
        showToast = true,
        logToConsole = true,
        reportToService = false,
        toastTitle,
        toastDescription,
      } = options;

      // Normalize error
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));

      // Log to console in development
      if (logToConsole && process.env.NODE_ENV === 'development') {
        console.error(
          `Error${context ? ` in ${context}` : ''}:`,
          normalizedError
        );
      }

      // Show user-friendly toast notification
      if (showToast) {
        // Try to get toast context, but don't fail if it's not available
        try {
          // This would be used with the toast context
          const title = toastTitle || getErrorTitle(normalizedError);
          const description = toastDescription || normalizedError.message;

          // In development, log what would be shown
          if (process.env.NODE_ENV === 'development') {
            console.warn('Toast notification:', {
              title,
              description,
              type: 'error',
            });
          }

          // In a real implementation, you would call:
          // addToast({ type: 'error', title, description });
        } catch (toastError) {
          console.warn('Could not show toast notification:', toastError);
        }
      }

      // Report to error tracking service
      if (reportToService) {
        // In a real app, you would send to Sentry, LogRocket, etc.
        // Example: Sentry.captureException(normalizedError, { tags: { context } });
        console.info('Would report to error service:', normalizedError.message);
      }

      return normalizedError;
    },
    []
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      context?: string,
      options?: ErrorHandlerOptions
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, context, options);
        return null;
      }
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
  };
};

// Helper function to get user-friendly error titles
const getErrorTitle = (error: Error): string => {
  switch (error.name) {
    case 'ValidationError':
      return 'Validation Error';
    case 'NetworkError':
      return 'Network Error';
    case 'AuthenticationError':
      return 'Authentication Required';
    default:
      return 'Something went wrong';
  }
};

// Error types for better error handling
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}
