import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule ,MatDialogRef ,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SingleProductComponent } from './single-product/single-product.component';
import { ShopComponent } from './shop/shop.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { DatePipe } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { OrdersComponent } from './orders/orders.component';
import { ErrorComponent } from './error/error.component';
import { CaloriesComponent } from './calories/calories.component';
import { PaymentStatusDialogComponent } from './orders/payment-status-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    ProfileComponent,
    SingleProductComponent,
    PaymentStatusDialogComponent,

    ShopComponent,
    FilterPricePipe,
    OrderByPipe,
    CartComponent,
    WishlistComponent,
    SpinnerComponent,
    ConfirmComponent,
    OrdersComponent,
    ErrorComponent,
    CaloriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    NgxSliderModule,
    MatSelectModule,
    NgxPaginationModule,
  ],
  providers: [
    [DatePipe,CartComponent],
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
