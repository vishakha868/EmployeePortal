import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  EmployeeForm!: FormGroup;
  closeResult!: string;

  constructor(private fb: FormBuilder, private modalService: NgbModal,private employeeData:EmployeeService) {}

  ngOnInit(): void {
    this.EmployeeForm = this.fb.group({
      Name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(26)]
      ],
      JoiningDate: [''],
      Salary: [null],
      Department: ['', Validators.required],
      Phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(9999999999)
        ])
      ],
      Email: [null, Validators.required]
    });
  }

  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  get Name(): FormControl<string> {
    return this.EmployeeForm.get('Name') as FormControl;
  }

  get JoiningDate(): FormControl<string> {
    return this.EmployeeForm.get('JoiningDate') as FormControl;
  }
  get Phone(): FormControl<number> {
    return this.EmployeeForm.get('Phone') as FormControl;
  }

  get Email(): FormControl<string> {
    return this.EmployeeForm.get('Email') as FormControl;
  }

  get Department(): FormControl<string> {
    return this.EmployeeForm.get('Department') as FormControl;
  }
  get Salary(): FormControl<string> {
    return this.EmployeeForm.get('Salary') as FormControl;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onsubmit(): void {
    console.log(this.EmployeeForm.value);
    this.employeeData.createEmployee(this.EmployeeForm.value).subscribe((data:string)=>
      {
      this.employeeData.getEmployees();
      this.EmployeeForm.reset();
      alert(data);
    });
  }
}
