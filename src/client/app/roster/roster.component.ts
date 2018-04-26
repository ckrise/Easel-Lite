import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service'
import { UserData } from '../../../server/models/user'

@Component({
  selector: 'el-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  students: UserData[]

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.students = await this.apiService.getUsersByRole('student')
  }

}
