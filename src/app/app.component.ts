import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DatabaseAccessService } from './database-access/database-access.service';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { Student } from './models/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  students: Observable<any[]>;

  constructor(private dialog: MatDialog, private databaseAccessService: DatabaseAccessService) {
    this.students = databaseAccessService.getStudents().valueChanges();
  }

  onEdit(student: Student) {
    this.openDialog(student);
  }

  onDelete(student: Student) {
    this.databaseAccessService.deleteStudent(student);
  }

  addStudent() {
    this.openDialog();
  }

  openDialog(student?: Student) {
    this.dialog.open(StudentDialogComponent, {
      data: student,
      width: '250px',
      height: '300px'
    });
  }

}
