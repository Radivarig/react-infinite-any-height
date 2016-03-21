# react-infinite-any-height

[react-infinite](https://github.com/seatgeek/react-infinite) with automatic height calculation.

Try it - [Live Example](https://radivarig.github.io/#/react-infinite-any-height)

### Install

`npm install react-infinite-any-height` (peer dependencies: `react react-dom`)

### Demo

Check out [Live Example](https://radivarig.github.io/#/react-infinite-any-height),
or run locally
```bash
git clone git@github.com:Radivarig/react-infinite-any-height.git
npm install
npm run dev 
```
navigate to `localhost:8080`

### Usage

```javascript
// ...
var React = require('react')
var ReactDOM = require('react-dom')

var InfiniteAnyHeight = require('react-infinite-any-height')

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
```

All `props` are passed to `react-infinite` as well.  
When updating `list` make sure to use `.slice(0)` to change reference.  
If `useWindowAsScrollContainer` is ommited, both `containerHeight` and  
`scrollContainer` (the node that has the active .scrollTop) props are required.  


### License

MIT
