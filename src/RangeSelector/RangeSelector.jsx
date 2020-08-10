import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { RANGE_MIN, RANGE_MAX } from './constants';
import './RangeSelector.less';

const MIN = 'min';
const MAX = 'max';

const RangeSelector = ({ render }) => {
  const [minRangeValue, setMinRangeValue] = useState(RANGE_MIN);
  const [maxRangeValue, setMaxRangeValue] = useState(RANGE_MAX);
  const [range, setRange] = useState({ min: RANGE_MIN, max: RANGE_MAX });

  const handleInputChange = ({ target: { value, name } }) => {
    const selectedValue = Number(value);

    if (name === MIN && selectedValue <= maxRangeValue) {
      setMinRangeValue(selectedValue);
      return;
    }

    if (name === MAX && selectedValue >= minRangeValue) {
      setMaxRangeValue(selectedValue);
    }
  };

  const handleButtonClick = () => {
    setRange({ min: minRangeValue, max: maxRangeValue });
  };

  return (
    <div className="range-selector">
      <input
        type="number"
        value={minRangeValue}
        name={MIN}
        onChange={handleInputChange}
      />
      <input
        type="number"
        value={maxRangeValue}
        name={MAX}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleButtonClick}>
        Apply new range
      </button>
      {render(range)}
    </div>
  );
};

RangeSelector.propTypes = {
  render: PropTypes.func.isRequired,
};

export default RangeSelector;
