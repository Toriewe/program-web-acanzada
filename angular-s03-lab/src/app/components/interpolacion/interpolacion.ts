import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolacion',
  imports: [],
  templateUrl: './interpolacion.html',
})
export class Interpolacion {
  titulo = 'Angular - Sesion 03';
  descripcion = 'La interpolación es una forma de enlazar datos en Angular. Permite mostrar valores dinámicos en la plantilla HTML utilizando expresiones entre llaves dobles {{ }}.';
  totalProducto = 3;
}
