import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

const style = {
  display: 'block',
  clear: 'both',
};

@autobind
export default class GetHeightWrapper extends Component {

  static propTypes = {
    addHeight: PropTypes.func,
    children: PropTypes.node,
  };

  state = {
    height: undefined
  };

  componentDidMount() {
    this.setHeight();
  }

  setHeight() {
    const height = this.node.getBoundingClientRect().height;
    this.props.addHeight(height);
    this.setState({ height });
  }

  render() {
    return (
      <span
        ref={node => this.node = node}
        style={style}
      >
        {this.props.children}
      </span>
    );
  }
}
