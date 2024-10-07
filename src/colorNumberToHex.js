import { padStart } from "lodash";
/**
 * @param {number} colorNumber
 * @returns {string}
 */
const colorNumberToHex = (colorNumber) =>
  `#${padStart(colorNumber.toString(16), 6, "0")}`;

export default colorNumberToHex;
