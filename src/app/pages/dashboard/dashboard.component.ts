import { TitleService } from 'src/assets/services/tittle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedValue = new Date('2017-01-25');

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.atualizar('Dashboard');
  }
}
