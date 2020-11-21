import { Component, OnInit } from '@angular/core';
import { CategoriesService, GlobalService } from '../services';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { constants } from 'buffer';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isSubmitted = false;
  categoriesForm: FormGroup;
  categories = [];

  image: any;
  userImg: any;
  baseUrl: any;

  p = 1;
  Count: number;
  updateItemId: any;
  isUpdateField = false;

  constructor(private category: CategoriesService,
              private formbuilder: FormBuilder,
              private global: GlobalService) { }

  ngOnInit(): void {
    this.baseUrl = this.global.baseUrl;
    this.categoriesForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true],
    });
    this.getCategories();
  }

  resetForm(){
    this.isSubmitted = false;
    this.isUpdateField = false;
    this.categoriesForm.patchValue({
      name: '',
      description: '',
      isActive: true,
    });
  }

  editCategory(item){
    this.isUpdateField = true;
    this.updateItemId = item._id;
    this.categoriesForm.patchValue(item);
  }

  changeStatus(item){
    const param = {
      _id: item._id,
      isActive: !item.isActive
    };
    this.category.changeStatus(param).subscribe(res => {
      item.isActive = !item.isActive;
      this.global.successAlert(res.message);
    });
  }

  getCategories(event = 1){
    this.global.spin(true);
    const param = {
      initial: event,
      pageSize: 10
    };
    this.category.getAllCategories(param).subscribe( res => {
      this.global.spin(false);
      this.categories = res.data;
      this.Count = res.totalItems;
    });
  }

  saveCategories(){
    this.isSubmitted = true;
    if (this.categoriesForm.invalid) {
       return;
    }
    this.category.saveCategories(this.categoriesForm.value).subscribe(res => {
        this.global.successAlert(res.message);
        this.categories.push(res.data);
        this.resetForm();
      }, (err) => {
        console.log('error', err);
      });
  }

  updateCat(){
       this.category.updateCategory({id: this.updateItemId}, this.categoriesForm.value).subscribe(res => {
       this.global.successAlert(res.message);
       this.getCategories();
       this.resetForm();
     }, (err) => {
       console.log('error', err);
     });
  }

  deleteCategory(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const param = {
          id: item._id,
        };
        this.category.deleteCategory(param).subscribe( res => {
          this.categories.forEach((e, i) => {
            if (e._id === item._id){
              this.categories.splice(i, 1);
            }
          });
          this.global.successAlert(res.message);
        });
      }
    });
  }

}
