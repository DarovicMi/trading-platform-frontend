import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cc-guest-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './guest-page.component.html',
  styleUrl: './guest-page.component.scss',
})
export class GuestPageComponent {}
