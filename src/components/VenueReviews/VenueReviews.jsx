import "./VenueReviews.css";
import { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import VenueReview from "../VenueReview/VenueReview";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import {getDateTimeDay} from "../../utils/utils"
import NotLoggedModal from "../NotLoggedModal/NotLoggedModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const labels = {
  1: "Катастрофа",
  2: "Слабо",
  3: "Океј",
  4: "Многу добар",
  5: "Одличен",
};

// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
// }

const VenueReviews = () => {
  const authContext = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(false)
  const {venueID} = useParams();
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [reviewList, setReviewList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    venueId: venueID,
    body: "",
    rating: value,
  });

  const fetchReviews = () => {
      axios.get(`https://tajmaut.azurewebsites.net/api/Comments/GetCommentsByVenueID?venueId=${venueID}`)
      .then (response => {
        console.log(response.data)
        const reviews = response.data.map((review) => {
          return (
            <VenueReview
              author={review.userFirstName}
              rating={review.review}
              datePosted={getDateTimeDay(review.dateTime).date}
              comment={review.body}
            />
          );
        });
        setReviewList(reviews);
      })
      .catch (error => {
        toast.error(JSON.stringify(error.response.data.title))
      })
  }
  useEffect(() => {
    fetchReviews();
  }, [])

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    {
      console.log(formData.body)
      if (authContext.authState.isAuthenticated) {
        if(formData.body !== "") {
          setShowSpinner(true);
          axios
          .post(
            `https://tajmaut.azurewebsites.net/api/Comments/CreateComment`,
            {
              venueId: formData.venueId,
              body: formData.body,
              review: formData.rating,
            },
            {
              headers: {
                Authorization: `bearer ${authContext.authState.authToken}`,
              },
            }
          )
          .then((response) => {
            setShowSpinner(false);
            fetchReviews();
            toast.success("Оцената беше успешно испратена!");
            formData(
              setFormData((prevData) => ({
                ...prevData,
                body: "",
              }))
            );
          })
          .catch((error) => {
            if (error.response.data.status === 400) {
              toast.error("Потребно е да внесиш коментар!")
            }
            else {
              toast.error("Настана неочекувана грешка...")
            }
            setShowSpinner(false);
            console.log(error.response.data.status);
          });
        }
        else {
          toast.error("Потребно е да внесиш коментар!")
        }
      } else {
        setShowModal(true);
      }
    }
  };

  return (
    <>
     {showModal ? (
            <div
              id="myModal"
              className="modal"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <NotLoggedModal
                showModal={showModal}
                setShowModal={setShowModal}
                onClick={(e) => e.stopPropagation()}
                customHeader="Мора да си најавен/а за да оставиш коментар!"
              />
            </div>
          ) : null}
      <div className="venueReviews--leaveReviewLabel">Оцени го локалот</div>
      <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          sx={{ fontSize: "40px" }}
          name="rating"
          value={value}
          precision={1}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleChange(event);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <TextareaAutosize
        name="body"
        aria-label="empty textarea"
        value={formData.body}
        onChange={handleChange}
        placeholder="Додади коментар..."
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "100px",
          marginTop: "10px",
          fontSize: "17px",
          fontFamily: "Ubuntu",
          borderRadius: "7px",
          border: "1px solid rgb(204, 204, 204)",
          padding: "10px"
        }}
      />
      <a class="bn1" onClick={handleSubmit}>
        {showSpinner === true ? <LoadingSpinner style="button"/> : "Испрати оцена"}
      </a>
      </form>
      <div className="decorativeLine-thin" />
      <div className="venueReviews--comments">Што велат другите</div>
      <div className="venueReviews--reviewList">
        {reviewList}
      </div>
    </>
  );
};

export default VenueReviews;
