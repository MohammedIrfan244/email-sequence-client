import { useEffect, useState } from "react";

interface IFlow{
  id: string;
  name: string;
  source:string
  createdAt: string;
}

function FlowList() {
  const [flows, setFlows] = useState<IFlow[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=>{

  },[])
  return (
    <div className="flex flex-col p-5 bg-gradient-to-b from-cyan-100 border border-gray-200 rounded-2xl to-white h-full w-1/3">
        <div className="overflow-hidden h-20">
      <h1 className="font-semibold text-gray-600">Scheduled Emails</h1>
        </div>
        <div className="overflow-y-auto h-full">
            
        </div>
    </div>
  )
}

export default FlowList
