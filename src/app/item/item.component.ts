import { Component, Input, OnInit } from '@angular/core';
import { MarvelAppService } from '../marvel-app.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  // providers: [MarvelAppService],
})
export class ItemComponent implements OnInit {
  @Input() character;
  maService: MarvelAppService;
  constructor(maService: MarvelAppService) {
    this.maService = maService;
  }

  ngOnInit(): void {
  }

  onAssign(side): void {
    // this.character.side = side;
    this.maService.onSideChosen({ name: this.character.name, side });
  }

}
