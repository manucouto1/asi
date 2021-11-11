import { useState, useEffect } from "react";
import { map } from "lodash";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import {getIdiomas} from "../../../api/idiomas";
import {getNiveles} from "../../../api/niveles";
import {createCourse} from "../../../api/course";

export default function RegisterForm(props) {
  const [loading, setLoading] = useState(false);
  const [idiomas, setIdiomas] = useState({});
  const [niveles, setNiveles] = useState({});
  const {logout} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await createCourse(formData, logout);
      if (response?._id) {
        toast.success("Curso creado correctamente");
      } else {
        toast.error("Ha habido un error, revise los campos del formulario");
      }

      setLoading(false);
    },
  });

  function myHandlerChangeIdioma( evento ) {
    const value = evento.target.value
    formik.handleChange(evento)
    formik.setFieldValue("idioma", value)
  }

  function myHandlerChangeNivel( evento ) {
    const value = evento.target.value
    formik.handleChange(evento)
    formik.setFieldValue("nivel", value)
  }


  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getIdiomas();
      setIdiomas(response);
      const response2 = await getNiveles();
      setNiveles(response2);
    }
    fetchMyAPI();
  }, []);

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
        
        <Form.Field label="Idiomas:" name="idioma" placeholder='Idiomas' control='select'  
          onChange={myHandlerChangeIdioma} error={formik.errors.idioma} width={4}>
            {map(idiomas, ({nombre, id}) => {
              return <option key={nombre} value={id}>{nombre}</option>
            })}
        </Form.Field>

        <Form.Field label="Nivel:" name="nivel" placeholder='Niveles' control='select'  
          onChange={myHandlerChangeNivel} error={formik.errors.nivel} width={4}>
            {map(niveles, ({codigo, id}) => {
              return <option key={codigo} value={id}>{codigo}</option>
            })}
        </Form.Field>
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

