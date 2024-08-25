import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { userId } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GamesService } from '../../Services/games.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  id!: any;

  searchQuery: string = '';
  constructor(private router: Router, private gamesService: GamesService) {}

  userName: string | null = localStorage.getItem('userName');
  userId: string | null = localStorage.getItem('userId');

  hide: boolean = true;

  searchRes!: any[];
  onSearch(): any {
    this.searchRes = [];
    this.gamesService.searchGames(this.searchQuery).subscribe((res) => {
      console.log(res); // Handle the search results here
      console.log('search : ' + this.searchQuery);

      let serachStr = this.searchQuery.toLowerCase();

      for (let i in res.data) {
        let compare = res.data[i].name.toLowerCase();
        if (serachStr == compare) {
          console.log(serachStr);
          console.log(' == ' + compare);
          this.searchRes[0] = res.data[i];
          console.log(this.searchRes); // Handle the search results here
          return this.searchRes;
        }
        for (let j in res.data.alternative_names) {
          let compare = res.data.alternative_names.toLowerCase();

          if (compare == serachStr) {
            console.log(serachStr);
            console.log(' == ' + compare);
            this.searchRes[0] = res.data[j];
            console.log(this.searchRes); // Handle the search results here
            return this.searchRes;
          }
        }
      }
      console.log('from navbar'); // Handle the search results here
      console.log(this.searchRes); // Handle the search results here
      return this.searchRes;
    });
  }

  showLogout() {
    console.log(this.hide);
    if (this.hide) this.hide = false;
    else this.hide = true;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit() {}
}
