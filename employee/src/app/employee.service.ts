import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, Subject, tap} from 'rxjs';
import { Employee } from './Employee';
import { HttpClient,HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeService  {
 singleEmployee!:Employee;
 totSalary:number=0;
 values$:BehaviorSubject<Employee[]>=new BehaviorSubject<Employee[]>([]);
 protected constructor(private _http:HttpClient) {
   }

   getEmployees(){
    return this._http.get<Employee[]>
    ('https://localhost:44361/api/employee').subscribe(
      (value:Employee[])=>
      this.values$.next(value)
    ); 
   }
  //  getEmployees():BehaviorSubject<Employee[]>{
   
  //   return this._http.get<Employee[]>('https://localhost:44361/api/employee').subscribe(d=>this.va(d));
  //  }

   get EmployeeList():Observable<Employee[]>{
     return this.values$.asObservable();
   }

  getSingleEmployee(id:number){
    return this._http.get<Employee>(`https://localhost:44361/api/employee/${id}`);
  }

  createEmployee(employee:Employee):Observable<any>{
    return this._http.post<string>("https://localhost:44361/api/employee",employee,httpOptions);
    
  }

  deleteEmployee(id:number){
    return this._http.delete(`https://localhost:44361/api/employee/${id}`).pipe(
      tap(() => {
        const values: Employee[] = this.values$.value.filter(
          value => value.Id !== id
        );
        this.values$.next(values);
      })
    );
  }
  updateEmployee(employee:Employee){
    return this._http.put(`https://localhost:44361/api/employee/${employee.Id}`,employee,httpOptions);
  }
}
