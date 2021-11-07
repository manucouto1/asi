import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import CourseList from "../../components/Courses/CourseList";

export default function Courses(){
    return (
        <BasicLayout className="register">
            <Seo title="Cursos" description="Listado de cursos"/>
            <div>
                <CourseList/>
            </div>
        </BasicLayout>
    )
}
