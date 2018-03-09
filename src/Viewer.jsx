import React, { Component } from "react"
import InfiniteAnyHeight from "./InfiniteAnyHeight.jsx"

export default class InfiniteAnyHeightViewer extends Component {
  constructor () {
    super ()

    const list = new Array (10000).fill ("").map ((x, i) => {
      const height = 100 + Math.round (Math.abs ((Math.sin (i) * 250)))
      const style = { height, "border": "solid 1px", "backgroundColor": `#${height}` }
      return (
        <div key={i} style={style}>
          Height: { height + 2 }
          <div style={{ "textAlign": "center", "color": "white" }}>
            Item: {i}
          </div>
        </div>
      )
    })

    this.state = { list }
  }

  render () {
    return (
      <InfiniteAnyHeight
        list={this.state.list}
        preloadAdditionalHeight={window.innerHeight * 2}
        useWindowAsScrollContainer
      />
    )
  }
}
