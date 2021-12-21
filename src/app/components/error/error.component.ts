import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes } from 'src/app/routing/route.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  constructor(private router: Router) { }

  onTryAgain(): void {
    this.router.navigate([AppRoutes.Todo]);
  }
}
