import { useEffect, useState } from "react";
import Flowchart from "../components/dashboard/FlowChart";
import FlowList from "../components/dashboard/FlowList";
import axiosErrorManager from "../utils/axiosErrorManager";
import axiosInstance from "../utils/axiosInstance";


export interface IFlow{
  id: string;
  name: string;
  source:string
  createdAt: string;
}

function Dashboard() {
  const [flows, setFlows] = useState<IFlow[]>([]);
  const [selectedFlow,setSelectedFlow] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchFlows = async () => {
    setLoading(true)
    try{
      const res = await axiosInstance.get("/flow/get-user-flows")
      setFlows(res.data.flows)
    }catch(err){
      console.log(axiosErrorManager(err))
    }finally{
      setLoading(false)
    }
  }
  const handleFlowClick = async(id: string) => {
    setSelectedFlow(id)
  }
  useEffect(()=>{
    fetchFlows()
  },[])
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
      <Flowchart id={selectedFlow}/>
      <FlowList loading={loading} flows={flows} key={selectedFlow} onClick={handleFlowClick}/>
      </div>
    </div>
  );
}

export default Dashboard;
