import "./AuthenticateForm.css"
import {TextField, Grid} from '@mui/material/';
import {useState} from "react"

const textFieldStyles = {
    "& .MuiInputBase-root": {
        backgroundColor: "white",
    },
    "& .MuiFormLabel-root": {
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: 'var(--primaryPurple)'
    },
    "& .MuiFilledInput-root.Mui-focused": {
        color: "#8465ff",
        backgroundColor: "#F6F3FF"
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--primaryPurple)',
      },
}

export default function AuthenticateForm (props) {
    function handleChange (event) {
        const {name, value} = event.target;

        {
            setFormData((prevFormData) => {
                return (
                    {
                        ...prevFormData,
                        [name]: value
                    }
                )
            })
        }
    }

    function sendDataToAPI(){
        fetch('https://tajmautmk.azurewebsites.net/api/Auth/login', {
            method: 'POST',
            body: JSON.stringify({
                "email": formData.email,
                "password": formData.password,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'accept': "*/*",
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data.accessToken);
                props.handleResults(data.accessToken);
             })
             .catch((err) => {
                console.log(err.message);
             });
          
    }

    function handleSubmit (event) {
        event.preventDefault()
        sendDataToAPI();
    }

    const [formData, setFormData] = useState(
        {
            email: "trajce_2000@hotmail.com",
            password: "123",
        }
    )

    return (
        <div className="authForm">
            {props.authCode !== '' ? <h3 className="authenticatedH3">Authenticated Successfully!</h3> : <h3 className="notAuthenticatedH3">Not Authenticated</h3>}
        <Grid container spacing={2} sx={{ width: '95%' }}>
            <Grid item xs={12}>
                <TextField 
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Email" 
                variant="filled" 
                fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <TextField 
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Password" 
                variant="filled" 
                type="password"
                fullWidth
                />
            </Grid>

            <div className="reservation--buttonDiv">
                    <button 
                    type="submit"
                    className="btnReservationSubmit"
                    onClick={handleSubmit}
                    >
                        Испрати
                    </button>
            </div>
        </Grid>
    </div>
    )
}