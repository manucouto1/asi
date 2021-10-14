import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";

export default function LoginForm(props) {
  const { onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
        toast.success("Bienvenido");
      } else {
        toast.error("El email o la contraseña son incorrectors");
      }
      setLoading(false);
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email(true).required(true);

    if (validateEmail.isValidSync(formik.values.identifier)) {
      resetPasswordApi(formik.values.identifier);
    } else {
      formik.setErrors({ identifier: true });
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
