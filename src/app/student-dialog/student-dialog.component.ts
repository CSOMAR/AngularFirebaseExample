import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseAccessService } from '../database-access/database-access.service';
import { Student } from '../models/student';

@Component({
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent {

  title: string;
  form: FormGroup;
  isDisabled: boolean;

  constructor(
    formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    private databaseAccessService: DatabaseAccessService,
    @Inject(MAT_DIALOG_DATA) private student: Student
  ) {
    let nameValue: string;
    let ageValue: number;

    if (student == null) {
      this.title = 'Add New Student';
      nameValue = null;
      ageValue = null;
    } else {
      this.title = 'Edit Student Info';
      nameValue = student.name;
      ageValue = student.age;
    }

    this.form = formBuilder.group({
      name: [nameValue, Validators.required],
      age: [ageValue, Validators.required]
    });

    this.setIsDisabled(this.form.value);

    this.form.valueChanges.subscribe(value => { this.setIsDisabled(value); });
  }

  setIsDisabled(value: any) {
    this.isDisabled = value.name === null || value.age == null;
  }

  save(name: string, age: number) {
    if (this.student == null) {
      const student: Student = {name, age};
      this.databaseAccessService.createStudent(student);
    } else {
      this.student.name = name;
      this.student.age = age;
      this.databaseAccessService.updateStudent(this.student);
    }

    this.dialogRef.close();
  }

}
