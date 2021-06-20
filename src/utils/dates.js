export const calculateAgeAtDate = (birthDate, date) => {
    const ageDifMs = date.getTime() - birthDate.getTime();
    return millisToYears(ageDifMs).toFixed(3)
}

const millisToYears = (millis) => {
    return millis / (1000 * 60 * 60 * 24 * 365);
}
