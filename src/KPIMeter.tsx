import isRealNumber from "./isRealNumber";
import s from "./index.module.scss";
import "react-circular-progressbar/dist/styles.css";
import { KpiGraphValues } from "./types";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { KPIColorsTweenerAsHex } from "./performanceKPIColorTweener";
import classNames from "classnames";
import React from "react";

type CircularKPIMeterProps = {
  kpi: KpiGraphValues;
  maxValue: number;
  circleRatio: number;
  strokeWidth?: number;
  rotationAngle?: string | number;
  transformOrigin?: string;
  strokeLinecap: "butt" | "round" | "square" | "inherit";
  fontSize?: number;
  fontWeight?: number;
  titleColor?: "default" | "grey";
  fill?: string;
  style?: React.CSSProperties;
};
type CalculateKpiColor = (value: number, telemetryName: string) => string;

const KPIMeter = ({
  kpi,
  maxValue,
  circleRatio,
  strokeWidth,
  rotationAngle,
  transformOrigin,
  strokeLinecap,
  fontSize,
  fontWeight,
  titleColor,
  fill,
  style,
}: CircularKPIMeterProps) => {
  const calculateKpiColor: CalculateKpiColor = (value, telemetryName) => {
    return KPIColorsTweenerAsHex(value);
  };

  kpi.color = calculateKpiColor(kpi.value, kpi.telemetryName);

  const hasDecimals = (num: number): boolean => num % 1 !== 0;
  const formatKpiValue = (value: number): string | number =>
    hasDecimals(value)
      ? (Math.round(value * 1000) / 1000).toFixed(1)
      : Math.round(value * 1000) / 1000;

  return (
    <div className={s.circularKpiMeter} style={style}>
      <CircularProgressbarWithChildren
        value={isRealNumber(kpi.value) ? formatKpiValue(kpi.value) : "-"}
        maxValue={maxValue}
        text={`${kpi.value.toFixed(1)}`}
        circleRatio={circleRatio}
        styles={{
          trail: {
            strokeLinecap: strokeLinecap,
            transform: `rotate(${rotationAngle}deg)`,
            transition: "stroke-dashoffset 0.5s ease 0s",
            transformOrigin: transformOrigin,
          },
          path: {
            stroke: kpi.color,
            strokeLinecap: strokeLinecap,
            transform: `rotate(${rotationAngle}deg)`,
            transformOrigin: transformOrigin,
          },
          text: {
            fill: fill,
            fontSize: fontSize,
            fontWeight: fontWeight,
          },
        }}
        strokeWidth={strokeWidth}
      />
      <p className={classNames(s.text, s[`fc-${titleColor}`])}>{kpi.title}</p>
    </div>
  );
};

export default KPIMeter;
