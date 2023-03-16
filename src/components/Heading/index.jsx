import "./Heading.css"

export default function Heading (props) {
    return (
        <div className="filterEvents-heading">
            <h1 className="datePickLabel--labelContent">{props.label}</h1>
            <div className="decorativeLine"/>
        </div>
    )
}
