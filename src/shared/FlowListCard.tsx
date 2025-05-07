import { format } from 'date-fns';

interface FlowListCardProps {
    id: string;
    name: string;
    source: string;
    createdAt: string;
    onClick: (id : string) => void;
}

function FlowListCard({ name, source, createdAt,id, onClick }: FlowListCardProps) {
    const formatDate = format(new Date(createdAt), 'dd/MM/yyyy')
    return (

        <div onClick={()=>onClick(id)} className="max-w-md p-4 bg-white rounded-xl shadow-sm hover:cursor-pointer border border-gray-300 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-sm font-semibold text-gray-600">Source: {source}</p>
            <p className="text-xs text-gray-500">Created at: {formatDate}</p>
        </div>

    )
}

export default FlowListCard
