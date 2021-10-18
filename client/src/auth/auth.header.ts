const authHeader = () => {
    let token = localStorage.getItem('token');
    if (token) {
        return { Authorization: 'Bearer ' + token };
    }

    return { Authorization: '' };
};

export default authHeader;
