import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createStudent } from "../../../api/student";
import useAuth from "../../../hooks/useAuth";

export default function RegisterForm(props) {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await createStudent(formData, logout);
      if (response?._id) {
        toast.success("Registro completado");
        history.push(`/students/${response._id}`);
        
      } else {
        toast.error("Error al registrar al alumno, inténtelo más tarde");
      }

      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h1>Registro de alumnos</h1>
      <p>Introduzca los datos del nuevo alumno</p>
      <hr></hr>
      <Form.Group>
        <Form.Input
          label="DNI:"
          name="dni"
          type="text"
          placeholder="DNI"
          onChange={formik.handleChange}
          error={formik.errors.dni}
          width={8}
        />
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
          label="Teléfono:"
          name="telefono"
          type="text"
          placeholder="Teléfono"
          onChange={formik.handleChange}
          error={formik.errors.telefono}
          width={8}
        />
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
  };
}

function validationSchema() {
  return {
    nombre: Yup.string().required(true),
    apellido1: Yup.string().required(true),
    apellido2: Yup.string().required(true),
    edad: Yup.number().required(true),
    email: Yup.string().email(true).required(true),
  };
}
