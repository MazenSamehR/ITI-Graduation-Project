import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginservice: LoginService, private router: Router) {}

  msg!: string;
  status!: string;

  login(user: any) {
    this.loginservice.loginReq(user).subscribe((res) => {
      console.log(res);
      this.msg = res.message;
      this.status = res.status;
      if (this.status == 'SUCCESS') {
        localStorage.setItem('userName', res.data[0].name);
        localStorage.setItem('userId', res.data[0]._id);
        this.router.navigate(['/games']);
      } else {
        alert(this.msg);
      }
    });
  }
}
