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

  submitForm() {
    const recipe = this.form.value as Recipe;

    console.log(recipe);
    this.recipeService.saveRecipe(recipe).then(() => {
      this.router.navigate(['/']);
      alert('Recipe saved!');
    });
  }
}
