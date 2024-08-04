import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalOnly]'
})
export class DecimalOnlyDirective {

 constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue: string = inputElement.value;

    // Utiliza una expresión regular para permitir solo números con dos decimales
    const validValue = inputValue.match(/^\d*(\.\d{0,2})?$/);

    if (validValue !== null) {
      inputElement.value = validValue[0];
    } else {
      inputElement.value = '';
    }
  }
}
