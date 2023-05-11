import React, { useEffect } from 'react';
import "./VenueReview.css"
import { Rating } from '@mui/material';

const VenueReview = ({ author, rating, datePosted, comment}) => {
    const reviewDetails = {
        author: "",
        rating: 4,
        datePosted: "",
        comment: "",
    }


    return (
        <>
         <div className='venueReview--mainContainer'>
                <div className='venueReview-upperHalf'>
                    <div className='venueReview--user'>
                        <div className='venueReview--userName'>
                            {author}
                        </div>
                        <div className='venueReview--rating'>
                            <Rating name="read-only" value={rating} readOnly />
                        </div>
                    </div>
                    
                    <div className='venueReviews--postDate'>
                        {datePosted}
                    </div>
                </div>

                <div className='venueReview--comment'>
                    {comment}
                </div>
         </div>   
        </>
    );
};

export default VenueReview;