export type RequestProp<T, U> = {
    requestBody: T,
    accessToken: string,
    doOnSuccess: (_: U) => void,
    doOnError: (_: Error) => void
};

export type DefaultApiResponse<T> = {
    data?: T,
    success: boolean,
    errorCode?: string,
    errorMessage?: string
};
