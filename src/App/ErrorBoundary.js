import React, { Component } from 'react'
import * as Sentry from '@sentry/browser'

class ErrorBoundary extends Component {

    state = { 
        error: null,
        eventId: null
    }

    componentDidCatch(error, errorInfo) {
        if (process.env.NODE_ENV === 'production') {
            this.setState({ error });
            Sentry.withScope(scope => {
                scope.setExtras(errorInfo);
                const eventId = Sentry.captureException(error)
                this.setState({eventId})
            });
        }
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <span onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</span>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default ErrorBoundary