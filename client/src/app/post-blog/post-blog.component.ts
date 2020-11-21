import { Component, OnInit } from '@angular/core';
import { CategoriesService, GlobalService, BlogsService, SubCatService, FieldSubCatService } from '../services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {

  categories: any;
  subCats: any;
  blogForm: FormGroup;
  blogs = [];
  fieldSubCats = [];

  p = 1;
  Count: number;
  baseUrl: any;

  isUpdateField = false;
  updateItemId: any;
  isSubmitted = false;
  currentUser: any;
  isShowComment = false;

  constructor(private category: CategoriesService,
              private formbuilder: FormBuilder,
              private global: GlobalService,
              private blog: BlogsService,
              private subCatSrc: SubCatService,
              private fldSrc: FieldSubCatService) { }

  ngOnInit(): void {
    this.baseUrl = this.global.baseUrl;
    this.currentUser = this.global.getcurrentUser();
    this.blogForm = this.formbuilder.group({
      category: ['', Validators.required],
      subCat: [null],
      fieldSubCats: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      comment: [''],
      blogger: [this.currentUser._id],
      isActive: [false],
    });
    this.getBlogs();
    this.getCategories();
  }

  resetForm(){
    this.isSubmitted = false;
    this.isUpdateField = false;
    this.isShowComment = false;
    this.blogForm.patchValue({
      category: '',
      title: '',
      description: '',
      comment: '',
      subCat: null,
      fieldSubCats: null,
      blogger: this.currentUser._id,
      isActive: false,
    });
  }

  editBlog(item){
    this.global.spin(true);
    this.isUpdateField = true;
    this.isShowComment = true;
    this.updateItemId = item._id;
    const p =  Object.assign({}, item);
    p.category = p.category?._id || null;
    p.subCat = p.subCat?._id || null;
    p.fieldSubCats = p.fieldSubCats?._id || null;

    const param = {
      category: item.category._id,
      isActive: true
    };
    this.getSubCats(param);

    if (item.subCat?._id){
        const Subparam = {
           subCat: item.subCat._id,
            isActive: true
          };
        this.getFieldSubCats(Subparam);
      }

    this.blogForm.patchValue(p);
  }

  getCategories() {
    const param = {
      isActive: true
    };
    this.category.getAllCategories(param).subscribe(res => {
      this.categories = res.data;
    });
  }

  changeCategory(e){
    this.global.spin(true);
    const param = {
      category: e.target.value,
      isActive: true
    };
    this.getSubCats(param);
  }

  getSubCats(param = {}){
    this.subCats = [];
    this.subCatSrc.getSubCat(param).subscribe( res => {
      this.subCats = res.data;
      this.global.spin(false);
    });
  }

  changeSubCategory(e){
    this.global.spin(true);
    const param = {
      subCat: e.target.value,
      isActive: true
    };
    this.getFieldSubCats(param);
  }

  getFieldSubCats(param = {}){
    this.fieldSubCats = [];
    this.fldSrc.getFieldSubCat(param).subscribe( res => {
      this.fieldSubCats = res.data;
      this.global.spin(false);
    });
  }
  getBlogs(event = 1) {
   this.global.spin(true);
   const param = {
      initial: event,
      pageSize: 10
    };
   if (this.currentUser.role !== 'superAdmin'){
      param['id'] = this.currentUser._id;
      param['isActive'] = false;
  }
   this.blog.getBlogs(param).subscribe(res => {
     if (res.result){
       this.global.spin(false);
       this.blogs = res.data;
       this.Count = res.totalItems;
     }
    });
  }

  changeStatus(item){
    const param = {
      _id: item._id,
      isActive: !item.isActive
    };
    this.blog.changeStatus(param).subscribe(res => {
      item.isActive = !item.isActive;
      this.global.successAlert(res.message);
    });
  }

  saveBlog() {
    this.isSubmitted = true;
    if (this.blogForm.invalid) {
       return;
    }
    this.blog.saveBlog(this.blogForm.value).subscribe(res => {
        this.global.successAlert(res.message);
        this.getBlogs();
        this.resetForm();
      }, (err) => {
        console.log('error', err);
      });
  }

   updateBlog(){
    this.blog.updateBlog({id: this.updateItemId}, this.blogForm.value).subscribe(res => {
          this.global.successAlert(res.message);
          this.getBlogs();
          this.resetForm();
        }, (err) => {
          console.log('error', err);
        });
      }

    deleteBlog(item){
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
          this.blog.deleteBlog(param).subscribe( res => {
            this.blogs.forEach((e, i) => {
              if (e._id === item._id){
                this.blogs.splice(i, 1);
              }
            });
            this.global.successAlert(res.message);
          });
        }
      });
  }



}

