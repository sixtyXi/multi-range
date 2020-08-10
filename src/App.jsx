import React from 'react';

import RangeSelector from './RangeSelector/RangeSelector';
import Form from './Form/Form';

import './App.less';

const App = () => {
  return (
    <RangeSelector
      render={(range) => <Form min={range.min} max={range.max} />}
    />
  );
};

export default App;
