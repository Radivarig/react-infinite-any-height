import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactInfinite from 'react-infinite';
import isEqual from 'lodash.isequal';
import { autobind } from 'core-decorators';

import GetHeightWrapper from './GetHeightWrapper';

@autobind
export default class InfiniteAnyHeight extends Component {
  static displayName = 'InfiniteAnyHeight';

  static propTypes = {
    heights: PropTypes.array,
    heightsUpdateCallback: PropTypes.func,
    list: PropTypes.node,
    scrollContainer: PropTypes.object,
    useWindowAsScrollContainer: PropTypes.bool
  };

  static defaultProps = {
    heightsUpdateCallback: () => {},
    heights: []
  };

  state = {
    heights: [],
    list: [],
  };

  lastScrollTop = 0;

  scrollTopDelta = 0;

  componentDidMount() {
    this.setList(this.props.list)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.list, this.props.list)) {
      this.setList(nextProps.list)
    }
  }

  getScrollContainer() {
    if (this.props.useWindowAsScrollContainer) {
      return document.body;
    }
    return ReactDOM.findDOMNode(this);
  }

  addHeight(i, height) {
    const heights = this.state.heights;
    const scrollDiff = height - heights[i];

    if (scrollDiff && this.scrollTopDelta < 0) {
      this.getScrollContainer().scrollTop += scrollDiff;
    }

    heights[i] = height;
    this.props.heightsUpdateCallback(heights);
    this.setState({ heights });
  }

  setList(listProp) {
    const heights = [];

    const list = listProp.map((item, i) => {
      heights[i] = this.state.heights[i] || this.props.heights[i] || 200;

      return (
        <GetHeightWrapper
          addHeight={(height) => this.addHeight(i, height)}
          key={i}
        >
          {item}
        </GetHeightWrapper>
      );
    });

    this.setState({ heights, list });
  }

  handleScroll(...args) {
    const scrollTop = this.getScrollContainer().scrollTop;
    this.scrollTopDelta = scrollTop - this.lastScrollTop;
    this.lastScrollTop = scrollTop;
    if (typeof this.props.handleScroll === 'function') {
      this.props.handleScroll(...args);
    }
  }

  render() {
    return (
      <ReactInfinite
        elementHeight={this.state.heights}
        handleScroll={this.handleScroll}
        {...this.props}
      >
        {this.state.list}
      </ReactInfinite>
    )
  }
}
