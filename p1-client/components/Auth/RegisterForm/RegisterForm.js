import { useState } from "react";
import { map } from "lodash";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const options = [
    { key: 'alu', text: 'Alumno', value: 'roleId1' },
    { key: 'pdi', text: 'Profesor', value: 'roleId2' },
    { key: 'pas', text: 'Bibliotecario', value: 'roleId3' },
  ]
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);

      if (response?.jwt) {
        showLoginForm();
        toast.success("Registro completado, ya puede iniciar sesión");
      } else {
        toast.error("Error al registrar el usuario, inténtelo más tarde");
      }

      setLoading(false);
    },
  });

  const handleChange = args => {
    const aux = (e, arg) => {
      console.log(e)
      console.log(arg)
      setRole(arg);
    }

    aux(args)
    
    formik.handleChange(args);
  };

  const testhandleChange = (e, args) =>{console.log(e); console.log(args)}

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h1>Registro</h1>
      <p>Introduzca los datos del nuevo usuario</p>
      <hr></hr>
      <Form.Group widths='equal'>
        <Form.Input
          label="Nombre:"
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={testhandleChange}
          error={formik.errors.name}
        />
        <Form.Input
          label="Apellidos:"
          name="lastname"
          type="text"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          label="Nombre de usuario:"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          label="Contraseña:"
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          label="Correo electrónico:"
          name="email"
          type="text"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Field label="Rol:" name="role" placeholder='Role' control='select'  
          onChange={formik.handleChange} error={formik.errors.role}>
            {map(options, ({text, value}) => {
              return <option value={value}>{text}</option>
            })}
        </Form.Field>
    
      </Form.Group>
      
      <div className="actions">
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "", 
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    role: Yup.string().required(true)
      
  };
}
