import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // In a real app, you would send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
          <Card className='w-full max-w-md'>
            <CardHeader className='text-center'>
              <div className='mx-auto mb-4 h-12 w-12 text-red-500'>
                <AlertTriangle className='h-full w-full' />
              </div>
              <CardTitle className='text-xl'>Something went wrong</CardTitle>
              <CardDescription>
                We're sorry, but something unexpected happened. Please try
                refreshing the page or go back to the home page.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-col gap-2'>
                <Button
                  onClick={this.handleReload}
                  className='w-full flex items-center gap-2'
                >
                  <RefreshCw className='h-4 w-4' />
                  Reload Page
                </Button>
                <Button
                  variant='outline'
                  onClick={this.handleGoHome}
                  className='w-full flex items-center gap-2'
                >
                  <Home className='h-4 w-4' />
                  Go to Home
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mt-4 p-3 bg-gray-100 rounded text-sm'>
                  <summary className='cursor-pointer font-medium text-gray-700 mb-2'>
                    Error Details (Development Only)
                  </summary>
                  <div className='space-y-2 text-xs text-gray-600'>
                    <div>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div>
                      <strong>Stack:</strong>
                      <pre className='mt-1 whitespace-pre-wrap break-all'>
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className='mt-1 whitespace-pre-wrap break-all'>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
