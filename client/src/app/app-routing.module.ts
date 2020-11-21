import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CategoryComponent } from './category/category.component';
import { AdminGuard } from './_helper/admin.guard';
import { LoginComponent } from './login/login.component';
import { SubCatComponent } from './sub-cat/sub-cat.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { SignupComponent } from './signup/signup.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { AddBlogTitleComponent } from './add-blog-title/add-blog-title.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'signup', component: SignupComponent},
  {path: 'dashbord', component: DashbordComponent, canActivate: [AdminGuard] , children: [
    { path: '', redirectTo: 'add-category', pathMatch: 'full' },
    {path: 'add-category', component: CategoryComponent},
    {path: 'manage-users', component: ManageUserComponent},
    {path: 'add-sub-category', component: SubCatComponent},
    {path: 'add-fiels-category', component: AddFieldComponent},
    {path: 'add-blog-title', component: AddBlogTitleComponent},
    {path: 'blog', component: PostBlogComponent},
    {path: 'change-password', component: ChangePasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
