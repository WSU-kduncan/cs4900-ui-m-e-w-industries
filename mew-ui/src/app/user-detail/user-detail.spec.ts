import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetail } from './user-detail';
import { User } from '../user-service';
import { By } from '@angular/platform-browser';

describe('UserDetail', () => {
  let component: UserDetail;
  let fixture: ComponentFixture<UserDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetail);
    component = fixture.componentInstance;

    // Mock input
    const mockUser: User = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      dob: '2000-01-01',
      email: 'test@example.com',
      gamertag: 'TestTag',
      preferredConsole: 1,
      about: 'Test user details.',
    };

    // Required for InputSignal
    (component.item as any).set(mockUser);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the user name', () => {
    const el = fixture.debugElement.query(By.css('.name')).nativeElement;
    expect(el.textContent).toContain('Test User');
  });
});
