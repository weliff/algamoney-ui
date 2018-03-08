import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationService } from 'primeng/components/common/api';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { CategoriaService } from '../categorias/categoria.service';
import { PessoaService } from '../pessoas/pessoa.service';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent, ToastyModule, ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    PessoaService,
    LancamentosService,
    CategoriaService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
