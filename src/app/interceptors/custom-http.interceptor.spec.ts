import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';

import { CustomHttpInterceptor } from "./custom-http.interceptor";


describe("CustomHttpInterceptor", () => {
  let httpInterceptor: CustomHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CustomHttpInterceptor],
    });

    httpInterceptor = TestBed.inject(CustomHttpInterceptor);
  });

  it("should be created", () => {
    expect(httpInterceptor).toBeTruthy();
  });

});
