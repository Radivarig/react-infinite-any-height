# react-infinite-any-height

[react-infinite](https://github.com/seatgeek/react-infinite) with automatic height calculation.

Try it - [Live Example](https://radivarig.github.io/#/react-infinite-any-height)

### Install

`npm install react-infinite-any-height` (peer dependencies: `react`)

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
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteAnyHeight from 'react-infinite-any-height';

class App extends Component {
  constructor() {
    super();

    const list = new Array(10000).fill('').map((x, i) => {
      const height = 100 + Math.round(Math.abs((Math.sin(i) * 250)));
      const style = { height, border: 'solid 1px', backgroundColor: `#${height}` };
      return (
        <div key={i} style={style}>
          Height: { height + 2 }
          <div style={{ textAlign: 'center', color: 'white' }}>
            Item: {i}
          </div>
        </div>
      );
    });

    this.state = { list };
  }

  render() {
    return (
      <InfiniteAnyHeight
        list={this.state.list}
        preloadAdditionalHeight={window.innerHeight*2}
        useWindowAsScrollContainer
      />
    );
  }
}

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
