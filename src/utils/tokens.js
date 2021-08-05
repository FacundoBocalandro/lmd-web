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
