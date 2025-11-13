import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardDetail } from './user-card-detail';

describe('UserCardDetail', () => {
  let component: UserCardDetail;
  let fixture: ComponentFixture<UserCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
