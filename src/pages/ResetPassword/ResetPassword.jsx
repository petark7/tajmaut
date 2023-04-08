import { TextField, Grid } from "@mui/material";
import "./ResetPassword.css";
import {useParams} from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const textFieldStyles = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f0eef7",
    },
    "& .MuiFormLabel-root": {

    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "var(--primaryPurple)",
    },
    "& .MuiFilledInput-root.Mui-focused": {
      color: "#8465ff",
      backgroundColor: "#F6F3FF",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "var(--primaryPurple)",
    },
  };

  const {token} = useParams();
  const [passwordField, setPasswordField] = useState("")
  const [confirmPasswordField, setConfirmPasswordField] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit!");
  }
  return (
    <>
      <div className="resetPage--container">
        <div className="resetForm--container">
          <div className="resetForm">
            <div className="resetForm--heading">
                Промена на лозинка
            </div>
            <div className="resetForm--content">
              <p className="resetPage--helperText">
                Новата лозинка е потребно да содржи комбинација на големи и мали
                букви
              </p>
              <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ justifyContent : "center", width: "100%" }}>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    name="password"
                    sx={textFieldStyles}
                    inputProps={{style: {fontSize: 23}}} 
                    label="Внеси лозинка"
                    value={passwordField}
                    onChange= {(event) => setPasswordField(event.target.value)}
                    type="password"
                    variant="filled"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    name="passwordConfirm"
                    inputProps={{style: {fontSize: 23}}} 
                    sx={textFieldStyles}
                    value={confirmPasswordField}
                    onChange= {(event) => setConfirmPasswordField(event.target.value)}
                    label="Потврди лозинка"
                    type="password"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <button type="submit" className="btnResetPassword">Промени</button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
