import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import VirtualClassroomDetails from "../../components/VirtualClassrooms/VirtualClassroomDetails";

export default function VirtualClassrooms(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Detalles de un aula virtual"/>
            <div>
                <VirtualClassroomDetails id={router.query.id} />
            </div>
        </BasicLayout>
    )
}