var React = require('react')
var ReactDOM = require('react-dom')

var InfiniteAnyHeight = require('./InfiniteAnyHeight.jsx')

var App = React.createClass({
  getInitialState() {
    var list =
      new Array(10000).fill('').map((x, i)=>{
        var height = 100 +Math.round(Math.abs((Math.sin(i) *250)))
        return (
          <div key={i} style={{height: height, width: '100wv', border: 'solid 1px', backgroundColor: '#' +height}}>
            height: {height +2 /*border width*/}
            <div style={{textAlign: 'center', color: 'white'}}>
              item: {i}
            </div>
          </div>
        )
      })
    return {list}
  },

  render: function() {
    return (
      <InfiniteAnyHeight
        list={this.state.list}
        preloadAdditionalHeight={window.innerHeight*2}
        useWindowAsScrollContainer
        />
    )
  }
})

var elemDiv = document.createElement('div')
document.body.appendChild(elemDiv)
ReactDOM.render(<App/>, elemDiv)
