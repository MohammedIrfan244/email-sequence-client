import type { NodeProps , Node } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { MdEmail } from "react-icons/md";

type DelayNodeData = Node<
{
    time:string;
},
'delay'
>

function DelayNode({ data }: NodeProps<DelayNodeData>) {
    return (
      <>
      <Handle type='target' position={Position.Top} style={{backgroundColor:"gray", height:'2px'}}/>
      <div className="bg-white border border-gray-300 items-center justify-between rounded-lg p-3 w-48 shadow-sm flex gap-1">
        <div>
            <MdEmail className="text-gray-500" size={24} />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">Wait/Delay</h3>
            <p className="text-sm text-gray-500">{data.time} Hours</p>
        </div>
      </div>
      <Handle type='source' position={Position.Bottom} style={{backgroundColor:"gray", height:'2px'}}/>
      </>
    );
  }

  export default DelayNode;
