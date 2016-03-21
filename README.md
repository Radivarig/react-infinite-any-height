# react-infinite-any-height

[react-infinite](https://github.com/seatgeek/react-infinite) with automatic height calculation.

TODO: Try it - [Live Example](https://radivarig.github.io/#/react-infinite-any-height)

### Install

`npm install react-infinite-any-height` (peer dependencies: `react react-dom`)

### Demo

TODO: Check out [Live Example](https://radivarig.github.io/#/react-infinite-any-height),
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
ReactDOM.render(<App/>, elemDiv)
```

When updating `list` make sure to use `.splice(0)` to change reference.  
All `props` are passed to react-infinite as well.

### License

MIT
