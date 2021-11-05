import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axiosRequests from "../../generics/axiosShortcuts";
import { useTranslation } from "react-i18next";


export default function LoginView({ loginRefresh }) {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const { t } = useTranslation(["login"]);

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
      loginRefresh(true);
    });
  }

  return (
    <div style={{display: "inline-block", margin: "5% 10%"}}>
      <Paper elevation={3}>
        <div className="title-box">
          <span>{t("basic.userLogin")}</span>
        </div>
        <div style={{padding: "10px", textAlign: "center", width: "250px"}}>
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
          <div style={{textAlign: "right", marginTop: "10px"}}>
            <Button 
              variant="contained"
              onClick={submitData}
              id="login-submit"
            > {t("basic.submit")}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}