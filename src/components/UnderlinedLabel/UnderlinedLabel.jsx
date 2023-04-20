import "./UnderlinedLabel.css"

export default function UnderlinedLabel (props) {
    return (
        <div className="underlinedLabel">
            <h3 className="underlinedLabel--title">{props.label}</h3>
            <div className="underlinedLabel--line"/>
            <h4 className="underlinedLabel--value">{props.value}</h4>
        </div>
    )
}