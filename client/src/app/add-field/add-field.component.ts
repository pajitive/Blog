import { Component, OnInit } from '@angular/core';
import { CategoriesService, GlobalService, SubCatService, FieldSubCatService } from '../services';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  isSubmitted = false;
  fieldSubCatForm: FormGroup;
  categories = [];
  subCats = [];
  fieldSubCats = [];

  baseUrl: any;

  p = 1;
  Count: number;
  isUpdateField = false;
  updateItemId: any;

  constructor(private category: CategoriesService,
              private formbuilder: FormBuilder,
              private global: GlobalService,
              private subCat: SubCatService,
              private fieldSubCat: FieldSubCatService) { }

  ngOnInit(): void {
    this.baseUrl = this.global.baseUrl;
    this.fieldSubCatForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      subCat: ['', Validators.required],
      isActive: [true],
    });
    this.getCategories();
    this.getFieldSubCats();
  }

  resetForm(){
    this.isSubmitted = false;
    this.isUpdateField = false;
    this.fieldSubCatForm.patchValue({
      name: '',
      description: '',
      category: '',
      subCat: '',
      isActive: true,
    });
  }

  getCategories(event = 1){
    const param = {};
    this.category.getAllCategories(param).subscribe( res => {
      this.categories = res.data;
    });
  }

  changeCategory(e){
    console.log(e.target.value);
    const param = {
      category: e.target.value
    };
    this.getSubCats(param);
  }
  getSubCats(param = {}){
    this.subCat.getSubCat(param).subscribe( res => {
      this.subCats = res.data;
    });
  }

  getFieldSubCats(event = 1){
  this.global.spin(true);
  const param = {
    initial: event,
    pageSize: 10
  };
  this.fieldSubCat.getFieldSubCat(param).subscribe( res => {
      this.global.spin(false);
      this.fieldSubCats = res.data;
      this.Count = res.totalItems;
    });
  }

  saveFieldSubCategories(){
    this.isSubmitted = true;
    if (this.fieldSubCatForm.invalid) {
       return;
    }
    this.fieldSubCat.saveFieldSubCategories(this.fieldSubCatForm.value).subscribe(res => {
        this.global.successAlert(res.message);
        this.getFieldSubCats();
        this.resetForm();
      }, (err) => {
        console.log('error', err);
      });
  }

  updateFieldSubCat(){
    this.fieldSubCat.updateFieldSubCat({id: this.updateItemId}, this.fieldSubCatForm.value).subscribe(res => {
         this.global.successAlert(res.message);
         this.getFieldSubCats();
         this.resetForm();
       }, (err) => {
         console.log('error', err);
       });
  }

  editCategory(item){
    this.isUpdateField = true;
    this.updateItemId = item._id;
    const editSubC = Object.assign({}, item);
    editSubC.category = item.category._id;
    editSubC.subCat = item.subCat._id;

    const param = {
      category: item.category._id
    };
    this.getSubCats(param);
    this.fieldSubCatForm.patchValue(editSubC);
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
        this.fieldSubCat.deleteFieldSubCat(param).subscribe( res => {
          this.fieldSubCats.forEach((e, i) => {
            if (e._id === item._id){
              this.fieldSubCats.splice(i, 1);
            }
          });
          this.global.successAlert(res.message);
        });
      }
    });
  }

  changeStatus(item){
    const param = {
      _id: item._id,
      isActive: !item.isActive
    };
    this.fieldSubCat.changeStatus(param).subscribe(res => {
      item.isActive = !item.isActive;
      this.global.successAlert(res.message);
    });
  }
}
