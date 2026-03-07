const getDateStringWithoutTime = (date?: string) =>
    (date ? new Date(date) : new Date()).toISOString().split("T")[0];

export {
    getDateStringWithoutTime
};