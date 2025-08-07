import React from 'react';
import ReactDOM from 'react-dom/client';

// ErrorBoundary for crash recovery
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) return <h1>Nova hit a snag. Refresh?</h1>;
    return this.props.children;
  }
}

const App = () => <h1>🚀 Welcome to CliNova</h1>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);