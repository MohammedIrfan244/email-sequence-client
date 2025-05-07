import Flowchart from "../components/dashboard/FlowChart";
import FlowList from "../components/dashboard/FlowList";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen px-5">
      <div className="h-20 flex items-center justify-between">
        <div>
        <h1 className="text-xl font-bold text-gray-700">Flow Chart</h1>
        <p className="text-sm text-gray-400 font-semibold">Click on the blocks to configure and schedule your automated emails.</p>
        </div>
        <button>Save and Schedule</button>
      </div>
      <div className="flex flex-1 gap-5">
      <Flowchart/>
      <FlowList/>
      </div>
    </div>
  );
}

export default Dashboard;
