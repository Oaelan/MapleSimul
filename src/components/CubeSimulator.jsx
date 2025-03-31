import CubeSimulationResult from "./CubeSimulationResult";
import CubeSimulatorInfo from "./CubeSimulatorInfo";
function CubeSimulator() {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-10">
      <CubeSimulatorInfo />
      <CubeSimulationResult />
    </div>
  );
}
export default CubeSimulator;
