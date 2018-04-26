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
  checkedNames: Object
  classid: string

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.checkedNames = {}
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.classid = params.classid
      this.courseStudents = await this.apiService.getRoster(this.classid)
    })

    this.allStudents = await this.apiService.getUsersByRole('student')
  }

  async saveRoster() {
    for (let name in this.allStudents) {
      if (name in this.checkedNames) {
        await this.apiService.addStudent(this.classid, name)
      } else {
        await this.apiService.removeStudent(this.classid, name)
      }
    }
  }

  cancel() {
    if (window.confirm('Are you sure you want to discard these changes?')) {
      this.location.back()
    }
  }
}
