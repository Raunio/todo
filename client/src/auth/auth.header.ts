const authHeader = (token: string) => {
    return { Authorization: 'Bearer ' + token };
};

export default authHeader;
