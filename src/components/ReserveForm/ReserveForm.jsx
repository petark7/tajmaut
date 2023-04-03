import {TextField, Grid} from '@mui/material/';
import {useState, useContext} from "react"
import {AuthContext} from '../../context/AuthProvider';

import "./ReserveForm.css"
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

export default function ReverseForm () {

    const ValidEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const ValidPhoneNumberRegex = /[0][7][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;
    const authContext = useContext(AuthContext);
    let formIsValid = true;

    const [errorMessages, setErrorMessages] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        numberGuests: false,
    })

    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            numberGuests: 0,
        }
    )

    function validateData () {
        const {firstName, lastName, email, phone, numberGuests} = formData;

        {firstName === "" ? flipErrorMessage("firstName", true) : flipErrorMessage("firstName", false)}
        {lastName === "" ? flipErrorMessage("lastName", true) : flipErrorMessage("lastName", false)}

        if (email === "" || !formData.email.match(ValidEmailRegex)) {
            flipErrorMessage("email", true);
            formIsValid = false;
        }
        else {
            flipErrorMessage("email", false);
        }

        if (phone === "" || !formData.phone.match(ValidPhoneNumberRegex)) {
            flipErrorMessage("phone", true);
            formIsValid = false;
        } else {
            flipErrorMessage("phone", false);
        }

        if (numberGuests === "" || formData.numberGuests <= 0) {
            formIsValid = false;
            flipErrorMessage("numberGuests", true);
        } else {
            flipErrorMessage("numberGuests", false);
        }
    }

    function flipErrorMessage (name, error) {
        setErrorMessages( (prevFormData) => {
            return (
                {
                    ...prevFormData,
                    [name]: error
                }
            )
        })
    }

    // NEED TO FINISH WORKING ON THE sendDataToAPI() FUNCTION ===> WORKS WITH THE DATA, CHANGE AUTH
    function sendDataToAPI(){
        fetch('https://tajmautmk.azurewebsites.net/api/Reservations/CreateReservation', {
            method: 'POST',
            body: JSON.stringify({
                "restaurantId": 2,
                "userId": 1,
                "eventId": 37,
                "numberGuests": formData.numberGuests,
                "phone": formData.phone,
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwNjIiLCJGaXJzdCBOYW1lIjoiVHJhamNlIiwiTGFzdCBOYW1lIjoiU21pbGV2c2tpIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidHJhamNlXzIwMDBAaG90bWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY3OTMyMTUzNn0.7TcxXS_ItEoEN8FvEBUy53HaWofaCQ_L3ULPi4zkFnhQ1_011LNqr93XZJKxwOnfcnhjHXN0yS1i3cU5lJyCjw',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(JSON.stringify(data));
             })
             .catch((err) => {
                console.log(err.message);
             });
          
    }
    
    function handleSubmit (event) {
        event.preventDefault()
        validateData();
        if (formIsValid){
            sendDataToAPI();
        }
    }

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


    return (
        <div className="reserveForm">
        <Grid container spacing={2} sx={{ width: '75%' }}>
            <Grid item xs={12} md={6}>
                <TextField 
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Име" 
                variant="filled" 
                fullWidth
                error={errorMessages.firstName}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField 
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Презиме" 
                variant="filled" 
                fullWidth
                error={errorMessages.lastName}

                />
            </Grid>

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
                error={errorMessages.email}
                />
            </Grid>
    
            <Grid item xs={12}>
                <TextField 
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={textFieldStyles}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                label="Телефон" 
                type="number"
                variant="filled" 
                fullWidth
                error={errorMessages.phone}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField 
                required
                name="numberGuests"
                value={formData.numberGuests}
                onChange={handleChange}
                sx={textFieldStyles}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                label="Број на гости" 
                variant="filled" 
                fullWidth
                type="number"
                error={errorMessages.numberGuests}
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
