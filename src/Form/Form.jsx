import React, { useState } from 'react';

import './Form.less';
import MultiRange from '../MultiRangeInput/MultiRangeInput';

const Form = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);

  const handleChangeMin = (value) => {
    setMin(value);
  };

  const handleChangeMax = (value) => {
    setMax(value);
  };

  const handleInputMin = ({ target: { value } }) => {
    const minValue = Number(value);
    if (minValue > 0 && minValue <= max) {
      handleChangeMin(minValue);
    }
  };

  const handleInputMax = ({ target: { value } }) => {
    const maxValue = Number(value);
    if (maxValue > 0 && maxValue >= min) {
      handleChangeMax(maxValue);
    }
  };

  return (
    <form>
      <input type="number" value={min} onInput={handleInputMin} />
      <input type="number" value={max} onInput={handleInputMax} />
      <MultiRange onChangeMin={handleChangeMin} onChangeMax={handleChangeMax} />
    </form>
  );
};

export default Form;
