import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';
import { ToDo } from '../ToDo';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public lista = signal<ToDo[]>([]);
  public nome = '';
  private servico: TodoService;
  public editandoId: number | null = null;

  constructor(servico: TodoService) {
      this.servico = servico;
  }

  ngOnInit(): void {
      this.servico.getLista().subscribe((data: ToDo[]) => {
          this.lista.set(data);
      });
  }

  adicionar(): void {
      if (!this.nome.trim()) {
          return;
      }
      const atividade = new ToDo(null, this.nome);
      this.servico.criar(atividade).subscribe((data: ToDo) => {
          this.lista.update((lista) => [...lista, data]);
          this.limparFormulario();
      });
  }

private limparFormulario(): void {
  this.nome = '';
}

editar(atividade: ToDo): void {
  this.editandoId = atividade.id;
  this.nome = atividade.nome;
}

excluir(id: number | null): void {

}

salvar(): void {
  if (this.editandoId === null || !this.nome.trim()) {
    return;
  }
  const atividade = new ToDo(this.editandoId, this.nome);
  this.servico.atualizar(this.editandoId, atividade).subscribe((data: ToDo) => {
    this.lista.update((lista) => lista.map((item) => (item.id === data.id ? data : item)));
    this.editandoId = null;
    this.limparFormulario();
  });
}

}
