import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserTable } from './user-table';
import { UserService } from '../user-service';

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTable],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTable);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a user-detail card for each user', () => {
    
    const count = userService.users().length;

    const cards = fixture.debugElement.queryAll(By.css('user-detail'));
    expect(cards.length).toBe(count);
  });

  it('shows empty state when array is empty', () => {
    userService.setInitialUsers([]);  
    fixture.detectChanges();

    const emptyEl = fixture.debugElement.query(By.css('.empty'));
    expect(emptyEl).toBeTruthy();
  });
});
