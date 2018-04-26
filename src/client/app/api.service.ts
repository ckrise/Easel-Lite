import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ClassData } from '../../server/models/class'
import { UserData } from '../../server/models/user'
import { ObjectId } from 'bson';

@Injectable()
export class ApiService {

  jsonOptions = {
    headers: { 'Content-Type': 'application/json' }
  }

  constructor(private httpClient: HttpClient) { }

  async getClasses() {
    let url = '/api/classes'
    return await this.httpClient.get<ClassData[]>(url).toPromise()
  }
  async getClassById(classid: string) {
    let url = `/api/classes/${classid}`
    return await this.httpClient.get<ClassData>(url).toPromise()
  }
  async updateClass(classData: ClassData) {
    let url = `/api/classes/${classData.id}`

    return await this.httpClient.put<ClassData>(
      url,
      JSON.stringify(
        {
          number: classData.number,
          department: classData.department,
          title: classData.title
        }),
      this.jsonOptions
    ).toPromise()
  }
  async deleteClass(classid: string) {
    let url = `/api/classes/${classid}`
    return await this.httpClient.delete<ClassData>(url).toPromise()
  }
  async createClass(classData: ClassData) {
    let url = '/api/classes'

    return await this.httpClient.post<ClassData>(
      url,
      JSON.stringify(classData),
      this.jsonOptions
    ).toPromise()
  }

  async getUsersByRole(role: string) {
    let url = `/api/users/?role=${role}`
    return await this.httpClient.get<UserData[]>(url).toPromise()
  }
}
