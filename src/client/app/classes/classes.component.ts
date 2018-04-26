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
    this.classData.sort(this.sortClassData)
  }

  sortClassData(n1: ClassData, n2: ClassData) {
    let deptDiff: number;
    if (n1.department > n2.department) {
      return -1
    } else if (n1.department < n2.department){
      return 1
    } else {
      return n1.number - n2.number
    }
  }

}
