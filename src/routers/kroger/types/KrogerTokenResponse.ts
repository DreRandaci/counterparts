import { KrogerServiceToken } from "./KrogerServiceToken";

export interface KrogerTokenResponse extends KrogerServiceToken {
  statusCode: number;
}