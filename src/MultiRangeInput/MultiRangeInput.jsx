import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import config from './config';
import { getInRangePercentage, calcThumbOffsetFromCenter } from './helpers';
import './MultiRangeInput.less';

class MultiRangeInput extends React.PureComponent {
  firstRangeRef = createRef();

  secondRangeRef = createRef();

  constructor(props) {
    super(props);
    const { minValue, maxValue, min, max } = this.props;
    this.state = {
      minValue: minValue ?? min,
      maxValue: maxValue ?? max,
    };
  }

  componentDidUpdate() {
    const { min, max } = this.props;
    const { minValue, maxValue } = this.state;

    if (min > minValue) {
      this.firstRangeRef.current.value = min;
      this.secondRangeRef.current.value = maxValue;
      this.handleInputRange();
    }

    if (max < maxValue) {
      this.firstRangeRef.current.value = max;
      this.secondRangeRef.current.value = minValue;
      this.handleInputRange();
    }
  }

  handleInputRange = () => {
    const { onChangeMin, onChangeMax } = this.props;
    const firstValue = Number(this.firstRangeRef.current.value);
    const secondValue = Number(this.secondRangeRef.current.value);

    const minValue = Math.min(firstValue, secondValue);
    const maxValue = Math.max(firstValue, secondValue);

    this.setState({ minValue, maxValue });

    onChangeMin(minValue);
    onChangeMax(maxValue);
  };

  render() {
    const { min, max } = this.props;
    const { minValue, maxValue } = this.state;

    const minValuePercentage = getInRangePercentage(minValue, min, max);
    const maxValuePercentage = getInRangePercentage(maxValue, min, max);

    const minThumbOffset = calcThumbOffsetFromCenter(minValue, min, max);
    const maxThumbOffset = calcThumbOffsetFromCenter(maxValue, min, max);

    return (
      <div
        className="range-wrap"
        style={{
          ...config,
          '--min': minValuePercentage,
          '--max': maxValuePercentage,
          '--min-thumb-offset': minThumbOffset,
          '--max-thumb-offset': maxThumbOffset,
        }}
      >
        <input
          className="range"
          type="range"
          min={min}
          max={max}
          defaultValue={minValue}
          onInput={this.handleInputRange}
          ref={this.firstRangeRef}
        />
        <input
          className="range"
          type="range"
          min={min}
          max={max}
          defaultValue={maxValue}
          onInput={this.handleInputRange}
          ref={this.secondRangeRef}
        />
      </div>
    );
  }
}

MultiRangeInput.defaultProps = {
  onChangeMin: () => {},
  onChangeMax: () => {},
  min: 1,
  max: 100,
  minValue: undefined,
  maxValue: undefined,
};

MultiRangeInput.propTypes = {
  onChangeMin: PropTypes.func,
  onChangeMax: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default MultiRangeInput;
