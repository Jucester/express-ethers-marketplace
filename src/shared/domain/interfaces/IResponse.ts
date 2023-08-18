export default interface IResponse {
    response:
        | {
              statusCode: number;
              message?: string;
              error?: {};
          }
        | any;
}
