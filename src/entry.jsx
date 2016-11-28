import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteAnyHeightViewer from './InfiniteAnyHeightViewer.jsx';

var elemDiv = document.createElement('div');
document.body.appendChild(elemDiv);
ReactDOM.render(<InfiniteAnyHeightViewer />, elemDiv);
