var React = require('react')

var InfiniteAnyHeight = require('./InfiniteAnyHeight.jsx')

var App = React.createClass({
  getInitialState() {
    var list =
      new Array(10000).fill('').map((x, i)=>{
        var height = 50 +Math.round(Math.abs((Math.sin(i) *200)))
        return (
          <div key={i} style={{height: height, width: '100wv', border: 'solid 1px'}}>
            i: {i}, raw_height: {height}
          </div>
        )
      })
    return {list}
  },

  render: function() {
    return (
      <InfiniteAnyHeight
        list={this.state.list}
        useWindowAsScrollContainer
        />
    )
  }
})

var elemDiv = document.createElement('div')
document.body.appendChild(elemDiv)
React.render(<App/>, elemDiv)
