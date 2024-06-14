const setRenewal = (next) => {
    const currentDate = new Date();
    if (this.renewal_date && currentDate > this.renewal_date) {
        this.status = true;
    }
    next();
}

module.exports = {
    setRenewal
}