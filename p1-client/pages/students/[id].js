import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import StudentDetails from "../../components/Students/StudentDetails";

export default function Student(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Aula virtual" description="Detalles de un aula virtual"/>
            <div>
                <StudentDetails id={router.query.id} />
            </div>
        </BasicLayout>
    )
}