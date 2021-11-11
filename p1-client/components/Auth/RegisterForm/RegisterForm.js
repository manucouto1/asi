import { useEffect, useState } from "react";
import { map } from "lodash";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getCourses } from "../../../api/course";
import { createStudent } from "../../../api/student";
import useAuth from "../../../hooks/useAuth";

export default function RegisterForm(props) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState();
  const {logout} = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getCourses();
      setCourses(response);
    })();
  }, [])

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      console.log(formData)
      const response = await createStudent(formData, logout);
      console.log(response)
      if (response?._id) {
        toast.success("Registro completado, El alumno se ha inscrito al curso");
      } else {
        toast.error("Error al registrar el alumno, inténtelo más tarde");
      }

      setLoading(false);
    },
  });

  // function myHandlerSetCourse( evento ) {
  //   const value = evento.target.value
  //   formik.handleChange(evento)
  //   formik.setFieldValue('curso', value)
  // }

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h1>Registro de alumnos</h1>
      <p>Introduzca los datos del nuevo alumno</p>
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
          onChange={formik.handleChange} error={formik.errors.curso}>
            {map(courses, ({id, nombre}) => {
              return <option value={id}>{nombre}</option>
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
    nombre: Yup.string().required(true),
    apellido1: Yup.string().required(true),
    apellido2: Yup.string().required(true),
    edad: Yup.number().required(true),
    email: Yup.string().email(true).required(true),
    curso: Yup.string().required(true)
      
  };
}
