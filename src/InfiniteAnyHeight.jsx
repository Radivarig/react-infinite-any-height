import React from 'react'
import ReactInfinite from 'react-infinite'

class GetHeightWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      height: undefined
    }
  }

  componentDidMount() {
    this.setHeight()
  }

  setHeight() {
    var height = this.node.getBoundingClientRect().height
    this.props.addHeight(height)
    this.setState({height})
  }

  render() {
    var s = {
      display: 'block',
      clear: 'both',
    }
    return (
      <span ref={node => this.node = node}
          style={s}>
        {this.props.children}
      </span>
    )
  }
}

GetHeightWrapper.propTypes = {
  addHeight: React.PropTypes.func,
  children: React.PropTypes.node,
}


class InfiniteAnyHeight extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      heights: [],
      list: [],
    };

    this.lastScrollTop = 0
    this.scrollTopDelta = 0
  }

  getScrollContainer() {
    if (this.props.useWindowAsScrollContainer)
      return document.body
    return this.props.scrollContainer
  }

  addHeight(i, height) {
    var heights = this.state.heights
    var scrollDiff = height -heights[i]
    if (scrollDiff && this.scrollTopDelta < 0)
      this.getScrollContainer().scrollTop += scrollDiff
    heights[i] = height
    this.props.heightsUpdateCallback(heights)
    this.setState({heights})
  }

  componentDidMount() {
    this.setList(this.props.list)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list != this.props.list)
      this.setList(nextProps.list)
  }

  setList(propsList) {
    var heights = []

    var list = propsList.map((x, i) => {
      heights[i] = this.state.heights[i] || this.props.heights[i] || 200

      return (
        <GetHeightWrapper
            addHeight={this.addHeight.bind(this, i)}
            key={i}>
          {x}
        </GetHeightWrapper>
      )
    })

    this.setState({
      heights,
      list,
    })
  }

  handleScroll() {
    var scrollTop = this.getScrollContainer().scrollTop
    this.scrollTopDelta = scrollTop -this.lastScrollTop
    this.lastScrollTop = scrollTop
  }

  render() {
    return (
      <ReactInfinite
        elementHeight={this.state.heights}
        handleScroll={this.handleScroll.bind(this)}
        {...this.props}
        >
        {this.state.list}
      </ReactInfinite>
    )
  }
}

InfiniteAnyHeight.defaultProps = {
  heightsUpdateCallback: ()=>{},
  heights: []
}

InfiniteAnyHeight.propTypes = {
  heights: React.PropTypes.array,
  heightsUpdateCallback: React.PropTypes.func,
  list: React.PropTypes.node,
  scrollContainer: React.PropTypes.object,
  useWindowAsScrollContainer: React.PropTypes.bool
}

export default InfiniteAnyHeight
