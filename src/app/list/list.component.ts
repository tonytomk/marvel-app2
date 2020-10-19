import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarvelAppService } from '../marvel-app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() characters;
  activatedRoute: ActivatedRoute;
  mwService: MarvelAppService;
  loadedSide = 'all';
  subscription: Subscription;
  constructor(activatedRoute: ActivatedRoute, mwService: MarvelAppService) {
    this.activatedRoute = activatedRoute;
    this.mwService = mwService;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.mwService.getCharacters(params.side);
        this.loadedSide = params.side;
      },
    );

    this.subscription = this.mwService.charactersChanged.subscribe(
      () => {
        this.characters = this.mwService.getCharacters(this.loadedSide);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
