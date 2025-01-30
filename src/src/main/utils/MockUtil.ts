import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import attendences from '../assets/mock/attendances.json';
import boards from '../assets/mock/boards.json';

let alreadyLogged = false;

export function mockAxios() {
    if (process.env.REACT_APP_ENV !== 'mock') {
        return;
    }
    const baseUrl = "https://trouvaillle.shop"; 
    const mock = new MockAdapter(axios);

    mock.onPost(baseUrl + '/api/v1/access/token').reply(config => {
        return [200, {
            "success":true,
            "data": {
                "accessToken": "accessToken",
                "expiredAt": "expiredAt"
            },
            "errorCode":null,
            "errorMessage":null
        }];
    });

    mock.onGet(baseUrl + '/api/v1/board/all').reply(config => {
        return [200, boards];
    });

    mock.onGet(baseUrl + '/api/v1/attendance/all').reply(config => {
        return [200, attendences];
    });


    if (!alreadyLogged) {
        console.log('%caxios %cmocked', 'color: skyblue;', 'color: inherit;');
        alreadyLogged = true;
    }
}

