import { useState } from "react";
import { authApi } from "api";
import { useNavigate } from "react-router";
import { Alert, Button } from "@mui/material";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";

export const Signin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setErrorMessage(null);

    await authApi
      .signin(data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        navigate("/admin/appointments");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="username" />
            <TextField type="password" name="password" />
            <Button type="submit">Submit</Button>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </form>
        )}
      />
      <Button type="submit" onClick={() => navigate("/auth/signup")}>
        Sign up
      </Button>
    </>
  );
};
