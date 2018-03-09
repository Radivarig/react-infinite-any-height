import React from 'react'
import PropTypes from 'prop-types'

const style = {
  display: 'block',
  clear: 'both',
}

export default class GetHeightWrapper extends React.Component {
  static propTypes = {
    addHeight: PropTypes.func,
    children: PropTypes.node,
  }

  state = {
    height: undefined,
  }

  componentDidMount = () => {
    this.setHeight()
  }

  setHeight = () => {
    const height = this.node.getBoundingClientRect().height
    this.props.addHeight(height)
    this.setState({ height })
  }

  render = () => {
    return (
      <span
        ref={node => this.node = node}
        style={style}
      >
        {this.props.children}
      </span>
    )
  }
}
