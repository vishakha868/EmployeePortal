import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee!: Employee;
  Id!:number;
  isUpdate: boolean = false;

  constructor(private router:ActivatedRoute,private employeeData:EmployeeService) {}

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.Id=params['id'];
      console.log(this.Id);
     })
     this.employeeData.getSingleEmployee(this.Id).subscribe(data=>{
      console.log(data);
      this.employee=data});
  }

 

  
}
