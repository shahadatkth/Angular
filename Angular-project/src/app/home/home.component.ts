import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    user: object;
    editing: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }


    ngOnInit() {
      console.log(this.currentUser.id);
      this.loadUser();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(this.currentUser.id).pipe(first()).subscribe(() => {

        });
    }
    updateUser(currentUser: User) {
        console.log(currentUser);
        this.userService.update(this.currentUser).pipe(first()).subscribe((user) => {
            this.user = user;
        });
    }

    private loadUser() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe((user) => {
            this.user = Object.assign({}, user);
           /* this.user = user;*/


        });
    }

}
