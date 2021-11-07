import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import StudentList from "../../components/Students/StudentList";

export default function Students(){
    return (
        <BasicLayout className="register">
            <Seo title="Alumnos" description="Listado de alumnos"/>
            <div>
                <StudentList/>
            </div>
        </BasicLayout>
    )
}
