import { Component, OnInit } from '@angular/core';


interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  listOfData =[
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }
  ];

  constructor() { }

  ngOnInit() {
    
  }

}
