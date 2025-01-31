import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  image: any;
  choosen = false;
  submitted = false;
  user: any;
  edit: boolean = false;
  constructor(public auth: LoginService, private http: HttpClient, private userService: UserService) {
  }
  form = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null, Validators.email),
    password: new FormControl(null),
    address: new FormControl(null),
    phone: new FormControl(null)
  });
  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo(){
    var id  = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getUserInfo(id).subscribe(
      (response) => {
        this.user=response;
        console.log(this.user)
      },
      (error) => {
      }
    );
  }
  openEditView() {
    this.edit = !this.edit;
  }
  Edit() {
    console.log(localStorage.getItem('token'))
    var userName = this.form.controls["username"].value || this.user.userName;
    var email = this.form.controls["email"].value || this.user.email;
    var password = this.form.controls["password"].value;
    var address = this.form.controls["address"].value || this.user.address;
    var phone = this.form.controls["phone"].value || this.user.phoneNumber;
    this.userService.EditUserInfo(this.user.id,userName, email, password, address, phone).subscribe(
        (response) => {
          // this.user = response.user;
          // localStorage.setItem('user', JSON.stringify(this.user));
          this.edit = !this.edit;
          this.getUserInfo();
        },
        (error) => {
          console.log(error);
        }
      );

  }
  openFile() {
    document.getElementById('input_file')!.click();
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
      this.choosen = true;
      this.submitPhoto();
    }
  }


  submitPhoto() {
    console.log(this.user);
    let fd = new FormData();
    this.submitted = true;
    if (this.image) {
      fd.append('Image', this.image, this.image.name);
      console.log(fd)
      this.userService.profilePicture(this.user.id,fd)
        .subscribe(
        (response) => {
          this.getUserInfo();
        },
        (error) => {
          console.log(error);
        }
        );
      //location.reload();
    }
  }
}
