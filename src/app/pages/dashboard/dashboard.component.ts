import { TitleService } from 'src/app/core/services/tittle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedValue = new Date('2017-01-25');

  constructor(private titleService: TitleService) {}

  dias = [];

  datasFilter = [];

  datas = [
    {
      data: '10/11/2020',
      items: [{ content: 'Evento 1' }, { content: 'Evento 2' }],
    },
  ];

  ngOnInit() {
    this.titleService.atualizar('Dashboard');
    this.datasFilter = this.datas.filter((x) => x.data === '10/11/2020');
    this.dias = this.datasFilter.map((x) => x.data.split('/')[0]);
    debugger;
  }
}
