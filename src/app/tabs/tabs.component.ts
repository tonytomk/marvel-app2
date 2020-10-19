import { Component,  OnInit } from '@angular/core';
import { MarvelAppService } from '../marvel-app.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  // providers: [MarvelAppService],
})


export class TabsComponent implements OnInit {
  characters = [];
  chosenList = 'all';

  maService: MarvelAppService;
  constructor(maService: MarvelAppService) {
    this.maService = maService;
   }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onChoose(side) {
  this.chosenList = side;
  }

  getCharacters(): any {
    this.characters = this.maService.getCharacters(this.chosenList);
    return this.characters;
  }

}
