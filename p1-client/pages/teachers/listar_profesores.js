import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import TeacherList from "../../components/Teachers/TeacherList";

export default function Students(){
    return (
        <BasicLayout className="register">
            <Seo title="Profesores" description="Listado de profesores"/>
            <div>
                <TeacherList/>
            </div>
        </BasicLayout>
    )
}
