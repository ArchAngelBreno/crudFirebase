import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../service/notelist.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  noteList: Observable<Note[]>
 
  constructor(public navCtrl: NavController, private noteListService: NoteListService) {
    this.noteList = this.noteListService.getNoteList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }
}