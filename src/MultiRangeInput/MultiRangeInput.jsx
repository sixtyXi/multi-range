import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from './config';
import './MultiRangeInput.less';

const percentage = (given, total) => (given * 100) / total;

const MultiRange = ({ onChangeMin, onChangeMax, initialMin, initialMax }) => {
  const [minPercent, setMinPercent] = useState(1);
  const [maxPercent, setMaxPercent] = useState(100);
  const firstRangeRef = createRef();
  const secondRangeRef = createRef();

  useEffect(() => {
    firstRangeRef.current.value = initialMin;
    secondRangeRef.current.value = initialMax;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMin, initialMax]);

  const applyMinChange = (value) => {
    const valuePercent = percentage(value, initialMax);
    setMinPercent(valuePercent);
    onChangeMin(value);
  };

  const applyMaxChange = (value) => {
    const valuePercent = percentage(value, initialMax);
    setMaxPercent(valuePercent);
    onChangeMax(value);
  };

  const handleInputRange = () => {
    const firstValue = Number(firstRangeRef.current.value);
    const secondValue = Number(secondRangeRef.current.value);

    if (firstValue > secondValue) {
      applyMaxChange(firstValue);
      applyMinChange(secondValue);
    } else {
      applyMinChange(firstValue);
      applyMaxChange(secondValue);
    }
  };

  return (
    <div
      className="range-wrap"
      style={{ ...config, '--min': minPercent, '--max': maxPercent }}
    >
      <input
        className="range"
        type="range"
        min={initialMin}
        max={initialMax}
        onInput={handleInputRange}
        ref={firstRangeRef}
      />
      <input
        className="range"
        type="range"
        min={initialMin}
        max={initialMax}
        onInput={handleInputRange}
        ref={secondRangeRef}
      />
    </div>
  );
};

MultiRange.defaultProps = {
  onChangeMin: () => {},
  onChangeMax: () => {},
  initialMin: 1,
  initialMax: 100,
};

MultiRange.propTypes = {
  onChangeMin: PropTypes.func,
  onChangeMax: PropTypes.func,
  initialMin: PropTypes.number,
  initialMax: PropTypes.number,
};

export default MultiRange;
