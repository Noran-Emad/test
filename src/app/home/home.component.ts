import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { SingleProductComponent } from '../single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { NavbarService } from '../services/navbar/navbar.service';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public productService: ProductService, public categoryService: CategoryService, public dialog: MatDialog, public nav: NavbarService) { }
  faMoneyBill1 = faMoneyBill1;
  faShippingFast = faShippingFast;
  faPhoneVolume = faPhoneVolume;
  faSync = faSync;
  faShoppingCart = faShoppingCart;
  selected = '';
  items: any = [];
  page: any = 1;
  count: any = 9;
  displayedCategoriesCount = 4;
  allproducts: any[] = [];
  productsInSlides: any[][] = [];
  iterationIncrement: number = 4;
  isLoading: boolean = false;
  error: string = '';

  ngOnInit(): void {

    this.nav.home = true;
    this.nav.about = false;
    this.nav.shop = false;
    this.categoryService.getAllCategories().subscribe(
      {
        next: (res: any) => {
          res?.forEach((element: any) => {
            this.items.push({
              name: element.categoryName, id: element.categoryId,
              imgURL: element.categoryImageURL, description: element.description
            })
          })
        }
        , error(err) { console.log(err) }
      }
    );

    this.productService.getAllProducts().subscribe(
      {
        next: (res: any) => {
          this.allproducts = res;
          this.allproducts = this.allproducts.slice(0, 6);
          this.processProductsForSlider();
        }
        , error(err) { console.log(err) }
      }
    );

  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  Login() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '350px',
      panelClass: 'auth-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  get displayedCategories() {
    return this.items.slice(0, this.displayedCategoriesCount);
  }

  showMoreCategories() {
    this.displayedCategoriesCount = this.items.length;
  }

  processProductsForSlider(): void {
    this.productsInSlides = [];
    for (let i = 0; i < this.allproducts.length; i += this.iterationIncrement) {
      const slice = this.allproducts.slice(i, i + this.iterationIncrement);
      this.productsInSlides.push(slice);
    }
  }

  Open(product: any) {
    if (localStorage.getItem("isLoggedIn") == 'true') {
      const dialogRef = this.dialog.open(SingleProductComponent, {
        panelClass: 'product-dialog',
        data: product
      });
    }
    else {
      const dialogRef = this.dialog.open(AuthComponent, {
        width: '350px',
        panelClass: 'auth-dialog',
      });
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.iterationIncrement = window.innerWidth < 500 ? 1 : 4;
    this.processProductsForSlider();
  }
}