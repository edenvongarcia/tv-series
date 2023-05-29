// Get the year from the date
const getSeriesYear = (props) => {
    if (props.premiered != null) {
        const premier = props.premiered;
        let premierArray = premier.split("-");
        return premierArray[0];
    } else {
        return 'Year Not Available';
    }
};

export default getSeriesYear;
