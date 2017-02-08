import React from 'react';
import {render} from 'react-dom';

import ApplicationWrapper from './components/ApplicationWrapper.js';
 
import bootstrap from './style/grid12.css';
import rickshawstyle from './style/rickshaw.css';
import currencyexchange from './style/currencyexchange.css';


render(
  <ApplicationWrapper />,
  document.getElementById('root')
);