import type { NodeProps , Node } from '@xyflow/react';
import { FaUser } from 'react-icons/fa';
import { Position , Handle } from '@xyflow/react';

type LeadNodeData = Node<
{
    name:string;
},
'leadSource'
>

function LeadNode({ data }: NodeProps<LeadNodeData>) {
    return (
     <>
      <div className="bg-white border border-gray-300 items-center justify-between rounded-lg p-3 w-48 shadow-sm flex gap-1">
        <div>
            <FaUser className="text-gray-500" size={24} />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">Lead Source :</h3>
            <p className="text-sm text-gray-500">{data.name}</p>
        </div>
      </div>
        <Handle type='source' position={Position.Bottom} style={{backgroundColor:"gray", height:'2px'}}/>
     </>
    );
  }

  export default LeadNode;
