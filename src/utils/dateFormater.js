const dateFormater = (date) => {
    let newDate = new Date(date);
    let formatedDate =
        newDate.getDate() +
        "/" +
        (newDate.getMonth() + 1) +
        "/" +
        newDate.getFullYear() +
        " " +
        " à " +
        newDate.getHours() +
        "h" +
        newDate.getMinutes();
    return formatedDate;
};

export default dateFormater;
