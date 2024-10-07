const isRealNumber = (num: unknown): num is number =>
  typeof num === "number" && isFinite(num);

export default isRealNumber;
