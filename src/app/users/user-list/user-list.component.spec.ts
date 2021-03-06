import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from 'models/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ UserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should find user sort form with fixture.debugElement.nativeElement', () => {
    const sortFormDe: DebugElement = fixture.debugElement;
    const sortFormEl: HTMLElement = sortFormDe.nativeElement;
    const sortForm = sortFormEl.querySelector('#sortForm');
    expect(sortForm.textContent).toContain('Sort By:');
  });

  it ('should find select tag with fixture.debugElement.nativeElement', () => {
    const selectDe: DebugElement = fixture.debugElement;
    const selectEl: HTMLElement = selectDe.nativeElement;
    const select = selectEl.querySelector('select');
    expect(select.textContent).toContain('Alphabetical Order');
    expect(select.textContent).toContain('Creation Date');
  });

  it('should find "Sort By" label with fixture.debugElement.nativeElement', () => {
    const labelDe: DebugElement = fixture.debugElement;
    const labelEl: HTMLElement = labelDe.nativeElement;
    const label = labelEl.querySelector('#sortByLabel');
    expect(label.textContent).toEqual('Sort By:');
  });

  it('should find submit function for sort form with fixture.debugElement.nativeElement', () => {
    const buttonDe: DebugElement = fixture.debugElement;
    const buttonEl: HTMLElement = buttonDe.nativeElement;
    const button = buttonEl.querySelector('#sortButton');
    expect(button.textContent).toEqual('Submit');
  });

  it('should register a click event/call onSortButtonclick() when sort button clicked', async(() => {
    spyOn(component, 'onSortButtonClick');
    const buttonDe: DebugElement = fixture.debugElement;
    const buttonEl: HTMLElement = buttonDe.nativeElement;
    const button: HTMLElement = buttonEl.querySelector('#sortButton');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSortButtonClick).toHaveBeenCalled();
    });
  }));

  it('should have currentSortOption equal to "Alphabetical Order" on initialization', () => {
    fixture.detectChanges();
    expect(component.currentSortOption).toEqual('Alphabetical Order');
  });

  it('should register that currentSortOption is correctly updated when sort options are clicked', () => {
    spyOn(component, 'onSelected');
    spyOn(component, 'currentSortOption');
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    fixture.whenStable().then(() => {
      select.nativeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.onSelected).toHaveBeenCalledWith('Alphabetical Order');
    });
  });

  it('should display users in alphabetical order when submit is clicked with appropriate option', async(() => {
    component.currentSortOption = 'Alphabetical Order';
    component.filteredUsers = [
      {
        'name': 'Mark Delaney',
        'email': 'mdelaney@augmedix.com',
        'login': 'mojombo',
        'roles': [
          'Admin',
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379940,
        'id': 0
      },
      {
        'name': 'Meron Yemane',
        'email': 'myemane@augmedix.com',
        'login': 'defunkt',
        'roles': [
          'Observer',
          'Admin',
          'Creator'
        ],
        'isActive': 'true',
        'creationDate': 1524379941,
        'id': 1
      },
      {
        'name': 'Ryan Walker',
        'email': 'rwalker@augmedix.com',
        'login': 'pjhyett',
        'roles': [
          'Creator',
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379942,
        'id': 2
      },
      {
        'name': 'Bryson Tiller',
        'email': 'btiller@augmedix.com',
        'login': 'ezmobius',
        'roles': [
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379943,
        'id': 4
      }
    ];
    const buttonDe: DebugElement = fixture.debugElement;
    const buttonEl: HTMLElement = buttonDe.nativeElement;
    const button: HTMLElement = buttonEl.querySelector('#sortButton');
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.filteredUsers).toEqual([
        {
          'name': 'Bryson Tiller',
          'email': 'btiller@augmedix.com',
          'login': 'ezmobius',
          'roles': [
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379943,
          'id': 4
        },
        {
          'name': 'Mark Delaney',
          'email': 'mdelaney@augmedix.com',
          'login': 'mojombo',
          'roles': [
            'Admin',
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379940,
          'id': 0
        },
        {
          'name': 'Meron Yemane',
          'email': 'myemane@augmedix.com',
          'login': 'defunkt',
          'roles': [
            'Observer',
            'Admin',
            'Creator'
          ],
          'isActive': 'true',
          'creationDate': 1524379941,
          'id': 1
        },
        {
          'name': 'Ryan Walker',
          'email': 'rwalker@augmedix.com',
          'login': 'pjhyett',
          'roles': [
            'Creator',
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379942,
          'id': 2
        }
      ]);
    });
  }));

  it('should display users by date created when submit is clicked with appropriate option', async(() => {
    component.currentSortOption = 'Creation Date';
    component.filteredUsers = [
      {
        'name': 'Mark Delaney',
        'email': 'mdelaney@augmedix.com',
        'login': 'mojombo',
        'roles': [
          'Admin',
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379940,
        'id': 0
      },
      {
        'name': 'Meron Yemane',
        'email': 'myemane@augmedix.com',
        'login': 'defunkt',
        'roles': [
          'Observer',
          'Admin',
          'Creator'
        ],
        'isActive': 'true',
        'creationDate': 1524379950,
        'id': 1
      },
      {
        'name': 'Ryan Walker',
        'email': 'rwalker@augmedix.com',
        'login': 'pjhyett',
        'roles': [
          'Creator',
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379930,
        'id': 2
      },
      {
        'name': 'Bryson Tiller',
        'email': 'btiller@augmedix.com',
        'login': 'ezmobius',
        'roles': [
          'Observer'
        ],
        'isActive': 'true',
        'creationDate': 1524379910,
        'id': 4
      }
    ];
    const buttonDe: DebugElement = fixture.debugElement;
    const buttonEl: HTMLElement = buttonDe.nativeElement;
    const button: HTMLElement = buttonEl.querySelector('#sortButton');
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.filteredUsers).toEqual([
        {
          'name': 'Bryson Tiller',
          'email': 'btiller@augmedix.com',
          'login': 'ezmobius',
          'roles': [
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379910,
          'id': 4
        },
        {
          'name': 'Ryan Walker',
          'email': 'rwalker@augmedix.com',
          'login': 'pjhyett',
          'roles': [
            'Creator',
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379930,
          'id': 2
        },
        {
          'name': 'Mark Delaney',
          'email': 'mdelaney@augmedix.com',
          'login': 'mojombo',
          'roles': [
            'Admin',
            'Observer'
          ],
          'isActive': 'true',
          'creationDate': 1524379940,
          'id': 0
        },
        {
          'name': 'Meron Yemane',
          'email': 'myemane@augmedix.com',
          'login': 'defunkt',
          'roles': [
            'Observer',
            'Admin',
            'Creator'
          ],
          'isActive': 'true',
          'creationDate': 1524379950,
          'id': 1
        }
      ]);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
