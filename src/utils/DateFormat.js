import moment from "moment";

export const getDateFormat = (date) => {
    return moment(date).format("MM-DD-YYYY")
};

export const getDateAndHourFormat = (date) =>{
    return moment(date).format("MM/DD/YYYY ")
}