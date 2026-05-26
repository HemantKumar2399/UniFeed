"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfcfb] p-6 text-center dark:bg-[#121212]">
          <div className="w-full max-w-md rounded-[28px] border border-whisper bg-card-bg p-8 shadow-deep transition-all duration-300">
            <h2 className="text-[24px] font-bold tracking-tight text-foreground">
              Something went wrong
            </h2>
            <p className="mt-4 text-[14px] font-medium leading-relaxed text-muted-foreground">
              We encountered a session initialization or hydration error. You can try refreshing the page or returning to login.
            </p>
            {this.state.error?.message && (
              <pre className="mt-4 overflow-auto rounded-lg bg-muted p-3 text-left text-[12px] font-mono text-muted-foreground max-h-24">
                {this.state.error.message}
              </pre>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="rounded-full bg-[#0075de] px-5 py-2 text-[14px] font-semibold text-white transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href="/login"
                className="rounded-full border border-whisper bg-app-bg px-5 py-2 text-[14px] font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
              >
                Return to Login
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
