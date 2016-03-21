var React = require('react')
var ReactDOM = require('react-dom')

var InfiniteAnyHeightViewer = require('./InfiniteAnyHeightViewer.jsx')

var elemDiv = document.createElement('div')
document.body.appendChild(elemDiv)
ReactDOM.render(<InfiniteAnyHeightViewer />, elemDiv)
