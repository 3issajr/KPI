import getColorTweener from "./getColorTweener";
import colorNumberToHex from "./colorNumberToHex";
import {
  COLOR_GREEN_STRONG,
  COLOR_ORANGE_STRONG,
  COLOR_RED_STRONG,
} from "./colors";

const KPIColors = getColorTweener(
  [
    { value: 0, color: COLOR_RED_STRONG },
    { value: 0.4, color: COLOR_RED_STRONG },
    { value: 0.5, color: COLOR_ORANGE_STRONG },
    { value: 0.6, color: COLOR_GREEN_STRONG },
    { value: 1, color: COLOR_GREEN_STRONG },
  ],
  null
);

export const KPIColorsTweenerAsHex = (value: number) =>
  colorNumberToHex(KPIColors(value));
