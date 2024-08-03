import {FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const validarQueSeanMayor: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const cantidad = control.get("cantidad")
  const stock_minimo = control.get("stock_minimo")

  return cantidad.value > stock_minimo.value
    ? null
    : { noesMayor: true }
}



export const StockMayor: ValidationErrors = (
  control: FormControl
): ValidationErrors | null =>  {
  const cantidad = control.get("cantidad")
    if (cantidad.value>=1)
      return null;
    else
      return { dominioemail: true }
  
}