import { ReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import LeadNode from "../../shared/LeadNode";
import EmailNode from "../../shared/EmailNode";
import DelayNode from "../../shared/DelayNode";


interface IOrder {
    _id: string;
    type: "email" | "delay";
    templateId?: {
        _id: string;
        name: string;
    };
    delay?: number;
}

interface IFlowProp {
    nodes: IOrder[];
    leadSource: string;
}

function xWidth() {
    const screenWidth = window.innerWidth; 
    console.log((4 / 9) * screenWidth)
    return (2 / 9) * screenWidth-95;
  }

const formattedNodes = ({ nodes, leadSource }: IFlowProp) => {
    let ids = "1"
    const leadBlock = {
        id: ids,
        position: { x: xWidth(), y: 0 },
        data: { name: leadSource },
        type: 'leadSource',
        connectable: true,
    }
    const emailBlocks = nodes.map((node, index) => {
        ids = `${index + 2}`
        return {
            id: ids,
            position: { x: xWidth(), y: (index + 1) * 100 },
            data: node.type === "email" ? { name: node.templateId?.name } : { time: node.delay },
            type: node.type === "email" ? 'emailTemplate' : 'delay',
            connectable: true,
        }
    })
    return [leadBlock, ...emailBlocks]
}

const formattedEdges = (nodes: IOrder[]) => {
    let ids = "1"
    const edges = nodes.map((_, index) => {
        ids = `${index + 2}`
        return { id: `e${ids}`, source: `${index + 1}`, target: `${index + 2}` }
    })
    return edges
}

const nodeTypes = {
    leadSource: LeadNode,
    emailTemplate: EmailNode,
    delay: DelayNode,
};

function Flow({ nodes, leadSource }: IFlowProp) {
    const initialNodes = formattedNodes({ nodes, leadSource });
    const initialEdges = formattedEdges(nodes);
    return (
        <div className="h-full w-full">
            <div className="py-3">
            <h3 className="font-semibold">Execution Sequence :</h3>
            </div>
            <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} />
        </div>
    );
}

export default Flow;
