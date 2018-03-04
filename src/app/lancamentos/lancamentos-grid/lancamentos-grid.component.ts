import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  emitirEventoPagina(event: LazyLoadEvent) {
    this.aoMudarPagina.emit(event);
  }

}
