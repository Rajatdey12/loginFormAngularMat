import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMsgComponent } from './global-msg.component';

describe('GlobalMsgComponent', () => {
  let component: GlobalMsgComponent;
  let fixture: ComponentFixture<GlobalMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
