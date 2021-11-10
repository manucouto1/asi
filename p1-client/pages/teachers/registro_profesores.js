import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout";
import RegisterTeacherForm from "../../components/Auth/RegisterTeacherForm";

export default function Register(){
    return (
        <BasicLayout className="register">
            <Seo title="Registro profesores" description="Formulario de registro de profesores"/>
            <div className="register__block">
                <RegisterTeacherForm/>
            </div>
        </BasicLayout>
    )
}
