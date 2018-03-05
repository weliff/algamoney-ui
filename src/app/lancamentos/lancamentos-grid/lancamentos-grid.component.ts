import { LancamentosService } from './../lancamentos.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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

  constructor(private lancamentosService: LancamentosService) { }

  emitirEventoPagina(event: LazyLoadEvent) {
    this.aoMudarPagina.emit(event);
  }

  excluir(lancamento) {
    this.lancamentosService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.emitirEventoPagina(this.grid);
        } else {
          this.grid.first = 0;
        }
      });
  }

}
