import { take } from 'rxjs/operators';
import { TitleService } from 'src/app/core/services/tittle.service';
import { VisitanteService } from 'src/app/core/services/visitante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedValue = new Date('2017-01-25');

  constructor(
    private titleService: TitleService,
    private visitanteService: VisitanteService
  ) {}
  total = 0;
  data = [];
  width = 800;
  height = 500;
  ngOnInit() {
    this.titleService.atualizar('Dashboard');

    this.visitanteService
      .adquirirTodos()
      .pipe(take(1))
      .subscribe((x) => {
        this.total = x.length;
        this.data = [
          ['0 - 20', x.filter((x) => x.idade <= '20').length],
          [
            '21 - 50',
            x.filter((x) => x.idade >= '21' && x.idade <= '50').length,
          ],
          ['Mais de 50', x.filter((x) => x.idade > '50').length],
        ];
      });
  }
}
