import { useState } from "react";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { Form } from "react-final-form";
import { Select, TextField } from "mui-rff";
import { ISignupRequest } from "./type";

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: ISignupRequest) => {
    setErrorMessage(null);

    const { userRoles } = data;

    const body = {
      ...data,
      userRoles: [userRoles],
    };

    await authApi
      .signup(body)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const userOptions = [
    { label: "User", value: "ROLE_USER" },
    { label: "Admin", value: "ROLE_ADMIN" },
  ];

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="username" label="user name" />
            <TextField name="email" label="email" />
            <TextField type="password" name="password" label="password" />
            <Select name="userRoles" data={userOptions} label="role" />
            <Button type="submit">Submit</Button>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </form>
        )}
      />
      <Button type="submit" onClick={() => navigate("/auth/signin")}>
        Sign in
      </Button>
    </>
  );
};
