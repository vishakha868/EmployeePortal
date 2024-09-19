import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees!: Observable<Employee[]>;
  updateEmp!: Employee;
  totalSalary:number=0;

  constructor(private employeeData: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeData.getEmployees();
    this.employees = this.employeeData.EmployeeList;
    this.employees.subscribe(next => (data: Employee[]) =>
      data.map(emp => ({ ...emp, isUpdate: false}))
    );
    // this.employeeData.values$.subscribe((data:Employee[])=>{this.employees=data;
    // console.log(this.employees)})
    this.employees.subscribe(data=>data.forEach(emp=>this.totalSalary=this.totalSalary+emp.Salary));
  }

  updateEmployee(employee: Employee): void {
    employee.isUpdate = true;
    this.updateEmp = employee;
  }

  deleteEmployee(id: number): void {
    this.employeeData.deleteEmployee(id).subscribe(data =>alert(data));
  }

  save(): void {
    this.employeeData
      .updateEmployee(this.updateEmp)
      .subscribe(data => alert(data));
    this.updateEmp.isUpdate = false;
  }

  routeToEmployee(employee: Employee): void {
    this.router.navigate([`/employee/${employee.Id}`]);
  }

  cancel(employee: Employee): void {
    this.employeeData.getEmployees();
    employee.isUpdate = false;
  }
}
