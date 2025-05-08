import { useEffect, useState } from "react";
import axiosErrorManager from "../../utils/axiosErrorManager";
import axiosInstance from "../../utils/axiosInstance";
import Flow from "./Flow";
import { format} from "date-fns"


export interface ISingleFlow{
  _id: string;
  userId: string;
  name: string;
  leadListId: {
    _id: string;
    name: string;
  };
  order: Array<{
    _id: string;
    type: "email" | "delay";
    templateId?: {
      _id: string;
      name: string;
    };
    delay?: number;
  }>;
  createdAt: string;
  updatedAt: string;
}


function Flowchart(id: { id: string }) {
  const [flowData, setFlowData] = useState<ISingleFlow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try{
      setLoading(true)
      const res = await axiosInstance.delete(`/flow/delete-flow/${id.id}`)
      console.log(res.data.message,"deleted")
      setFlowData(null)
      setLoading(false)
    }catch(err){
      console.log(axiosErrorManager(err))
    }
  }

  const fetchFlow = async (id:string) => {
    setLoading(true)
    try{
      const res = await axiosInstance.get(`/flow/get-flow/${id}`)
      setFlowData(res.data.flow)
    }catch(err){
      console.log(axiosErrorManager(err))
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchFlow(id.id)
  },[id])
  if(loading){
    return (
      <div className="h-full w-2/3 bg-gradient-to-br border border-gray-200 from-cyan-100 rounded-2xl to-white">
        <p>loading.....</p>
      </div>
    )
  }
  return (
    <div className="h-full w-2/3 bg-gradient-to-br border overflow-hidden gap-2 flex flex-col border-gray-200 from-cyan-100 rounded-2xl to-white">
      {
        flowData && (
          <div className="bg-white/50 space-y-1 border flex justify-between items-center border-gray-300 p-2 rounded-2xl">
            <div>
      <p className="text-sm font-semibold">{flowData?.name}</p>
      <p className="text-xs font-semibold">Lead list : {flowData?.leadListId.name}</p>
      <p className="text-xs font-semibold">Created on : {format(new Date(flowData?.createdAt),"dd/MM/yy")}</p>
            </div>
            <button className="hover:cursor-pointer" onClick={handleDelete}>Delete</button>
      </div>
        )
      }
      <div className="overflow-hidden w-2/3 border-gray-300 p-2 rounded-2xl border flex-1">
      {flowData && <Flow nodes={flowData?.order} leadSource={flowData.leadListId.name}/>}
      </div>
      
    </div>
  )
}

export default Flowchart
