import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'cc-navbar',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ClickOutsideDirective,
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn: boolean = false;
  public isDropdownOpen: boolean = false;
  public dropdownPosition: any;
  public userFullName: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getLoggedInStatus();
  }

  getLoggedInStatus() {
    this.authService.getLoggedInStatus().subscribe({
      next: (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
        this.getCurrentLoggedInUserName();
      },
      error: (error) => console.error('Failed to get login status ', error),
    });
  }

  logout() {
    this.authService.logout().subscribe({
      error: (error) => console.error('Logout failed', error),
      complete: () => console.log('Logout successful'),
    });
  }

  getCurrentLoggedInUserName() {
    if (this.isUserLoggedIn) {
      this.authService.getCurrentLoggedInUserName().subscribe((user) => {
        this.userFullName = user;
      });
    }
  }

  toggleDropdown(event: MouseEvent): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const screenWidth = window.innerWidth;
    const clickX = event.clientX;
    this.dropdownPosition = clickX > screenWidth / 2 ? 'left' : 'right';
  }
}
