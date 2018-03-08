import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let message: string;
    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else {
      message = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toastyService.error(message);
  }

}
