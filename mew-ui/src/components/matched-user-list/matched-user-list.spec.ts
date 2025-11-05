import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedUserList } from './matched-user-list';

describe('MatchedUserList', () => {
  let component: MatchedUserList;
  let fixture: ComponentFixture<MatchedUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchedUserList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedUserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
