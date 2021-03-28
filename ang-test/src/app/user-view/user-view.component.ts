import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../service/user-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user_id: any;
  users: any;
  constructor(private route: ActivatedRoute, private apiService: UserServiceService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.user_id = params['id'];
      }
    });
    this.getUserData();
  }

  getUserData() {
    this.apiService.getSingleUser(this.user_id).subscribe((data: any) => {
      this.users = data.msg;
      console.log(this.users);
    });
  }

}
