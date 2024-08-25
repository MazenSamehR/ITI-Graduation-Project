import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../Services/games.service';
import { DatePipe, UpperCasePipe, CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule, RouterLink } from '@angular/router';

interface Platform {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,

  imports: [
    DatePipe,
    UpperCasePipe,
    NavbarComponent,
    RouterModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  allGames: any[] = [];
  filteredGames!: any;
  selectedOrder: string = 'relevance';
  selectedPlatform: string = '';

  PC: string = './imgs/desktop.png';
  PlayStation: string = './imgs/playstation.png';
  Xbox: string = './imgs/game.png';
  IOS: string = './imgs/apple2.png';
  Android: string = './imgs/android.png';
  Nintendo: string = './imgs/nintendo-switch (1).png';
  Linux: string = './imgs/linux.png';
  Web: string = './imgs/web.png';
  AppleMachine: string = './imgs/macintosh.png';

  constructor(private gamesService: GamesService) {}

  userName: string | null = localStorage.getItem('userName');
  userId: string | null = localStorage.getItem('userId');

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe((res) => {
      this.allGames = res.data;
      console.log(res);
    });

    this.gamesService.searchResults$.subscribe((games) => {
      this.filteredGames = games;
      console.log(' from list');
      console.log(this.filteredGames);
    });
    this.loadGames();
  }

  loadGames(): void {
    this.gamesService.getAllGames().subscribe((res) => {
      console.log(res);
      this.filteredGames = this.applyFilters(res); // Apply filters after fetching all games
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
    } else {
      filtered = this.allGames;
    }

    // Apply platform filter
    if (this.selectedPlatform) {
      console.log(this.selectedPlatform);
      const selectedPlatformLower = this.selectedPlatform.toLowerCase();
      filtered = filtered.filter((game) =>
        game.platforms.some(
          (p: { platform: { name: string; slug: string } }) =>
            p.platform.name.toLowerCase().includes(selectedPlatformLower) ||
            p.platform.slug.toLowerCase().includes(selectedPlatformLower)
        )
      );
    } else {
      filtered = this.allGames;
    }
    console.log(filtered);
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
    this.gamesService.getAllGames().subscribe((res) => {
      this.allGames = res.data;
    });
    this.filteredGames = this.applyFilters(this.allGames);
  }
}
