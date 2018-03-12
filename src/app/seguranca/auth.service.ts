import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.carregarToken();
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => this.armazenarToken(response.json().access_token))
      .catch(response => {
        const responseJson = response.json();
        if (responseJson.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválido');
        }
        return Promise.reject(response);
      });

  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => this.armazenarToken(response.json().access_token))
      .catch(response => {
        console.error('Erro ao renovar token', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
