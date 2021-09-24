import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout"
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Register(){
    return (
        <BasicLayout className="register">
            <Seo title="Registration Form" description="Formulario de registro de usuarios"/>
            <div className="register__block">
                <RegisterForm/>
            </div>
        </BasicLayout>
    )
}
