import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationService } from 'primeng/components/common/api';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { CategoriaService } from '../categorias/categoria.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    PessoaService,
    LancamentosService,
    CategoriaService,
    AuthService,

    JwtHelper,
    Title,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
