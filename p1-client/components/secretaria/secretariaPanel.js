import { Tab } from "semantic-ui-react";
import CourseList from "../../components/Courses/CourseList";
import TeacherList from "../../components/Teachers/TeacherList";
import StudentList from "../../components/Students/StudentList";

export default function SecretariaPanel() {
    const panes = [
        {
            menuItem: 'Cursos',
            render: () => <Tab.Pane attached={false}><CourseList/></Tab.Pane>
        },
        {
            menuItem: 'Profesores',
            render: () => <Tab.Pane attached={false}><TeacherList/></Tab.Pane>
        },
        {
            menuItem: 'Alumnos',
            render: () => <Tab.Pane attached={false}><StudentList/></Tab.Pane>
        }
        
    ]
    return <Tab className="secretaria__tab" menu={{secondary: true, pointing: true}} panes={panes}/>
}