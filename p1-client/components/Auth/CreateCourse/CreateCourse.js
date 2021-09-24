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
      <h1>Formulario de creación de cursos</h1>
      <p>Introduzca los datos del curso</p>
      <hr></hr>
      <Form.Group>
        <Form.Input
          label="Nombre:"
          name="nombre"
          type="text"
          placeholder="Nombre"
          onChange={formik.handleChange}
          error={formik.errors.nombre}
          width={8}
        />
        
        <Form.Input
          label="Idioma:"
          name="idioma"
          type="text"
          placeholder="Idioma"
          onChange={formik.handleChange}
          error={formik.errors.idioma}
          width={4}
        />
         <Form.Input
          label="Nivel:"
          name="nivel"
          type="text"
          placeholder="Nivel"
          onChange={formik.handleChange}
          error={formik.errors.nivel}
          width={4}
        />
        
      </Form.Group>
      <Form.Group>
        
        <Form.Input
          label="Minimo de alumnos:"
          name="minimo"
          type="number"
          placeholder="Minimo de alumnos"
          onChange={formik.handleChange}
          error={formik.errors.minimo}
          width={8}
        />
        <Form.Input
          label="Maximo de alumnos:"
          name="maximo"
          type="number"
          placeholder="Máximo de alumnos"
          onChange={formik.handleChange}
          error={formik.errors.maximo}
          width={8}
        />
      </Form.Group>
     
      <div className="actions">
        <Button type="submit" className="submit" loading={loading}>
          Crear
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    nombre: "", 
    idioma: "",
    nivel: "",
    minimo: undefined,
    maximo: undefined,
  };
}

function validationSchema() {
  return {
    nombre: Yup.string().required(true),
    idioma: Yup.string().required(true),
    nivel: Yup.string().required(true),
    minimo: Yup.number().required(true),
    maximo: Yup.number().required(true),
  };
}
