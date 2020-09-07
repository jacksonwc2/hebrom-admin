import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacoesComponent } from './localizacoes.component';

describe('LocalizacoesComponent', () => {
  let component: LocalizacoesComponent;
  let fixture: ComponentFixture<LocalizacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
