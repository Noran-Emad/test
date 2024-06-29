import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { UserService } from '../services/User/user.service';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentStatusDialogComponent } from './payment-status-dialog.component';

const orderStatusMap: { [key: number]: string } = {
  0: "Accepted",
  1: "Pending",
  2: "Rejected",
};

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  user: any;

  constructor(public dialog: MatDialog, private http: HttpClient, private myService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this.onRefresh();
    this.checkPaymentStatus();
  }

  onRefresh() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getOrders(this.user).subscribe({
      next: (res: any) => {
        if (res.message != "No Order Found!!") {
          this.orders = res;
        }
      },
      error(err) { console.log(err) }
    });
  }

  Open(id: any) {
    this.myService.getProductByID(id).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(SingleProductComponent, {
          panelClass: 'product-dialog',
          data: res
        });
      },
      error(err) { console.log(err) }
    });
  }

  Remove(id: any) {
    console.log(id);
    this.userService.removeOrder(id).subscribe({
      next: (res: any) => {
        this.onRefresh();
      },
      error(err) { console.log(err) }
    });
  }

  getStatusString(status: number): string {
    return orderStatusMap[status] as string;
  }

  async Payment(order: any) {
    const stripe = await loadStripe('pk_test_51PWEblKKkDp9oK1JOY21GnUmmuqW6VJqOSmmyJWHhH3TiCBT9snpwtFMA7b3X4pnAgLv9OBi0KAzoog3dgjnUGJp00hTqvBQeO');

    const baseUrl = window.location.origin;
    console.log(baseUrl)

    const session = await this.createStripeSession(order, baseUrl);

    if (session && session.url) {
      window.location.href = session.url;
    }
  }

  private createStripeSession(order: any, baseUrl: string) {
    return this.http.post<any>(`https://localhost:7032/api/payment/create-stripe-session?orderId=${order.orderId}&baseUrl=${encodeURIComponent(baseUrl)}`, {}).toPromise();
  }

  private checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const orderId = urlParams.get('orderId');

    if (status === 'success' && orderId) {
      this.http.get(`https://localhost:7032/api/Orders/EditPaymentStatues/${orderId}`).subscribe({
        next: () => {
          this.onRefresh();
          this.showPaymentStatusDialog(status);
        },
        error: (err) => console.error(err)
      });
    } else if (status === 'cancel') {
      this.showPaymentStatusDialog(status);
    }
  }

  private showPaymentStatusDialog(status: string | null) {
    const dialogRef = this.dialog.open(PaymentStatusDialogComponent, {
      data: { status: status }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (status === 'success') {
        // Any additional actions if needed after dialog is closed
      }
    });
  }
}
