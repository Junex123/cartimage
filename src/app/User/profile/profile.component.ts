import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Website/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  selectedTab: string = 'tab1'; // Initialize active tab

  userDetails: any; // Variable to store user details
  constructor(private loginService: LoginService, private router: Router) {} 
  ngOnInit(): void {
    this.getUserDetails(); // Call getUserDetails when the component initializes
  }

  // Method to switch tabs
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getUserDetails() {
    this.userDetails = this.loginService.getUserDetails();
    console.log('User details:', this.userDetails);
  }

  logout() {
    // Display the confirmation dialog
    const confirmation = confirm('Are you sure you want to logout?');

    // If the user confirms, proceed with logout
    if (confirmation) {
      const confirmation = this.loginService.logout();
      if (confirmation) {
        console.log('User confirmed logout');
        this.router.navigate(['/']);
      } else {
        console.log('User canceled logout');
      }
    } else {
      console.log('User canceled logout');
    }
  }
}
