import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestService, CategoriesService, GlobalService, BlogsService, UsersService, SubCatService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { BannerHOmeComponent } from './banner-home/banner-home.component';
import { LoginComponent } from './login/login.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SubCatComponent } from './sub-cat/sub-cat.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { EditorModule } from 'primeng/editor';
import { SignupComponent } from './signup/signup.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddFieldComponent } from './add-field/add-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBlogTitleComponent } from './add-blog-title/add-blog-title.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashbordComponent,
    CategoryComponent,
    BannerHOmeComponent,
    LoginComponent,
    SubCatComponent,
    PostBlogComponent,
    SignupComponent,
    ManageUserComponent,
    ChangePasswordComponent,
    AddFieldComponent,
    AddBlogTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    EditorModule,
    BrowserAnimationsModule
  ],
  providers: [RestService, CategoriesService, BlogsService, UsersService, GlobalService, SubCatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
