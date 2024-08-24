import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Platform {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  filteredGames: any[] = [];
  selectedOrder: string = 'relevance';
  selectedPlatform: string = '';

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.searchResults$.subscribe((games) => {
      this.filteredGames = this.applyFilters(games);
      console.log(games);
    });

    this.loadGames();
  }

  loadGames(): void {
    this.gamesService.getAllGames().subscribe((res) => {
      console.log(res.results);
      this.filteredGames = this.applyFilters(res.results); // Apply filters after fetching all games
    });
  }

  applyFilters(games: any[]): any[] {
    let filtered = games;

    // Apply order filter
    if (this.selectedOrder === 'release_date') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.released).getTime() - new Date(a.released).getTime()
      );
    } else if (this.selectedOrder === 'player_count') {
      filtered = filtered.sort((a, b) => b.playtime - a.playtime); // Assuming 'playtime' indicates player count
    }

    // Apply platform filter
    // if (this.selectedPlatform) {
      
    //   const selectedPlatformLower = this.selectedPlatform.toLowerCase();
    //   filtered = filtered.filter((game) =>
    //     game.platforms.some(
    //       (p: { platform: { name: string; slug: string } }) =>
    //         p.platform.name.toLowerCase().includes(selectedPlatformLower) ||
    //         p.platform.slug.toLowerCase().includes(selectedPlatformLower)
    //     )
    //   );
    // }
    return filtered;
  }

  orderDisplayNames: { [key: string]: string } = {
    relevance: 'Relevance',
    release_date: 'Release Date',
    player_count: 'Player Count',
  };

  onOrderChange(order: string): void {
    this.selectedOrder = order;
    this.filteredGames = this.applyFilters(this.filteredGames);
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.filteredGames = this.applyFilters(this.filteredGames);
  }
}
