import { TextField, Grid } from "@mui/material/";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ValidationContext } from "../../context/ValidationProvider";
import { AuthContext } from "../../context/AuthProvider";

import "./ReserveForm.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const textFieldStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
  "& .MuiFormLabel-root": {},
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

export default function ReserveForm(props) {
  const validationData = useContext(ValidationContext);
  const params = useParams();
  // const ValidEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // const ValidPhoneNumberRegex = /[0][7][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);
  let formIsValid = true;

  const [errorMessages, setErrorMessages] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    numberGuests: false,
  });

  const [errorCauseEmail, setErrorCauseEmail] = useState("");
  const [errorCausePhone, setErrorCausePhone] = useState("");
  const [errorCauseNumGuests, setErrorCausNumGuests] = useState("");
  const [eventData, setEventData] = useState({
    eventId: 0,
    venueId: 0,
  });

  // receive eventData from API and update state
  const getEventData = () => {
    axios
      .get(
        `https://tajmautmk.azurewebsites.net/api/Events/GetEventByID?eventId=${params.eventID}`
      )
      .then((response) => {
        setEventData({
          eventId: response.data[0].eventId,
          venueId: response.data[0].venueId,
        });
      });
  };

  useEffect(() => {
    getEventData();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numberGuests: 1,
  });

  function validateData() {
    const { firstName, lastName, email, phone, numberGuests } = formData;

    {
      firstName === ""
        ? flipErrorMessage("firstName", true)
        : flipErrorMessage("firstName", false);
    }
    {
      lastName === ""
        ? flipErrorMessage("lastName", true)
        : flipErrorMessage("lastName", false);
    }

    if (email === "" || !formData.email.match(validationData.emailRegex)) {
      flipErrorMessage("email", true);
      formIsValid = false;
      if (email === "") {
        setErrorCauseEmail("Полето е задолжително")
      }
      else if (!formData.email.match(validationData.emailRegex))
      {
        setErrorCauseEmail("Имаш внесено невалиден емаил")
      }
    } else {
      flipErrorMessage("email", false);
    }

    if (
      phone === "" ||
      !formData.phone.match(validationData.phoneNumberRegex)
    ) {
      flipErrorMessage("phone", true);
      formIsValid = false;
      if (phone === "") {
        setErrorCausePhone("Полето е задолжително")
      }
      else if (!formData.phone.match(validationData.phoneNumberRegex))
      {
        setErrorCausePhone("Имаш внесено невалиден број")
      }
    } else {
      flipErrorMessage("phone", false);
    }

    if (numberGuests === "" || formData.numberGuests <= 0) {
      formIsValid = false;
      flipErrorMessage("numberGuests", true);
      if (numberGuests === "") {
        setErrorCausNumGuests("Полето е задолжително")
      }
      else if (formData.numberGuests === 0)
      {
        setErrorCausNumGuests("Бројот на гости не може да биде 0")
      }
    } else {
      flipErrorMessage("numberGuests", false);
    }
  }

  function flipErrorMessage(name, error) {
    setErrorMessages((prevFormData) => {
      return {
        ...prevFormData,
        [name]: error,
      };
    });
  }

  // NEED TO FINISH WORKING ON THE sendDataToAPI() FUNCTION ===> WORKS WITH THE DATA, CHANGE AUTH
  function sendDataToAPI() {
    setIsLoading(true);
    axios
      .post(
        "https://tajmautmk.azurewebsites.net/api/Reservations/CreateReservation",
        {
          venueId: eventData.venueId,
          userId: context.userId,
          eventId: eventData.eventId,
          numberGuests: formData.numberGuests,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `bearer ${context.authState.authToken}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        setIsLoading(false);
        toast.success("Резервацијата беше успешно испратена!🎉", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        toast.error("Резервацијата не беше успешна...", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        setIsLoading(false);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (context.authState.isAuthenticated === true) {
      validateData();
      if (formIsValid) {
        sendDataToAPI();
      }
    }
    else {
      props.setShowModal(true);
    }
   
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "phone") {
      const inputPhoneNumber = value.replace(/\D/g,'')
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: inputPhoneNumber,
        };
      });
    }
    else if (event.target.name === "numberGuests") {
      const inputNumber = Math.floor(Number(event.target.value));
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: inputNumber,
        };
      });
    }
    else
    {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }

  return (
    <div className="reserveForm">
      <Grid container spacing={2} sx={{ width: "75%" }}>
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
            helperText={errorMessages.firstName ? "Полето е задолжително" : ''}
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
            helperText={errorMessages.lastName ? "Полето е задолжително" : ''}
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
            helperText={errorMessages.email ? errorCauseEmail : ''}
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
            label="Телефон"
            inputMode="numeric"
            type="tel"
            variant="filled"
            fullWidth
            helperText={errorMessages.phone ? errorCausePhone : ''}
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

            label="Број на гости"
            variant="filled"
            fullWidth
            type="number"
            inputProps={{
              step: 1,
              min: 1
            }}
            helperText={errorMessages.numberGuests ? errorCauseNumGuests : ''}
            error={errorMessages.numberGuests}
          />
        </Grid>
        <div className="reservation--buttonDiv">
          <button
            disabled={isLoading}
            type="submit"
            className="btnReservationSubmit"
            onClick={handleSubmit}
          >
            {isLoading ? <LoadingSpinner style="button" /> : "Испрати"}
          </button>
        </div>
      </Grid>
    </div>
  );
}
