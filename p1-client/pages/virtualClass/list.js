import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import GroupList from "../../components/Groups/GroupList";

export default function VirtualClasses(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Detalles" description="Detalles de un grupo"/>
            <div>
                <GroupList/>
            </div>
        </BasicLayout>
    )
}