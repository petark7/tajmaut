import React, { useContext, useEffect, useState } from 'react';
import "./ProfileDetails.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios"
import ReservationHistory from "../../components/ReservationHistory/ReservationHistory.jsx"

import {AuthContext} from "../../context/AuthProvider"
import BasicSettings from '../../components/BasicSettings/BasicSettings';
import SecuritySettings from '../../components/SecuritySettings/SecuritySettings';
import { Navigate } from 'react-router-dom';
function ProfileDetails(props) {
  
  const authContext = useContext(AuthContext);
  const [reservationData, setReservationData] = useState(null)


  const fetchReservationData = () => {
    axios.get(`https://tajmautmk.azurewebsites.net/api/Reservations/GetReservationsByUser?userId=${authContext.userId}`,
    {headers : {
      'Authorization': `bearer ${authContext.authState.authToken}`
    }})
    .then (response => {
      console.log(response.data)
      setReservationData (response.data)
    })
    .catch (error => {
      setReservationData (0)
      console.log(error);
    })
  }

  useEffect(() => {
    fetchReservationData();
  }, [])


    return (
      <>
        {authContext.authState.isAuthenticated != false ? <div className='profileDetails--mainContainer'>
            <h1 className='profileDetails--pageTitle'>Профил</h1>
            <div className='profileDetails--contentContainer'>
                 <ProfileData reservationData={reservationData}/>
            </div>
        </div>
      :
    <>
    <Navigate to="/"/>
    </>
    }
    </>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        style={{ width: "100%"}}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
    function ProfileData({reservationData}) {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ bgcolor: 'background.paper', display: 'flex', height: "100%"}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            width: "250px",
            borderRight: 1,
            borderColor: "divider",
            // Set the color of the selected tab
            "& .Mui-selected": {
              color: "#6455a3 !important", // Change this to the desired color
            },
            "& .MuiTabs-indicator": {
                backgroundColor: "#b2a4ff !important"
            }
          }}
        >
          <Tab label="Општи податоци" {...a11yProps(0)} sx={{ borderBottom: 1, borderColor: 'divider'}} />
          <Tab label="Безбедност" {...a11yProps(1)} sx={{ borderBottom: 1, borderColor: 'divider'}} />
          <Tab label="Резервации" {...a11yProps(2)} sx={{ borderBottom: 1, borderColor: 'divider'}} />
        </Tabs>

        <TabPanel value={value} index={0}>
            <BasicSettings/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SecuritySettings/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <ReservationHistory reservationData={reservationData}/>
        </TabPanel>
      </Box>
    );
  }

export default ProfileDetails;