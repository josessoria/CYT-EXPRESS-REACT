import React, { useContext } from "react";
import { Or } from "../../components/Or";
import { AuthBody } from "../../components/AuthBody";
import { AuthForm } from "../../components/AuthInputForm";
import { AuthFooter } from "../../components/AuthFooter";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthSubmit } from "../../components/AuthSubmit";
import { ContinueWithGoogle } from "../../components/ContinueWithGoogle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

import "./Auth.scss";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const authContext = useContext(AuthContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    handleValidation(name, value);
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    handleValidation(name, value);
  };

  const handleValidation = (name: any, value: any) => {
    let newErrors = { ...errors };

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          newErrors.email = "Por favor, ingresa un correo electrónico válido.";
        } else {
          newErrors.email = "";
        }
        break;
      case "username":
        if (!validateUsername(value)) {
          newErrors.username =
            "El username solo puede contener letras, números y guiones bajos (_).";
        } else {
          newErrors.username = "";
        }
        break;
      case "password":
        const passwordError = validatePassword(value);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          newErrors.password = "";
        }
        break;
      case "repeatPassword":
        if (value !== data.password) {
          newErrors.repeatPassword =
            "Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.";
        } else {
          newErrors.repeatPassword = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleRegister = async () => {
    let valid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    };

    if (!validateEmail(data.email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
      valid = false;
    }

    if (!validateUsername(data.username)) {
      newErrors.username =
        "El username solo puede contener letras, números y guiones bajos (_).";
      valid = false;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
      valid = false;
    }

    if (data.password !== data.repeatPassword) {
      newErrors.repeatPassword =
        "Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      if (authContext) {
        await authContext.register(data);
        window.location.reload();
      }
    } catch (error:any) {
      console.log(error);
      toast.error(String(error.response.data.message));
    }
  };

  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (username.length < 3 || username.length > 20) {
      return false;
    }
    if (!regex.test(username)) {
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    // Verificar longitud de la contraseña
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (password.length > 20) {
      return "La contraseña no puede tener más de 20 caracteres.";
    }

    // Verificar patrón de caracteres
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/;
    if (!regex.test(password)) {
      return "La contraseña debe incluir una mayúscula, un número y un carácter especial.";
    }

    return "";
  };

  const validateEmail = (email: string) => {
    // Expresión regular para validar el formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const inputs = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      onBlur: handleBlur,
      onChange: handleChange,
    },
    {
      label: "Repeat password",
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat your password",
      onBlur: handleBlur,
      onChange: handleChange,
    },
  ];

  return (
    <AuthBody>
      <AuthHeader title="Register" description="Register a new account" />
      <ContinueWithGoogle />
      <Or />
      <AuthForm inputs={inputs} handleChange={handleChange} errors={errors} />
      <AuthSubmit label="Register" onClick={() => handleRegister()} />
      <AuthFooter
        href="/login"
        label="You registered yet?"
        hrefLabel="Click here"
      />
    </AuthBody>
  );
};

export default Register;
