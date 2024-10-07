import isRealNumber from "helpers/isRealNumber";
import mergeColors from "./mergeColors";

/**
 * @callback ColorTweener
 * @param {number} value
 * @returns {number} color number 0xrrggbb
 */
/**
 * @typedef {Object} ColorTweenerBreakPoint
 * @property {number} value
 * @property {number} color the color number 0xrrggbb
 */

/**
 * @param {ColorTweenerBreakPoint[]} breakPoints
 * @param {number | null} [pow] the power to raise the ratio to defaults to 1 <=> linear tweening
 * @returns {(value: import("types/utils").Nullable<number>) => number}
 */
const getColorTweener = (breakPoints, pow = 1) => {
  return (value) => {
    if (!isRealNumber(value)) {
      return 0x808080;
    }
    const first = breakPoints[0];
    const last = breakPoints[breakPoints.length - 1];
    if (value <= first.value) {
      return first.color;
    }
    if (value >= last.value) {
      return last.color;
    }
    const upperIndex = breakPoints.findIndex(
      (breakPoint) => value <= breakPoint.value
    );
    const range = [breakPoints[upperIndex - 1], breakPoints[upperIndex]];
    let ratio = (value - range[0].value) / (range[1].value - range[0].value);
    if (pow != null) {
      const r = (ratio - 0.5) * 2;
      ratio = Math.pow(Math.abs(r), pow);
      ratio = ((r < 0 ? -1 : 1) * ratio) / 2 + 0.5;
    }
    const startColor = range[0].color;
    const endColor = range[1].color;
    return mergeColors(startColor, endColor, ratio);
  };
};

export default getColorTweener;
