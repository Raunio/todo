const authHeader = () => {
    let token = localStorage.getItem('token');
    if (!token) {
        return '';
    }

    try {
        return 'Bearer ' + JSON.parse(token);
    } catch (e) {
        console.log(`Error while parsing token ${token}`);
    }

    return '';
};

export default authHeader;