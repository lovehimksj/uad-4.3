import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../service/http/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(
      data => {
        this.message = data;
        console.log(this.message);
    }
    )
  }

}


// import { Component, OnInit } from '@angular/core';
//
// import { AlertService } from '../_services/index';
//
// @Component({
//   moduleId: module.id,
//   selector: 'alert',
//   templateUrl: 'alert.component.html'
// })
//
// export class AlertComponent {
//   message: any;
//
//   constructor(private alertService: AlertService) { }
//
//   ngOnInit() {
//     this.alertService.getMessage().subscribe(message => { this.message = message; });
//   }
// }
