import { Corpus } from './corpus';

export class AuthorizedSitesResponse {
  username: string |undefined;
  email: string |undefined;
  pub: string |undefined;
  role: string |undefined;
  sites: Corpus[] |undefined;
}
