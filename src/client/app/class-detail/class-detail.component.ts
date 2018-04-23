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

  class: ClassData
  teachers: UserData[]

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService
              private location: Location) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      let classid = params.classid
      this.class = await this.apiService.getClassById(classid)
    })

    this.teachers = await this.apiService.getUsersByRole('teacher')
  }


//https://stackoverflow.com/a/41196416
//https://stackoverflow.com/a/36470719
  async saveClass(form: NgForm) {
    console.log(form)

    this.class.department = form.department
    this.class.number = form.Number
    this.class.teacher = form.teacher
    this.class.title = form.title

    await this.apiService.updateClass(class)

    this.location.back()
  }


}
