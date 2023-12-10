import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";
import classes from "@/styles/AuthenticationImage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

export function AuthenticationImage() {
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState<{
    message?: string;
    email?: string;
    password?: string;
  }>({});

  //function "loginHanlder"
  const loginHandler = async (e: any) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
      .then((response) => {
        //set token on cookies
        Cookies.set("token", response.data.token);

        //redirect to dashboard
        Router.push("/admin/dashboard");
      })
      .catch((error) => {
        //assign error to state "validation"
        error.response.data.errors
          ? setValidation(error.response.data.errors)
          : setValidation(error.response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token
    if (Cookies.get("token")) {
      //redirect page dashboard
      Router.push("/admin/dashboard");
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Admin Login
        </Title>
        {validation.message && (
          <div className="alert alert-danger">{validation.message}</div>
        )}

        <form onSubmit={loginHandler}>
          <TextInput
            label="Email address"
            placeholder="example@gmail.com"
            size="md"
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validation.email && (
            <div className="text text-danger">{validation.email}</div>
          )}

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            withAsterisk
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validation.password && (
            <div className="text text-danger">{validation.password}</div>
          )}

          <Button fullWidth mt="xl" size="md" bg={"#B0A695"} type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
