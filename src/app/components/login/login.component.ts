import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { Propelics } from '../../propelics';
import { Book } from '../../models/book';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: {};
  books: Book[];
  datastoreType = Kinvey.DataStoreType.Cache;

  constructor(private cd: ChangeDetectorRef) {
    //get currently active user
    this.user = Kinvey.User.getActiveUser();
  
    if(this.user !== null) {
      console.log('user is already authenticated');
    } else {
      // login as system user
      this.user = Kinvey.User.login(Propelics.systemUser, Propelics.systemPass);
    }

  }

  ngOnInit() {
    // get book collection
    let bookStore = Kinvey.DataStore.collection<Book>('more-books', this.datastoreType);
    
    // get all entities in the book collection
    bookStore.find()
      .subscribe((books) => {
        this.books = books;
        this.cd.detectChanges(); //trigger UI update related to observables in Kinvey SDK
      });
  }

}