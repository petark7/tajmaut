import {TextField, Grid} from '@mui/material/';

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
    return (
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
                    <button 
                    className="btnReservationSubmit"
                    >
                        Испрати
                    </button>
            </div>
        </Grid>
    </div>
    )
}