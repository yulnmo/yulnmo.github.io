import axios from "axios";
import { DefaultApiResponse, RequestProp } from "./AbstractExchange";

export type TokenResponse = {
    accessToken: string,
    expiredAt: string
};

export type TokenRequest = {
    key: string
};

class AccessExchange {

    static get baseUrl() { 
        return "https://trouvaillle.shop"; 
    }

    static post({doOnSuccess, doOnError}: RequestProp<void, TokenResponse>) {
        const requestBody = {
            'key': 'jOjhRO8eelwmpJ1VN1GAMW4L'
        };

        axios.post(
            `${AccessExchange.baseUrl}/api/v1/access/token`, 
            requestBody
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<TokenResponse>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }
}

export default AccessExchange;
