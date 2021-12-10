import Seo from '../../components/Seo'
import BasicLayout from '../../layouts/BasicLayout'
import CreateCourse from '../../components/Auth/CreateCourse'
export default function Register() {
  return (
    <BasicLayout className="register">
      <Seo
        title="Registration Form"
        description="Formulario de registro de usuarios"
      />
      <div className="main-body">
        <CreateCourse />
      </div>
    </BasicLayout>
  )
}
