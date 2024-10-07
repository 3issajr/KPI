import KPIMeter from "./KPIMeter";
const App = () => {
  return (
    <>
      <KPIMeter
        kpi={0.5}
        maxValue={1.0}
        circleRatio={0.7}
        strokeWidth={6}
        rotationAngle={-126}
        transformOrigin={"center center"}
        strokeLinecap={"round"}
        fontSize={25}
        fontWeight={600}
        titleColor="grey"
        fill={"#333"}
        style={{ width: "70px", height: "100%" }}
      />
    </>
  );
};

export default App;
