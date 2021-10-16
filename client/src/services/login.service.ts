import axios from 'axios';
import config from '../config/config';
import { Account } from '../../../server/src/entity/account';
/** Db ORM entities should not be used as models passed in http requests
 but as one of the strength of using a one language stack is the ability to use the same DTOs in the front end and in the back end, 
 and due to the fact that I'm trying to save as much time as possible, I'm not goind to bother with coding the DTOs (although writing this comment probably took as much time as coding the DTOs would have) */
interface TokenResponse {
    token: string;
}
class LoginService {
    static LOGIN_ENDPOINT = '/login';

    static login = async (account: Account) => {
        try {
            const response = await axios.post<TokenResponse>(config.SERVICE_URL + this.LOGIN_ENDPOINT, { name: account.name, password: account.password });
            localStorage.setItem('token', response.data.token);
            console.log('Login successful');
        } catch (e) {}
    };
}
