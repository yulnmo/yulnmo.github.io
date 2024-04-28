import axios from "axios";
import { DefaultApiResponse, RequestProp } from "./AbstractExchange";


export type BoardResponse = {
    author: string,
    contents: string,
    boardId: string
};

export type BoardRequest = {
    author: string,
    contents: string,
    password: string,
    id?: string
};

class BoardExchange {

    static get baseUrl() { 
        return "https://trouvaillle.shop"; 
    }

    static get({accessToken, doOnSuccess, doOnError}: RequestProp<void, Array<BoardResponse>>) {
        axios.get(
            `${BoardExchange.baseUrl}/api/v1/board/all`, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<Array<BoardResponse>>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static post({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<BoardRequest, BoardResponse>) {
        axios.post(
            `${BoardExchange.baseUrl}/api/v1/board`, 
            requestBody, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<BoardResponse>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static put({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<BoardRequest, BoardResponse>) {
        axios.put(
            `${BoardExchange.baseUrl}/api/v1/board`, 
            requestBody, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<BoardResponse>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static delete({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<BoardRequest, void>) {
        axios.delete(
            `${BoardExchange.baseUrl}/api/v1/board/${requestBody.id}`, 
            {headers: {'X-Access-Token': accessToken, 'X-Password': encodeURIComponent(requestBody.password)}}
        )
            .then(
                (value) => {
                    doOnSuccess();
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }
}

export default BoardExchange;
