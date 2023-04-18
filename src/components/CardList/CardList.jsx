import React, { useState } from 'react';
import "./CardList.css"
import { Pagination } from '@mui/material';

function CardList(props) {

    const {
      itemsPerPage,
      pageNumber,
      totalItems,
      settings,
      setSettings,
    } = props;
    
    let arrayOfCards = [];
    for (let x = 0; x < props.data.length; x++) {
        arrayOfCards.push(
            <props.card data={props.data[x]}/>
        )
    }


    return (
        <div className='card-list'>
            <div className='cards'>
            {arrayOfCards.length < 1 ? 
             <h1 className="cardList-noDataText">
             Нема податоци со селектираните филтри
             </h1>
            : arrayOfCards}
            </div>
            {props.data.length > 0 ? 
              <div className="cardList-pagination-container">
                <Pagination 
                count={Math.ceil(totalItems / settings.itemsPerPage)} 
                page={settings.pageNumber}
                onChange={(event, value) => {
                    setSettings((prevData) => ({
                        ...prevData,
                        ["pageNumber"] : value
                    }))
                }}
                sx={{
                    "& .Mui-selected": {
                        backgroundColor: "#9B85F7 !important", // set the background color for the selected button
                      color: "#fff" // set the text color for the selected button
                    }
                  }} />
              </div>
           : null}
        </div>
    );
}

export default CardList;