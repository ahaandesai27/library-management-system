const setFineAmount = () => {
    let date = new Date();
    let return_date = this.return_date;
    let diff = return_date - date;
    let days = diff/(1000*60*60*24);
    if (days > 7) {
        return (days - 7) * 5;
    }
    else {
        return 0;
    }
}

module.exports = {
    setFineAmount
}