import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ToastyService, toastyServiceFactory } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { LancamentosService } from './../lancamentos.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];

  @Input() itensPorPagina: number;

  @Input() totalRegistros: number;

  @Output() aoMudarPagina = new EventEmitter<LazyLoadEvent>();

  @ViewChild('tabela') grid;

  constructor(private lancamentosService: LancamentosService, private toastyService: ToastyService,
    private confirmationService: ConfirmationService) { }

  emitirEventoPagina(event: LazyLoadEvent) {
    this.aoMudarPagina.emit(event);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento) {
    this.lancamentosService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.emitirEventoPagina(this.grid);
        } else {
          this.grid.first = 0;
        }
        this.toastyService.success('Lançamento excluído com sucesso');
      });
  }

}
