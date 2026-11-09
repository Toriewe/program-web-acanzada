import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  imports: [],
  templateUrl: './binding.html',
})
export class Binding {
  productoNombre = 'Coca Cola';
  seleccionado = true;

  seleccionar(): void {
    this.seleccionado = true;
  }

}
