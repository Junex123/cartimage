import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../Website/navbar/navbar.component';
import { OrderItem } from '../../Class/order-item';
import { CartService } from '../../service/cart.service';
import { LoginService } from '../../service/login.service';
import { UserService } from '../../service/user.service';
import { Cart } from '../../Class/Cart';
import { CartOrder } from '../../Class/CartOrder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shippingform',
  standalone: true,
  imports: [RouterModule,NavbarComponent,FormsModule,CommonModule],
  templateUrl: './shippingform.component.html',
  styleUrl: './shippingform.component.scss'
})
export class ShippingformComponent {

  orderDetails: CartOrder = new CartOrder();
  cartItems: Cart[] = [];
  orderItem: OrderItem[] = [];
  paidAmount: number = 0;
  username!: string;
  constructor(private router: Router, private cartService: CartService, private loginService: LoginService, private userService: UserService) { }
  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    for (let cartItems of this.cartItems) {
      let items: OrderItem = new OrderItem();
      items.pid = cartItems.product.pid;
      items.quantity = cartItems.quantity;
      this.orderItem.push(items);
    }
    this.cartService.totalPrice.subscribe(data => this.paidAmount = data);
    this.username = this.loginService.getUserDetails().username;
    this.cartService.calculateTotalPrice();
    this.orderDetails.username = this.username;
    this.orderDetails.paidAmount = this.paidAmount;
    this.orderDetails.paymentMode = "CARD-PAYMENT";
    this.orderDetails.cartItem = this.orderItem;
   
  }
 
  onSubmit() {
    this.userService.createOrder(this.orderDetails).subscribe({
      next: (data: any) => {
        if (data && data.oid) {
          this.router.navigate(['/orderplaced', data.oid]);
        } else {
          console.error('Invalid order ID:', data);
          // Handle the error or navigate to a fallback route
        }
      }, 
      error: (error: any) => {
        console.log('Error occurred:', error);
        // Handle the error appropriately
      }
    });
  }
  

}
