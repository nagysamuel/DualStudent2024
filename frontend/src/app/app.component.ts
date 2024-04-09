import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private dataService: DataService) { 
  }

  ngOnInit(): void {
    this.dataService.fetchCustomers();
    console.log("App");
  }

}
