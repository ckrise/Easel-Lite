import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { Router } from '@angular/router'

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
    private location: Location,
    private router: Router
  ) {
    this.checkedNames = {}
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.classid = params.classid
      try {
        this.courseStudents = await this.apiService.getRoster(this.classid)
      } catch {
        this.router.navigate(['404'])
      }

      for (let name of this.courseStudents) {
        this.checkedNames[name.id] = true
      }
    })

    this.allStudents = await this.apiService.getUsersByRole('student')
  }

  async saveRoster() {
    for (let name of this.allStudents) {
      await this.apiService.removeStudent(this.classid, name.id)
      if (name.id in this.checkedNames) {
        await this.apiService.addStudent(this.classid, name.id)
      }
    }
  }

  cancel() {
    if (window.confirm('Are you sure you want to discard these changes?')) {
      this.location.back()
    }
  }
}
