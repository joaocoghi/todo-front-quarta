import { Component } from '@angular/core';
import {ToDo} from '../ToDo'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public lista: ToDo[] = [];
}
