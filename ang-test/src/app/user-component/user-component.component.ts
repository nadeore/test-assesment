import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserServiceService} from '../service/user-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponentComponent implements OnInit {
  @Input() dialogClass: string;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  visible = false;
  visibleAnimate = false;
  dVisible = false;
  dVisibleAnimate = false;
  userForm: FormGroup;
  submitted = false;
  userTitle: String;
  userButton: String;
  users: [];
  userid: any;
  del_id: any;
  user_Id: { id: any };
  constructor(private fb: FormBuilder, private apiService: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.getUserList();
    this.userForm = this.fb.group({
      index: [{value: null, disabled: true}],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      profile: ['']
    });
  }
  get f() { return this.userForm.controls; }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      // console.log(this.userForm.value);
      const index = this.userForm.getRawValue().index;
      if (index == null) {
        const uploadData = new FormData();
        uploadData.append('allData', JSON.stringify(this.userForm.value));
        uploadData.append('profile', this.userForm.get('profile').value);
        // console.log(uploadData);
        this.apiService.createUser(uploadData).subscribe((data: any) => {
          if (data.status === true) {
            alert(data.message);
            this.getUserList();
            this.hide();
            this.userForm.reset();
          } else {
            alert('Error');
          }
        });
      } else {
        const uploadData = new FormData();
        uploadData.append('allData', JSON.stringify(this.userForm.value));
        // uploadData.append('id', index);
        this.apiService.updateUser(index, uploadData).subscribe((data: any) => {
          if (data.status === true) {
            alert(data.message);
            this.getUserList();
            this.hide();
            this.userForm.reset();
          } else {
            alert('Error');
          }
        });
      }
    }
  }

  getUserList() {
    this.apiService.getUser().subscribe((data: any) => {
        this.users = data.msg;
        console.log(this.users);
    });
  }

  userAdd() {
    this.show();
    this.userForm.reset();
    this.userTitle = 'Add New user';
    this.userButton = 'Save';
  }
  userEdit(user) {
    console.log(user);
    this.show();
    this.userTitle = 'Updated user Name';
    this.userButton = 'Update';
    this.userForm.setValue({
      index: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      profile: user.profile
    });
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
      this.dHide();
    }
  }


  userDelete(_id: any) {
    this.dShow();
    this.del_id = [this.userid = _id];
  }

  public dShow(): void {
    this.dVisible = true;
    setTimeout(() => this.dVisibleAnimate = true, 100);
  }

  public dHide(): void {
    this.dVisibleAnimate = false;
    setTimeout(() => this.dVisible = false, 300);
  }

  userDel(userid: any) {
    this.apiService.deleteUser(userid).subscribe((data: any) => {
      if (data.status === true) {
        this.getUserList();
        this.dHide();
      } else {
        alert('Error');
      }
    });
  }

  userView(id: any) {
    this.router.navigate(['/user/' + id]);
  }
}
