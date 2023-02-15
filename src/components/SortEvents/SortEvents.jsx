import "./SortEvents.css"
import DatePickerElements from "../DatePicker/DatePicker"

export default function SortEvents () {
    return (
        <div className="sortEvents-container">
                <Heading label="Период на прикажување"/>
                <DatePickerElements/>
                <Heading label="Локација"/>
            <select name="city" id="sortEvents-cityDropdown">
                <option value="cela-makedonija">Цела Македонија</option>
                <option value="skopje">Скопје</option>
                <option value="tetovo">Тетово</option>
                <option value="bitola">Битола</option>
                <option value="demir-hisar">Демир Хисар</option>
                <option value="kumanovo">Куманово</option>
                <option value="prilep">Прилеп</option>
                <option value="ohrid">Охрид</option>
                <option value="strumica">Струмица</option>
                <option value="veles">Велес</option>
                <option value="shtip">Штип</option>
                <option value="kavadarci">Кавадарци</option>
                <option value="gostivar">Гостивар</option>
                <option value="kochani">Кочани</option>
                <option value="kichevo">Кичево</option>
                <option value="struga">Струга</option>
            </select>
            <button className="sortEvents-btnPrikazhi">Прикажи</button>
        </div>
    )
}

function Heading (props) {
    return (
        <div className="sortEvents-heading">
            <h1 className="datePickLabel--labelContent">{props.label}</h1>
            <div className="decorativeLine"/>
        </div>
    )
}