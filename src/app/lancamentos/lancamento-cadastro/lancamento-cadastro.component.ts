import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/model';
import { LancamentosService } from './../lancamentos.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';

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
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  carregarLancamento(codigo: number) {
    this.lancamentosService.buscarPorCodigo(codigo)
      .then(lancamento => this.lancamento = lancamento)
      .catch(error => this.errorHandlerService.handle(error));
  }

  salvar(form: FormControl) {
    if (this.lancamento.novo) {
      this.adicionar(form);
    } else {
      this.atualizar(form);
    }
  }

  adicionar(form: FormControl) {
    this.lancamentosService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.toastyService.success('Lançamento adicionado com sucesso!');
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
        // form.reset();
        // this.lancamento = new Lancamento();
      }).catch(error => this.errorHandlerService.handle(error));
  }

  atualizar(form: FormControl) {
    this.lancamentosService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento; // caso o backend faça alguma transformação seria mostrado na tela (segurança dos dados)
        this.toastyService.success('Lançamento alterado com sucesso!');
      }).catch(this.errorHandlerService.handle.bind(this.errorHandlerService));
  }

  private carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  private carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }


}
