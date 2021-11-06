import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import GroupList from "../../components/Groups/GroupList";

export default function VirtualClasses(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Lista de grupos del aula virtual"/>
            <div>
                <GroupList/>
            </div>
        </BasicLayout>
    )
}