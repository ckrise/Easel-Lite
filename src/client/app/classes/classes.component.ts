import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api.service'
import { ClassData } from '../../../server/models/class'

@Component({
  selector: 'el-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classData: ClassData[]

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.classData = await this.apiService.getClasses()
  }

}
