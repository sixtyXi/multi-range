import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Form.less';
import MultiRange from '../MultiRangeInput/MultiRangeInput';
import sendRange from './service';

const Form = ({ min, max }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [isSending, setIsSending] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const handleChangeMin = (value) => {
    setMinValue(value);
  };

  const handleChangeMax = (value) => {
    setMaxValue(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setRequestMessage('Sending...');
    try {
      const response = await sendRange(minValue, maxValue);
      setRequestMessage(response);
    } catch (error) {
      setRequestMessage(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form className="range-form" onSubmit={handleFormSubmit}>
        <input type="number" value={minValue} disabled />
        <input type="number" value={maxValue} disabled />
        <MultiRange
          onChangeMin={handleChangeMin}
          onChangeMax={handleChangeMax}
          min={min}
          max={max}
        />
        <button type="submit" disabled={isSending}>
          Send range
        </button>
      </form>
      {requestMessage && <p className="message">{requestMessage}</p>}
    </>
  );
};

Form.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Form;
