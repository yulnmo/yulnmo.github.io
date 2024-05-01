import axios from "axios";
import { DefaultApiResponse, RequestProp } from "./AbstractExchange";


export type AttendanceResponse = {
    author: string,
    contents: string,
    boardId: string
};

export type AttendanceRequest = {
    id?: string,
    role: string,
    name: string,
    number: number,
    meal: string,
    password: string
};

export const AttendanceRole = {
    GROOM: 'GROOM',
    BRIDE: 'BRIDE'
} as const;

export type AttendanceRole = typeof AttendanceRole[keyof typeof AttendanceRole]; 

export const AttendanceMeal = {
    HAVE: 'HAVE',
    SKIP: 'SKIP',
    UNDECIDED: 'UNDECIDED'
} as const;

export type AttendanceMeal = typeof AttendanceMeal[keyof typeof AttendanceMeal]; 

class AttendanceExchange {

    static get baseUrl() { 
        return "https://trouvaillle.shop"; 
    }

    static get({accessToken, doOnSuccess, doOnError}: RequestProp<void, Array<AttendanceResponse>>) {
        axios.get(
            `${AttendanceExchange.baseUrl}/api/v1/attendance/all`, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<Array<AttendanceResponse>>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static post({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<AttendanceRequest, AttendanceResponse>) {
        axios.post(
            `${AttendanceExchange.baseUrl}/api/v1/attendance`, 
            requestBody, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<AttendanceResponse>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static put({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<AttendanceRequest, AttendanceResponse>) {
        axios.put(
            `${AttendanceExchange.baseUrl}/api/v1/attendance`, 
            requestBody, 
            {headers: {'X-Access-Token': accessToken}}
        )
            .then(
                (value) => {
                    const data = value.data as DefaultApiResponse<AttendanceResponse>;
                    doOnSuccess(data.data!);
                }
            ).catch(
                (error) => {
                    doOnError(error)
                }
            )
    }

    static delete({requestBody, accessToken, doOnSuccess, doOnError}: RequestProp<AttendanceRequest, void>) {
        axios.delete(
            `${AttendanceExchange.baseUrl}/api/v1/attendance/${requestBody.id}`, 
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

export default AttendanceExchange;
