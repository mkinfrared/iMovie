import React, { ErrorInfo } from "react";

import css from "./ErrorBoundary.module.scss";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.type";

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleClick = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    const errors = errorInfo?.componentStack
      .split("\n")
      .map((e) => <code key={e}>{e.trim()}</code>);

    if (hasError) {
      return (
        <div className={css.ErrorBoundary}>
          <h1>Something went wrong...</h1>
          <p>{error?.message}</p>
          {errors}

          <button type="button" onClick={this.handleClick}>
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
