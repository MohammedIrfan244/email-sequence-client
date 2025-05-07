import FlowListCard from "../../shared/FlowListCard";
import type { IFlow } from "../../pages/Dashboard";


interface IFlowListProps{
  onClick: (id: string) => void;
  loading: boolean;
  flows: IFlow[];
}
function FlowList({loading,onClick,flows}: IFlowListProps) {
  
  return (
    <div className="flex flex-col p-5 bg-gradient-to-b from-cyan-100 border border-gray-200 rounded-2xl to-white h-full w-1/3">
        <div className="overflow-hidden h-20">
      <h1 className="font-semibold text-gray-600">Scheduled Emails</h1>
        </div>
        <div className="overflow-y-auto flex flex-col gap-2 h-full">
            {(loading ) && <p>loading....</p>}
            
            {flows.map((flow:IFlow)=><FlowListCard onClick={()=>onClick(flow.id)} {...flow}/>)}
        </div>
    </div>
  )
}

export default FlowList
