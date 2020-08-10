import config from './config';

const getRangeLength = (start, end) => end - start + 1;

export const getInRangePercentage = (value, min, max) => {
  if (min === max) {
    return 100;
  }

  return ((value - min) / (max - min)) * 100;
};

/* The calculations below are necessary to find the thumb center. 50% value corresponds to the center point of the thumb.
In the extreme left position, the center equals 0% + the number of steps taken from the 50%, multiplied by the step size in pixels.
*/

/**
 * Each slider offset corresponds to the result of dividing the thumb width by range members number
 * @param {number} min - range first value
 * @param {number} max - range last value
 * @param {string} thumbDiameter - thumb width (e.g. '30px')
 * @returns {number}
 */
const calcThumbSingleOffsetValue = (
  min,
  max,
  thumbDiameter = parseInt(config['--thumb-diameter'], 10)
) => {
  const rangeLength = getRangeLength(min, max);
  const thumbOffsetValue = thumbDiameter / rangeLength;
  return thumbOffsetValue;
};

/**
 * Calculate difference between current measurement point of thumb and its center
 * @param {*} value - selected range value
 * @param {*} min - range first value
 * @param {*} max - range last value
 */
export const calcThumbOffsetFromCenter = (value, min, max) => {
  const midRange = Math.floor((min + max) / 2);
  const beforeMidRange = 1;
  const afterMidRange = -1;

  const thumbOffsets = getRangeLength(
    Math.min(value, midRange),
    Math.max(value, midRange)
  );
  const thumbSingleOffsetValue = calcThumbSingleOffsetValue(min, max);
  const rangeHalfFactor = value > midRange ? afterMidRange : beforeMidRange;

  return thumbOffsets * thumbSingleOffsetValue * rangeHalfFactor;
};