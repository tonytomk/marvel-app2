import { Component, OnInit } from '@angular/core';
import { MarvelAppService } from '../marvel-app.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    { display: 'None', value: '' },
    { display: 'Hero', value: 'heroes' },
    { display: 'Villian', value: 'villains' }
  ];
  maService: MarvelAppService;
  constructor(maService: MarvelAppService) {
    this.maService = maService;
   }

  ngOnInit(): void {
  }

  onSubmit(submittedForm): void {
    if (submittedForm.invalid){
      return;
    }
    this.maService.addCharacter(submittedForm.value.name , submittedForm.value.side);
  }
}
