import { Component, OnInit } from '@angular/core';
import { CategoriesService, GlobalService, SubCatService } from '../services';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-blog-title',
  templateUrl: './add-blog-title.component.html',
  styleUrls: ['./add-blog-title.component.css']
})
export class AddBlogTitleComponent implements OnInit {
  isSubmitted = false;
  subCatForm: FormGroup;
  categories = [];
  subCats = [];

  baseUrl: any;

  p = 1;
  Count: number;
  isUpdateField = false;
  updateItemId: any;

  constructor(private category: CategoriesService,
              private formbuilder: FormBuilder,
              private global: GlobalService,
              private subCat: SubCatService) { }

  ngOnInit(): void {
    this.baseUrl = this.global.baseUrl;
    this.subCatForm = this.formbuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      isActive: [true],
    });
    this.getCategories();
    this.getSubCats();
  }

  resetForm(){
    this.isSubmitted = false;
    this.isUpdateField = false;
    this.subCatForm.patchValue({
      name: '',
      description: '',
      category: '',
      isActive: true,
    });
  }

  getCategories(event = 1){
    const param = {};
    this.category.getAllCategories(param).subscribe( res => {
      this.categories = res.data;
      this.Count = res.totalItems;
    });
  }

  getSubCats(event = 1){
    this.global.spin(true);
    const param = {
      initial: event,
      pageSize: 10
    };
    this.subCat.getSubCat(param).subscribe( res => {
      this.global.spin(false);
      this.subCats = res.data;
      this.Count = res.totalItems;
    });
  }

  saveSubCategories(){
    this.isSubmitted = true;
    if (this.subCatForm.invalid) {
       return;
    }
    this.subCat.saveSubCategories(this.subCatForm.value).subscribe(res => {
        this.global.successAlert(res.message);
        this.getSubCats();
        this.resetForm();
      }, (err) => {
        console.log('error', err);
      });
  }

  updateSubCat(){
    this.subCat.updateSubCat({id: this.updateItemId}, this.subCatForm.value).subscribe(res => {
         this.global.successAlert(res.message);
         this.getSubCats();
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
    this.subCatForm.patchValue(editSubC);
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
        this.subCat.deleteSubCat(param).subscribe( res => {
          this.subCats.forEach((e, i) => {
            if (e._id === item._id){
              this.subCats.splice(i, 1);
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
    this.subCat.changeStatus(param).subscribe(res => {
      item.isActive = !item.isActive;
      this.global.successAlert(res.message);
    });
  }

}
