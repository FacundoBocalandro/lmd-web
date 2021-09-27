export const calculateAgeAtDate = (birthDate, date) => {
    const ageDifMs = date.getTime() - birthDate.getTime();
    return millisToYears(ageDifMs).toFixed(3)
}

const millisToYears = (millis) => {
    return millis / (1000 * 60 * 60 * 24 * 365);
}

export const dateIsValid = (date) => {
    return !!date && (new RegExp("^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$"))
        .test(date)
}

export const isOnOrBeforeToday = (dateString) => {
    return new Date(dateString) <= new Date();
}

export const getAge = (birthDateString, toDateString) =>
{
    const toDate = new Date(toDateString);
    const birthDate = new Date(birthDateString);
    let age = toDate.getFullYear() - birthDate.getFullYear();
    const m = toDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && toDate.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}