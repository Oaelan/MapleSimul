import CubeSimulationResult from "./CubeSimulationResult";
import CubeSimulatorInfo from "./CubeSimulatorInfo";
function CubeSimulator() {
  return (
    <div
      className="w-full h-full grid grid-cols-1
    sm:grid-cols-2 gap-10
    sm:border-2 sm:border-white/20 sm:rounded-lg sm:p-5
    sm:bg-gray-100/20"
    >
      <CubeSimulatorInfo />
      <CubeSimulationResult />
    </div>
  );
}
export default CubeSimulator;
