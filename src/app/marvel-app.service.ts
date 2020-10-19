import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from './log.service';

@Injectable()
export class MarvelAppService {
  private characters = [
    {
      name: 'Thor', side: ''
    },
    {
      name: 'Iron Man', side: ''
    },
    {
      name: 'Thanos', side: ''
    }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }
  getCharacters(chosenList): any {
   // this.fetchCharacters();
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo): void {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of bla');
  }

  addCharacter(name, side): void {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const charc = { name, side };
    this.characters.push(charc);
  }

  fetchCharacters(): void {
    const result = this.http.get('https://jsonplaceholder.typicode.com/todos', {});

    result.subscribe(
      (response: Response) => {
        console.log(response);
        this.charactersChanged.next();
      }
    );
  }
}
