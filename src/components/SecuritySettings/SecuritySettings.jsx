import "./SecuritySettings.css"
import { TextField, Grid } from "@mui/material/";
import {textFieldStyles} from "../../utils/utils"

import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const SecuritySettings = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const authData = useContext(AuthContext);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

    function handleChange(event) {
        const { name, value } = event.target;
    
        {
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              [name]: value,
            };
          });
        }
      }

      const handleFormSubmit = (e) => {
        setShowSpinner(true);
        const {oldPassword, newPassword, confirmPassword} = formData;
        e.preventDefault();
        if (newPassword.length >= 6 && newPassword === confirmPassword)
        {
            // email is valid
            axios.put(
                `https://tajmaut.azurewebsites.net/api/Users/UpdateUserPassword?id=${authData?.userId}`,
                {
                  oldPassword: oldPassword,
                  newPassword: newPassword,
                  confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authData.authState.authToken}`,
                        'Content-Type': 'application/json'
                      }
                }
              )
              .then(response => {
                // if everything ok
                setShowSpinner(false);
                toast.success("Промените беа успешно зачувани.")
              })
              .catch(error => {
                if (error.response.status === 400) {
                  setShowSpinner(false);
                  toast.error("Старата лозинка е погрешна!")
                }
              });
        }
        else {
            // email not valid (or something else is the problem?)
            setShowSpinner(false);
            toast.error("Новата лозинка треба да се совпаѓа и да е барем долга 6 карактери!")
        }
      }
    return (
      <form onSubmit={handleFormSubmit}>
        <div>
          <h1 className='profileDetails-contentDescription'>Промена на лозинка</h1>
            <Grid container spacing={2} sx={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid item xs={12} md={12}>
            <TextField
                required
                name="oldPassword"
                value= {formData.oldPassword}
                onChange={handleChange}
                sx={textFieldStyles}
                type="password"
                label="Стара лозинка"
                variant="filled"
                fullWidth
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                required
                name="newPassword"
                value= {formData.newPassword}
                onChange={handleChange}
                type="password"
                sx={textFieldStyles}
                label="Нова лозинка"
                variant="filled"
                fullWidth
            />
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <TextField
                required
                name="confirmPassword"
                value= {formData.confirmPassword}
                type="password"
                onChange={handleChange}
                sx={textFieldStyles}
                label="Потврди лозинка"
                variant="filled"
                fullWidth
            />
            </Grid>
            <div className="reservation--buttonDiv">
            <button
            type="submit"
            className="btnSaveChanges"
          >
            {showSpinner ? <LoadingSpinner style ="button"/> : "Зачувај промени"}
          </button>
        </div>
        </Grid>
        </div>
        </form>
    );
}

export default SecuritySettings;