import { Injectable } from '@angular/core';
import { ToDo } from './ToDo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getLista(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  criar(atividade: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, atividade);
  }

  atualizar(id: number, atividade: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.apiUrl}${id}`, atividade);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
