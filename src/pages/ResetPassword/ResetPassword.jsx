import { TextField, Grid } from "@mui/material";
import "./ResetPassword.css";
import {useParams, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

  const navigate = useNavigate();
  const {token} = useParams();
  const [passwordField, setPasswordField] = useState("")
  const [confirmPasswordField, setConfirmPasswordField] = useState("")
  const [showSpinner, setShowSpinner] = useState(false);

  const validateData = () => {
    // checks if inputs are the same, then checks for length (<6)
    if (passwordField === confirmPasswordField) {
      if (passwordField.length < 6 || confirmPasswordField.length < 6 ) {
        toast.error("Лозинката мора да долга барем 6 карактери!", {
          position: "bottom-center",
          autoClose: 5000
        })
      }
      else {
        // executes if everything is OK
        return true;
      }
    }
    else {
      toast.error("Лозинките не ти се совпаѓаат.", {
        position: "bottom-center",
        autoClose: 5000
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      token: token,
      password: passwordField,
      confirmPassword: confirmPasswordField,
    }
    
    // unneccessary repeating of validateData?
    if (validateData() === true) {
      setShowSpinner(true);
      axios.post('https://tajmaut.azurewebsites.net/api/Users/UpdateForgotPassword', dataToSend)
      .then((response) => {
        setShowSpinner(false);
        navigate("/")
        toast.success("Твојата лозинка беше успешно променета!", {
          position: "bottom-center",
          autoClose: 5000
        })
      })
      .catch(error => {
        setShowSpinner(false);
        if (error.response.status === 400) {
          toast.error("Новата лозинка мора да е поразлична од старата!", {
            position: "bottom-center",
            autoClose: 5000
          })
        }
        else {
          toast.error("Имаше проблем при испраќање на барањето.", {
            position: "bottom-center",
            autoClose: 5000
          })
        }
        console.log(error.response.data)
      })
    }
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
              <button type="submit" className="btnResetPassword">
                 {showSpinner ? <LoadingSpinner style="button"/> : "Промени лозинка" }
              </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
