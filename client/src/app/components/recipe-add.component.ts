import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Recipe } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      ingredients: this.fb.array([
        new FormControl('', [Validators.required, Validators.minLength(3)]),
      ]),
      instruction: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      image: this.fb.control('', [Validators.required]),
    });
  }

  // add ingredient to formArray
  onAddIngredient() {
    const control = new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]);
    (<FormArray>this.form.get('ingredients')).push(control);
  }

  returnFormArray(form: FormGroup, key: string): FormArray {
    return form.get(key) as FormArray;
  }

  removeIngredientControl(i: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }

  createId(length: number): string {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  submitForm() {
    let recipe: Recipe = {
      id: this.createId(5),
      title: this.form.value.title,
      ingredients: this.form.value.ingredients,
      instruction: this.form.value.instruction,
      image: this.form.value.image,
    };

    console.log(recipe);
    this.recipeService.saveRecipe(recipe);
    this.router.navigate(['/']);
  }
}
