import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'app/shared/data-storage.service';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  public ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe(user => {
    this.userSub = this.store.select('auth').pipe(
        map(authState => authState.user))
        .subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user; // This shorthand trick means that if user exists, return true, if it doesnt, return false.
      // console.log(!user);
      // console.log(!!user);
    });
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
