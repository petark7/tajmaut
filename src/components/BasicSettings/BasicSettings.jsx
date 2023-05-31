import "./BasicSettings.css"
import { TextField, Grid } from "@mui/material/";
import {textFieldStyles} from "../../utils/utils"

import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const BasicSettings = () => {

    const authData = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
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

      const fetchUserData = () => {
        axios.get (`https://tajmaut.azurewebsites.net/api/Users/${authData.userId}`
        ,{
            headers: {
                'Authorization': `Bearer ${authData.authState.authToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const {firstName, lastName, email} = response.data;
            // if everything ok
           setFormData({
            firstName: firstName,
            lastName: lastName,
            email: email,
           })
          })
          .catch(error => {
            console.log(error)
          });
      }

      useEffect(() => {
        fetchUserData();
      }, [])

      const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.email.match(/^[a-zA-Z0-9._]{1,100}@[a-zA-Z0-9.-]{2,10}\.[a-zA-Z]{2,6}$/))
        {
            // email is valid
            axios.put(
                `https://tajmaut.azurewebsites.net/api/Users/${authData?.userId}`,
                {
                  "email": formData.email,
                  "firstName": formData.firstName,
                  "lastName": formData.lastName
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
                toast.success("Промените беа успешно зачувани.")
              })
              .catch(error => {
                toast.error("Настана грешка. Пробај повторно.")
              });
        }
        else {
            // email not valid (or something else is the problem?)
            toast.error("Имаш внесено невалиден емаил!")
        }
      }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} sx={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid item xs={12} md={6}>
            <TextField
                required
                name="firstName"
                value= {formData.firstName}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Име"
                variant="filled"
                fullWidth
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                required
                name="lastName"
                value= {formData.lastName}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Презиме"
                variant="filled"
                fullWidth
            />
            </Grid>
            
            <Grid item xs={12} md={12} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <TextField
                required
                name="email"
                value= {formData.email}
                onChange={handleChange}
                sx={textFieldStyles}
                label="E-mail адреса"
                variant="filled"
                fullWidth
            />
            </Grid>
            <div className="reservation--buttonDiv">
          <button
            type="submit"
            className="btnSaveChanges"
          >
            Зачувај промени
          </button>
        </div>
        </Grid>
        </form>
        </div>
    );
}

export default BasicSettings;