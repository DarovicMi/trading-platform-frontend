import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cc-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isModalOpen: boolean = false;

  closeModal() {
    this.isModalOpen = false;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
