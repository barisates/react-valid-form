import React from 'react';
import ReactDOM from 'react-dom';
import ValidForm from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ValidForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
