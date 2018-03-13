import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  private revokeTokenUrl: string;

  constructor(
    private http: AuthHttp,
    private authService: AuthService
  ) {
    this.revokeTokenUrl = `${environment.apiUrl}/tokens/revoke`;
   }

  logout() {
    return this.http.delete(this.revokeTokenUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }
}
