import Seo from '../../components/Seo'
import BasicLayout from '../../layouts/BasicLayout'
import RegisterForm from '../../components/Auth/RegisterForm'

export default function Register() {
  return (
    <BasicLayout className="register">
      <Seo
        title="Registration Form"
        description="Formulario de registro de alumnos"
      />
      <div className="main-body">
        <RegisterForm />
      </div>
    </BasicLayout>
  )
}
