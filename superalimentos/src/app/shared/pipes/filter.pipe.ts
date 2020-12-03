import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  //Filtrar un array de objetos por uno de los campos
  // ejemplo. alimentos = [{name:'pizza', calories:'400', image:'https://miimagen.com'}, ]
  transform(value: any,textoFilter:string): any {

    const result = value.filter((food) => {
      let nameValid = false;


      if (textoFilter.trim() !="") {
        if (food.name.toLowerCase().indexOf(textoFilter.toLowerCase()) != -1) {
          nameValid = true;
        }
      }else{
        nameValid = true;
      }

      return (nameValid);
    });

    return result;
  }
}
