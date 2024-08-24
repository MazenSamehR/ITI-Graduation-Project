import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';
import { GamesService } from '../../Services/games.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule], // Add FormsModule to imports
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private gamesService: GamesService) {}

  onSearch(): void {
    this.gamesService.searchGames(this.searchQuery).subscribe((data) => {
      console.log(data); // Handle the search results here
    });
  }
}
