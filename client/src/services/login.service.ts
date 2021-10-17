import axios, { AxiosResponse } from 'axios';
import config from '../config/config';
/** Db ORM entities should not be used as models passed in http requests
 but as one of the strength of using a one language stack is the ability to use the same DTOs in the front end and in the back end, 
 and due to the fact that I'm trying to save as much time as possible, I'm not goind to bother with coding the DTOs (although writing this comment probably took as much time as coding the DTOs would have) */
interface LoginResponse {
    user: string;
    token: string;
}
class LoginService {
    static LOGIN_ENDPOINT = '/login';

    static login = async (name: string, password: string) => {
        // TODO: Validation and error handling

        try {
            let response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(config.SERVICE_URL + this.LOGIN_ENDPOINT, { name, password });

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
    };
}

export default LoginService;
