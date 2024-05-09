
import React from 'react';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: `Something went wrong: ${error.message}`
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo: errorInfo.componentStack });
        console.error("Error caught by Error Boundary: ", error, errorInfo);
        // Example: Log to an external error monitoring service here
    }

    render() {
        if (this.state.hasError) {
            // Enhanced fallback UI
            return (
                <div>
                    <h1>Oops, something went wrong!</h1>
                    <p>{this.state.errorMessage}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            );
        }

        return this.props.children;
    }
}