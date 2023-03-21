import "./CreateEventForm.css"
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

export default function CreateEventForm () {

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

    function handleSubmit (event) {
        event.preventDefault()

    }

    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            numberGuests: 0,
        }
    )

    return (
        <div className="reserveForm">
        <Grid container spacing={2} sx={{ width: '75%' }}>
            <Grid item xs={12}>
                <TextField 
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={textFieldStyles}
                label="Име" 
                variant="filled" 
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