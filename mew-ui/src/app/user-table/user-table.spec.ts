import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserTable } from './user-table';

describe('UserTable', () => {
  let component: UserTable;
  let fixture: ComponentFixture<UserTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTable], 
    }).compileComponents();

    fixture = TestBed.createComponent(UserTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a row per user when users exist', () => {
    
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.users.length);
  });

  it('shows empty state when array is empty', () => {
    component.users = [];
    fixture.detectChanges();

    
    const emptyCell = fixture.debugElement.query(By.css('.empty'));
    expect(emptyCell).toBeTruthy();
  });
});
