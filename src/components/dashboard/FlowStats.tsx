import { useEffect, useState } from "react";
import axiosErrorManager from "../../utils/axiosErrorManager";
import axiosInstance from "../../utils/axiosInstance";
interface ILeadClient {
    name: string;
    email: string;
    company: string;
}

interface IstatProp {
    leadListId: string
}

function FlowStats({ leadListId }: IstatProp) {
    const [leads, setLeads] = useState<ILeadClient[]>([])
    const [list,setList]=useState<string>("")

    const fetchLeads = async (id:string)=>{
        try {
            const res = await axiosInstance(`/lead/get-list/${id}`)
            setLeads(res.data.leads)
            setList(res.data.list.name)
        } catch (err) {
            console.log(axiosErrorManager(err))
        }
    }

    useEffect(()=>{
        fetchLeads(leadListId)
    },[leadListId])
    return (
        <div className="p-2 space-y-2 h-full">
            <h3 className="font-semibold text-gray-800">Lead list info :</h3>
            <p className="font-semibold">{list}</p>
            <div className="overflow-y-auto space-y-2 h-full">
            {
                leads.map((lead)=>{
                   return (
                    <div className="bg-white border border-gray-300 rounded-xl p-2">
                        <p>{lead.name}</p>
                        <p>{lead.email}</p>
                        <p>{lead.company}</p>
                    </div>
                   )
                })
            }
            </div>
        </div>
    )
}

export default FlowStats
