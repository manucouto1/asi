import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import {useRouter} from 'next/router'
import TeacherDetails from "../../components/Teachers/TeacherDetails";

export default function Student(){
    const router = useRouter();
    return (
        <BasicLayout>
            <Seo title="Profesores" description="Detalles de un profesor"/>
            <div>
                <TeacherDetails id={router.query.id} />
            </div>
        </BasicLayout>
    )
}