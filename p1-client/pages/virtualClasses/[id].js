import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import VirtualClassDetails from "../../components/VirtualClasses/VirtualClassDetails";

export default function VirtualClasses(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Detalles de un aula virtual"/>
            <div>
                <VirtualClassDetails id={router.query.id} />
            </div>
        </BasicLayout>
    )
}