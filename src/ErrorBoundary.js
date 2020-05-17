import React, { Component } from 'react';
import GlobalError from './GlobalError';

export default class ErrorBoundary extends Component {
  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    return this.state && this.state.error ? <GlobalError error={this.state.error} /> : this.props.children;
  }
}
