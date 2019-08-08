import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

var content = document.getElementById('content');
console.log(content);
var data = content.getAttribute('data');
console.log(data);

ReactDOM.render(<App data={data} />, content);

serviceWorker.unregister();
