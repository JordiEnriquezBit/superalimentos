import { Food } from './../../shared/interfaces/Food';
import { Component, OnInit } from '@angular/core';
import foods from 'src/app/shared/data/foods';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {

  items: Food[] = foods;

  texto:string = "";
  formFlag:boolean = false;
  formGroup : FormGroup;


  constructor(private fb: FormBuilder) {}
  todayFoodList: Food[] = [];
  ngOnInit(): void {}

  ngAfterViewInit(){
    this.buildForm();
  }
  private buildForm(){

    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      image:['', [Validators.required]],
      quantity:[1,[]]

    });
  }

  public getError(controlName: string): string[] {
    let error =  [];
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
     // error = JSON.stringify(control.errors);
      error = [...Object.keys(control.errors)];
    }
    return error;
  }
  add(item) {
    if (item.quantity > 0) {
      let index = this.checkIndexByName(item);

      if (index != -1) {
        this.todayFoodList[index].quantity += item.quantity;
      } else {
        this.todayFoodList.push(item);
      }
    }
  }

  saveRecord(){
    let item = this.formGroup.value;

    if (item.quantity > 0) {
      let index = this.checkIndexByName(item);

      if (index == -1) {
        item.image ="https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png";
        this.items.push(item);
        this.texto="";
        console.log(this.items)
      }
    }
  }

  checkIndexByName(item) {
    let index = this.items.findIndex((data) => item.name == data.name);

    return index;
  }
}
