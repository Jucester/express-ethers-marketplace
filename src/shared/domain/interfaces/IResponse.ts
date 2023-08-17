export default interface IResponse {
  statusCode: number;
  response:
    | {
        message?: string;
        error?: {};
      }
    | any;
}
