import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-status-dialog',
  template: `
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payment</h5>
          </div>
          <div class="modal-body">
            <p class="modal-text">{{ data.status === 'success' ? 'Your payment was successful.' : 'Your payment was cancelled. Please try again.' }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-lg" [ngClass]="{'btn-success': data.status === 'success', 'btn-danger': data.status !== 'success'}" mat-dialog-close>OK</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-content {
      background-color: white;
    }
    .modal-title, .modal-text {
      color: black;
      font-size: 24px;
    }
    .btn-success {
      background-color: green;
      color: white;
    }
    .btn-danger {
      background-color: red;
      color: white;
    }
    .btn-lg {
      padding: 8px 24px;
      font-size: 24px;
    }
  `]
})
export class PaymentStatusDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
