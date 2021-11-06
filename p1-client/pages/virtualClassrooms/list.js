import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import VirtualClassroomsList from "../../components/VirtualClassrooms/VirtualClassroomsList";

export default function VirtualClassrooms(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Lista de grupos del aula virtual"/>
            <div>
                <VirtualClassroomsList/>
            </div>
        </BasicLayout>
    )
}