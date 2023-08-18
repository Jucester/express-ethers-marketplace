export const MessagesEntity = {
    SUCCESS: "Success",
    ERR_INTERNAL_SERVER: 'Something went wrong',
    ERR_ID_NOT_FOUND: 'Item not found',
    genErrField: (field: string) => `${field} file is required`,
};

export const FormatResponse = (args: {
    statusCode: number;
    response?: any;
    customMessage?: string;
}) => {
    const { statusCode, response, customMessage } = args;
    return {
        statusCode: statusCode,
        response: response ? { ...response } : { message: customMessage },
    };
};
