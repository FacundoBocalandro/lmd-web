export const numbersOnly = (value) => {
    return value.replaceAll(/[^0-9]+/g, '');
}

export const numbersAndDecimalsOnly = (value) => {
    const dotIndex = value.indexOf('.');
    if (dotIndex === -1) return numbersOnly(value);
    return value.slice(0, dotIndex + 1).replaceAll(/[^0-9.]+/g, '') + numbersOnly(value.slice(dotIndex + 1))
}
