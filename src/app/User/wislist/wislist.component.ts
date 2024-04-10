import { Component } from '@angular/core';
import { NavbarComponent } from '../../Website/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wislist',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './wislist.component.html',
  styleUrl: './wislist.component.css'
})
export class WislistComponent {

}
