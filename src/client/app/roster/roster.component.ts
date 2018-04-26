import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { ApiService } from '../api.service'
import { ClassData } from '../../../server/models/class'
import { UserData } from '../../../server/models/user'

@Component({
  selector: 'el-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  allStudents: UserData[]
  courseStudents: UserData[]

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const classid = params.classid
      this.courseStudents = await this.apiService.getRoster(classid)
    })

    this.allStudents = await this.apiService.getUsersByRole('student')
  }

}
