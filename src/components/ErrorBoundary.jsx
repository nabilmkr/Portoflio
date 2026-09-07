import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-heading">
          <div className="text-center max-w-md p-6">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-text-body mb-6">
              We're working to fix the issue. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}