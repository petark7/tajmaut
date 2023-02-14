import Navbar from "../components/Navbar"
import DatePicker from "../components/DatePicker/DatePicker"

function Home() {
    return (
        <div className="container--home_page">
              <Navbar/>
              <h1>Home</h1> 
              <DatePicker/>
        </div>
    );
  };
  
  export default Home;
  