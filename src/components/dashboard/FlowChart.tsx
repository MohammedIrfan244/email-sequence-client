import { useEffect, useState } from "react";
import axiosErrorManager from "../../utils/axiosErrorManager";
import axiosInstance from "../../utils/axiosInstance";


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
  const fetchFlow = async (id:string) => {
    setLoading(true)
    try{
      console.log(id,"id")
      const res = await axiosInstance.get(`/flow/get-flow/${id}`)
      setFlowData(res.data.flow)
      console.log(res.data.flow,"flow data")
    }catch(err){
      console.log(axiosErrorManager(err))
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchFlow(id.id)
  },[id])
  return (
    <div className="h-full w-2/3 bg-gradient-to-br border border-gray-200 from-cyan-100 rounded-2xl to-white">
      
    </div>
  )
}

export default Flowchart
