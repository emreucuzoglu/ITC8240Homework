import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DecryptorComponent} from './decryptor.component';

describe('DecryptorComponent', () => {
  let component: DecryptorComponent;
  let fixture: ComponentFixture<DecryptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecryptorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
