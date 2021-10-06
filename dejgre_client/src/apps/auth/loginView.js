import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axiosRequests from "../../generics/axiosShortcuts";
import { useHistory } from "react-router-dom";


export default function LoginView() {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const t = (t) => t;
  const history = useHistory();

  const onFieldChange = (e) => {
    const fieldName = e.target.getAttribute("field");
    if (fieldName == "pwd")
      setPwd(e.target.value);
    else 
      setUser(e.target.value);
  }

  const submitData = () => {
    axiosRequests.post("/auth/", {username: user, password: pwd}, (resp) => {
      axiosRequests.setAuthToken(resp.data.token);
      history.push("/dashboard");
    });
  }

  return (
    <div>
      <Paper elevation={3}>
        <FormControl variant="standard">
          <InputLabel htmlFor="user-field">{t("basic.username")}</InputLabel>
          <Input
            inputProps={{field: "user"}}
            id="user-field"
            value={user}
            onChange={onFieldChange}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="password-field">{t("basic.password")}</InputLabel>
          <Input
            id="password-field"
            inputProps={{field: "pwd"}}
            type="password"
            value={pwd}
            onChange={onFieldChange}
          />
        </FormControl>
        <div>
          <Button 
            variant="contained"
            onClick={submitData}
          > {t("basic.submit")}
          </Button>
        </div>
      </Paper>
    </div>
  );
}