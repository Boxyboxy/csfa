import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      ingredients: this.fb.array([new FormControl('')]),
      instruction: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required]),
    });
  }

  // add ingredient to formArray
  onAddIngredient() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('ingredients')).push(control);
  }

  returnFormArray(form: FormGroup, key: string): FormArray {
    return form.get(key) as FormArray;
  }
}
