export const getJwt = () => {
    return localStorage.getItem('token');
};

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const logout = () =>{
    return localStorage.clear();
};

