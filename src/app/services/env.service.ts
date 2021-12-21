import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  tasksUrl: string;

  constructor() {
    const browserWindow = window || {};

    const browserWindowEnv = browserWindow['__env'] || {};

    Object.assign(this, { ...browserWindowEnv });
  }
}
