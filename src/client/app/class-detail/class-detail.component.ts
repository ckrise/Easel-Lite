import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'
import {Location} from '@angular/common';

import { ApiService } from '../api.service'
import { ClassData } from '../../../server/models/class'
import { UserData } from '../../../server/models/user'

@Component({
  selector: 'el-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  class = <ClassData>{}
  originalClass: ClassData
  teachers = new Array<UserData>()

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private location: Location) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const classid = params.classid
      this.originalClass = this.class = await this.apiService.getClassById(classid)
    })

    this.teachers = await this.apiService.getUsersByRole('teacher')
  }

  // https://stackoverflow.com/a/36470719
  saveClass() {
    console.log("Saving...")
    this.apiService.updateClass(this.class)
    this.location.back()
  }

  cancel() {
    if (window.confirm('Discard Changes?')) {
      this.class = this.originalClass
      this.location.back()
    }
  }

  deleteClass() {
    if (window.confirm('Delete Class?')) {
      this.apiService.deleteClass(this.class.id)
      this.location.back()
    }
  }
}
