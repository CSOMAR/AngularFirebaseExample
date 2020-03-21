import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {

  private students = 'students';

  constructor(private firestore: AngularFirestore) { }

  createStudent(student: Student) {
    const id = this.firestore.createId();
    student.id = id;
    this.firestore.collection(this.students).doc(id).set(student);
  }

  getStudents() {
    return this.firestore.collection(this.students);
  }

  updateStudent(student: Student) {
    this.firestore.collection(this.students).doc(student.id).set(student);
  }

  deleteStudent(student: Student) {
    this.firestore.collection(this.students).doc(student.id).delete();
  }

}
