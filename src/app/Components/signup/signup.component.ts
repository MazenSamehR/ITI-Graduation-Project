import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private registerService: LoginService, private router: Router) {}

  msg!: string;
  status!: string;

  register(user: any) {
    this.registerService.registerReq(user).subscribe((res) => {
      this.msg = res.message;
      this.status = res.status;
      console.log(res);
      if (this.status == 'SUCCESS') {
        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userId', res.data._id);
        this.router.navigate(['/games']);
      } else {
        alert(this.msg);
      }
    });
    console.log(user);
  }
}
let userId!: string;
export { userId };
