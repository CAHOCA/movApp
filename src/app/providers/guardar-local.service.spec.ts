import { TestBed } from '@angular/core/testing';

import { GuardarLocalService } from './guardar-local.service';

describe('GuardarLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardarLocalService = TestBed.get(GuardarLocalService);
    expect(service).toBeTruthy();
  });
});
