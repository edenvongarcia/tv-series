// Convert time for example 30m to 00:30:00
const timeConverter = props => {
    let hours = Math.floor(props.runtime / 60);  
    let minutes = props.runtime % 60;
    hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
    minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    return hours + ":" + minutes + ":00"; 
};

export default timeConverter;
