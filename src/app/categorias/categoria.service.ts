import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  private categoriasUrl = 'http://localhost:8080/categorias';


  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoriasUrl, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
