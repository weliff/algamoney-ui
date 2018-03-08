import { ToastyService } from 'ng2-toasty';
import { LancamentosService } from './../lancamentos.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Lancamento } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private lancamentosService: LancamentosService,
    // private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
    this.lancamentosService.adicionar(this.lancamento)
      .then(() => {
        this.toastyService.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      }).catch(error => this.errorHandlerService.handle(error));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
