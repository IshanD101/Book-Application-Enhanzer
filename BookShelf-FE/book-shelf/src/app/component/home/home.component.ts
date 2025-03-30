import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //injecting the Router service to navigate to different routes
  constructor(private router: Router) { }

  //method to navigate to the '/books' page
  navigateToNextPage() {
    this.router.navigate(['/books']);
  }
}
