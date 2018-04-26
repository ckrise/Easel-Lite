import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Location } from '@angular/common';

import { ApiService } from '../api.service'
import { ClassData } from '../../../server/models/class'
import { UserData } from '../../../server/models/user'

@Component({
  selector: 'el-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {

  class = <ClassData>{
    teacher: {id: ""}
  }
  teachers = new Array<UserData>()

  constructor(private apiService: ApiService,
              private location: Location) {}

  async ngOnInit() {
    this.teachers = await this.apiService.getUsersByRole('teacher')
  }

  // https://stackoverflow.com/a/36470719
  createClass() {
    this.apiService.createClass(this.class)
    this.location.back()
  }

  cancel() {
    if (window.confirm('Are you sure you want to abandon this class?')) {
      this.location.back()
    }
  }

}
