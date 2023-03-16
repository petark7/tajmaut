import "./MakeReservation.css"
import {TextField, Grid} from '@mui/material/';
import { makeStyles } from '@mui/material';

/* TO DO: CHANGE ACTIVE COLOR */
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

export default function MakeReservation () 
{
    return (
       <div className="background--makeReservation">
           <div className="container--makeReservation">
            <div className="content--makeReservation">
                    <div className="conent--text">
                        <h1 className="content-text--title">Направи резервација</h1>
                        <p className="content-text--paragraph">Внеси ги твоите податоци и испрати ги за проверка.</p>
                        <p className="content-text--paragraph">Доколку е се во ред, ќе бидат одобрени од менаџерот на локалот.</p>
                    </div>
                    <div className="container--selectedEvent">
                        <div className="cardContent--makeReservation">
                            <img 
                            className="cardImage--makeReservation"
                            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                            alt="new"
                            />
                            <div className="cardContent--makeReservation">
                                <h3 className="cardContent--title">DJ IRIE SCRATCH</h3>
                                <h4 className="cardContent--dateHappening">петок - 20/01/23</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reserveForm">
                    <Grid container spacing={2} sx={{ width: '75%' }}>
                        <Grid item xs={12} md={6}>
                            <TextField 
                            required
                            sx={textFieldStyles}
                            label="Име" 
                            variant="filled" 
                            fullWidth

                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField 
                            required
                            sx={textFieldStyles}
                            label="Презиме" 
                            variant="filled" 
                            fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                            required
                            sx={textFieldStyles}
                            label="Email" 
                            variant="filled" 
                            fullWidth
                            />
                        </Grid>
                
                        <Grid item xs={12}>
                            <TextField 
                            required
                            sx={textFieldStyles}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Телефон" 
                            variant="filled" 
                            fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                            required
                            sx={textFieldStyles}
                            label="Број на гости" 
                            variant="filled" 
                            fullWidth
                            type="number"
                            />
                        </Grid>
                        <div className="reservation--buttonDiv">
                                <button className="btnReservationSubmit">Испрати</button>
                        </div>
                    </Grid>
                </div>
            </div>
       </div>
    )
}