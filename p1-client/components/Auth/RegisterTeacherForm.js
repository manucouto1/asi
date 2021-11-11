import { useState } from "react";
import { map } from "lodash";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../api/user";
import { toast } from "react-toastify";

export default function RegisterTeacherForm(props) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);
  const options = [
    { key: 'eng', text: 'Ingles B1', value: 'cursoId1' },
    { key: 'fr', text: 'Frances C1', value: 'cursoId2' },
    { key: 'pas', text: 'Aleman A2', value: 'cursoId3' },
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

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h1>Registro de profesores</h1>
      <p>Introduzca los datos del nuevo profesor</p>
      <hr></hr>
      <Form.Group>
        <Form.Input
          label="Nombre:"
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={formik.handleChange}
          error={formik.errors.name}
          width={8}
        />
        
        <Form.Input
          label="Primer apellido:"
          name="apellido1"
          type="text"
          placeholder="Primer apellido"
          onChange={formik.handleChange}
          error={formik.errors.apellido1}
          width={4}
        />
         <Form.Input
          label="Segundo apellido:"
          name="apellido2"
          type="text"
          placeholder="Segundo apellido"
          onChange={formik.handleChange}
          error={formik.errors.apellido2}
          width={4}
        />
        
      </Form.Group>
      <Form.Group>
        <Form.Input
          label="Correo electrónico:"
          name="email"
          type="text"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          error={formik.errors.email}
          width={6}
        />
        <Form.Input
          label="Edad:"
          name="edad"
          type="number"
          placeholder="Edad"
          onChange={formik.handleChange}
          error={formik.errors.edad}
          width={2}
        />
        <Form.Input
          label="Dirección:"
          name="direccion"
          type="text"
          placeholder="Dirección"
          onChange={formik.handleChange}
          error={formik.errors.edad}
          width={8}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        
        <Form.Field label="Cursos:" name="curso" placeholder='Cursos' control='select'  
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
    nombre: "", 
    edad: undefined,
    apellido1: "",
    apellido2: "",
    email: "",
    curso: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    apellido1: Yup.string().required(true),
    apellido2: Yup.string().required(true),
    edad: Yup.number().required(true),
    email: Yup.string().email(true).required(true),
    curso: Yup.string().required(true)
      
  };
}
