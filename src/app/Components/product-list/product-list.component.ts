import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  allGames: any[] = [];
  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe((res) => {
      this.allGames = res.results;
      console.log(res.results);
      
    });
  }
}
