import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  popularGames = [
    {
      name: 'Game Title 1',
      released: '2024-01-01',
      background_image: 'path-to-image-1.jpg',
    },
    {
      name: 'Game Title 2',
      released: '2023-12-15',
      background_image: 'path-to-image-2.jpg',
    },
    {
      name: 'Game Title 3',
      released: '2023-11-20',
      background_image: 'path-to-image-3.jpg',
    },
    {
      name: 'Game Title 4',
      released: '2023-10-10',
      background_image: 'path-to-image-4.jpg',
    },
  ];

  constructor() {}

  explore() {
    localStorage.clear();
  }

  ngOnInit() {}
}
