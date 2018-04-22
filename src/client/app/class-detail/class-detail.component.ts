import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

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
              private apiService: ApiService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      let classid = params.classid
      this.class = await this.apiService.getClassById(classid)
    })

    this.teachers = await this.apiService.getUsersByRole('teacher')
  }

}
