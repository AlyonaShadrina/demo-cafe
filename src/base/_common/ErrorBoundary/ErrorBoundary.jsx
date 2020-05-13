import React from 'react';
import * as PropTypes from 'prop-types';
import { notifications } from '../../../dictionary';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({
      hasError: true,
    });
    // console.error('ErrorBoundary', error)
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="loadingErrorContainer">
          <h1>{notifications.errors.default}</h1>
          <p>Try to reload page with cache refresh (ctrl + F5) or logout.</p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
