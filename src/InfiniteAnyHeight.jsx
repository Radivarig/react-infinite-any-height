var React = require('react')
var ReactDOM = require('react-dom')
var ReactInfinite = require('react-infinite')

var InfiniteAnyHeight = React.createClass({
  getDefaultProps() {
    return {
      updateHeightsOf: {indexList: [], timeStamp: 0}
    }
  },

  getInitialState() {
    return {
      heights: [],
      list: [],
    }
  },

  getScrollContainer() {
    if (this.props.useWindowAsScrollContainer)
      return document.body
    return this.props.scrollContainer
  },

  addHeight(i, height) {
    var heights = this.state.heights
    var scrollDiff = height -heights[i]
    if (scrollDiff && this.scrollTopDelta < 0)
      this.getScrollContainer().scrollTop += scrollDiff
    heights[i] = height
    this.setState({heights})
  },

  componentDidMount() {
    this.setList(this.props.list)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.list != this.props.list)
      this.setList(nextProps.list)

    if (nextProps.updateHeightsOf.timeStamp != this.props.updateHeightsOf.timeStamp)
      this.remountByIndices (nextProps.updateHeightsOf.indexList, nextProps.list)
  },

  remountByIndices (indices, origList) {
    var list = this.state.list
    for (var i = 0; i < indices.length; ++i) {
      var ind = indices[i]
      var elem = origList[ind]
      list[ind] = this.getGetHeightWrapper(elem, ind +'_' +new Date().getTime())
    }
    this.setState({list})
  },

  getGetHeightWrapper (x, i) {
    return (
      <GetHeightWrapper
        addHeight={this.addHeight.bind(this, i)}
        key={i}
      >
      {x}
      </GetHeightWrapper>
    )
  },

  setList(propsList) {
    var heights = []
    var list =
    propsList.map( (x, i)=>{
      heights[i] = this.state.heights[i] || 200
      return this.getGetHeightWrapper (x, i)
    })
    this.setState({
      heights,
      list,
    })
  },

  lastScrollTop: 0,
  scrollTopDelta: 0,

  handleScroll() {
    var scrollTop = this.getScrollContainer().scrollTop
    this.scrollTopDelta = scrollTop -this.lastScrollTop
    this.lastScrollTop = scrollTop
  },

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
})

var GetHeightWrapper = React.createClass({
  getInitialState() {
    return {height: undefined}
  },

  componentDidMount() {
    this.setHeight()
  },

  setHeight() {
    var height = ReactDOM.findDOMNode(this).getBoundingClientRect().height
    this.props.addHeight(height)
  },
  render() {
    var s = {
      content: ' ',
      display: 'block',
      clear: 'both',
    }
    return (
      <span style={s} className={this.state.height +'-px'}>
        {this.props.children}
      </span>
    )
  }
})

module.exports = InfiniteAnyHeight
