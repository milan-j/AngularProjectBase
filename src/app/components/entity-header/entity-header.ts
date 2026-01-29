import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-entity-header',
  imports: [AsyncPipe],
  templateUrl: './entity-header.html',
  styleUrl: './entity-header.scss',
})
export class EntityHeader {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entityName$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => {
      let child = this.route.firstChild;
      while (child?.firstChild) {
        child = child.firstChild;
      }
      return child?.snapshot.data['entityName'] || '';
    })
  );
}
