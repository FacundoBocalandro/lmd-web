/**
 * Set selected token.
 * Used to change between users (multi user functionality).
 * @param token: JWT Token which will be selected to use (to fetch information from the backend)
 * @param logout: Redux function to delete stored information
 */
export const setSelectedToken = (token, logout) => {
    const tokens = Object.keys(window.localStorage).filter(key => key.startsWith('token-'));
    tokens.forEach(tokenKey => {
        if (window.localStorage.getItem(tokenKey) === token) {
            const tokenNumber = tokenKey.split('-')[1];
            if (tokenNumber !== window.localStorage.getItem('selected-user')) {
                logout();
                window.localStorage.setItem('selected-user', tokenNumber)
                window.location.reload()
            }
        }
    })
}

/**
 * Clear selected user. Doesn't delete any stored token, but clears selected user
 */
export const clearSelectedUser = () => {
    window.localStorage.removeItem('selected-user');
}

/**
 * Get all tokens from users that are logged in
 * @returns {string[]}: Array of stored tokens
 */
export const getAllStoredTokens = () => {
    const keys = getAllTokenKeys();
    return keys.map(key => window.localStorage.getItem(key));
}

/**
 * Get token keys from localstorage.
 * Token keys have the format token-x, where x is the unique number that identifies the token.
 * @returns {string[]}: Array of keys.
 */
export const getAllTokenKeys = () => {
    return Object.keys(window.localStorage).filter(key => key.startsWith('token-'));
}

/**
 * Save token in the last position and set as selected
 * @param token: JWT token
 */
export const saveNewToken = (token) => {
    const tokenKeys = getAllTokenKeys();
    // Start as 0. If there is no stored token, will remain as 0
    let lastToken = 0;
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]
        // look for the biggest token identifier
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })

    // store new token in last position
    window.localStorage.setItem(`token-${lastToken + 1}`, token);

    // set token as selected
    window.localStorage.setItem('selected-user', `${lastToken + 1}`);
}

/**
 * Removes current token and rearrange other stored tokens to keep order
 */
export const removeCurrentToken = () => {
    //rearrange tokens to be in order
    const selectedUser = window.localStorage.getItem('selected-user');
    const tokenKeys = getAllTokenKeys();
    let lastToken = selectedUser;
    //get last token, which will be moved to the localstorage key where the removed token was.
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]

        // get biggest token key, which will be moved to the key where the current token was
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })

    // remove current token
    window.localStorage.removeItem(`token-${selectedUser}`);
    if (lastToken !== selectedUser) {
        // in case the last token is different from the current one, move the last token to the current position
        window.localStorage.setItem(`token-${selectedUser}`, window.localStorage.getItem(`token-${lastToken}`))
        window.localStorage.removeItem(`token-${lastToken}`)
    }

    clearSelectedUser();
}

/**
 * Save patient id in localstorage for use by doctor
 * @param id
 */
export const saveSelectedPatient = (id) => {
    window.localStorage.setItem('selected-patient', id);
}

/**
 * Remove selected patient id from localstorage
 */
export const removeSelectedPatient = () => {
    window.localStorage.removeItem('selected-patient');
}

/**
 * Fetch selected patient id saved in localstorage
 * @returns {string}
 */
export const getSelectedPatient = () => {
    return window.localStorage.getItem('selected-patient');
}
