import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ElementRef } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'cc-email-activation',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [EmailService, LocalStorageService],
  templateUrl: './email-activation.component.html',
  styleUrl: './email-activation.component.scss',
})
export class EmailActivationComponent implements OnInit {
  public token: string;
  public countdown: number = 3;
  public isActivateClicked = false;
  public isReissueTokenClicked = false;
  public activationMessage: string;
  public errorMessage: string;
  public isActivationSuccessful: boolean = false;
  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onActivateAccount() {
    this.isActivateClicked = true;
    if (this.token) {
      this.emailService.activateAccount(this.token).subscribe({
        next: (data: { message: string }) => {
          this.activationMessage = data.message;
          this.isActivationSuccessful = true;
          this.redirectToLogin();
        },
        error: (error: { error: { message: string } }) => {
          this.errorMessage = error.error.message;
          this.isActivationSuccessful = false;
          this.isReissueTokenClicked = false;
        },
      });
    }
  }

  redirectToLogin() {
    setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  reissueActivationToken() {
    const email = this.localStorageService.getItem('userEmail');
    if (email) {
      this.isReissueTokenClicked = true;
      this.emailService.reissueActivationToken(email).subscribe({
        next: (data: { message: string }) => {
          this.activationMessage = data.message;
        },
        error: (error: { error: { message: string } }) => {
          this.activationMessage = error.error.message;
        },
      });
    }
  }
}
