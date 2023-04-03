import {TextField, Grid} from '@mui/material/';
import axios from 'axios';
import {useState, useContext, useEffect} from "react"
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

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

export default function ReserveForm () {
    const params = useParams();
    const ValidEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const ValidPhoneNumberRegex = /[0][7][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;
    const context = useContext(AuthContext);
    let formIsValid = true;

    const [errorMessages, setErrorMessages] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        numberGuests: false,
    })

    const [eventData, setEventData] = useState({
        eventId: 0,
        venueId: 0
    });

    // receive eventData from API and update state
    const getEventData = () => {
        axios.get(`https://tajmautmk.azurewebsites.net/api/Events/GetEventByID?eventId=${params.eventID}`)
        .then((response) => {
            setEventData({
                eventId: response.data[0].eventId,
                venueId: response.data[0].venueId,
            })
        }
        )
    }

    useEffect(() => {
        getEventData();
    }, [])

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
                "venueId": eventData.venueId,
                "userId": context.userId,
                "eventId": eventData.eventId,
                "numberGuests": formData.numberGuests,
                "phone": formData.phone,
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `bearer ${context.authState.authToken}`},
          })
             .then((response) => response.json())
             .then((data) => {
                toast.success("Резервацијата беше успешно испратена!🎉", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            })
             .catch((err) => {
                toast.error("Резервацијата не беше успешна. Пробај повторно?", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
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
