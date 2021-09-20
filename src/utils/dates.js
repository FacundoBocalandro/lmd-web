export const calculateAgeAtDate = (birthDate, date) => {
    const ageDifMs = date.getTime() - birthDate.getTime();
    return millisToYears(ageDifMs).toFixed(3)
}

const millisToYears = (millis) => {
    return millis / (1000 * 60 * 60 * 24 * 365);
}

export const dateIsValid = (date) => {
    return !!date && (new RegExp("^(?:31([/\\-.])(?:0?[13578]|1[02])\\1|(?:29|30)([/\\-.])(?:0?[13-9]|1[0-2])\\2)(?:1[6-9]|[2-9]\\d)?\\d{2}$|^29([/\\-.])0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\\d|2[0-8])([/\\-.])(?:0?[1-9]|1[0-2])\\4(?:1[6-9]|[2-9]\\d)?\\d{2}$"))
        .test(date)
}

export const isOnOrBeforeToday = (dateString) => {
    const invertedDateString = dateString.slice(3,5) + '/' + dateString.slice(0,2) + '/' + dateString.slice(6,10);
    return (new Date(invertedDateString)) <= (new Date());
}

export const getDateObject = (dateString) => {
    const dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0, 10)
}

export const getAge = (birthDateString, toDateString) =>
{
    const dateParts = toDateString.split("/");
    const toDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    const birthDate = new Date(birthDateString);
    let age = toDate.getFullYear() - birthDate.getFullYear();
    const m = toDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && toDate.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}