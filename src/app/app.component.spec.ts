import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FakeBackendService } from './fake-backend/fake-backend.service';

describe('AppComponent', () => {
  let fixture: any;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToastrComponent,
        ModalComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FakeBackendService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('closeModal', () => {

    it('should close modal and activate toastr with edit message', () => {

      app.closeModal('edit');

      expect(app.toastr).toEqual(true);
      expect(app.toastrValue).toEqual('ZMIENIŁEŚ CIASTO!');

    });

    it('should close modal and activate toastr with add message', () => {

      app.closeModal('add');

      expect(app.toastr).toEqual(true);
      expect(app.toastrValue).toEqual('DODAŁEŚ NOWE CIASTO!');

    });

    it('should close modal without activating toastr', () => {

      app.closeModal('');

      expect(app.toastr).toEqual(false);
      expect(app.toastrValue).toEqual('');

    });

  });

  describe('openModal', () => {

    it('should open modal and remove toastr', () => {

      app.toastr = true;
      app.toastrValue = 'value';

      expect(app.toastr).toBeTruthy();
      expect(app.toastrValue).toEqual('value');

      app.openModal();

      expect(app.toastr).toBeFalsy();
      expect(app.toastrValue).toEqual('');
      expect(app.modal).toBeTruthy();
      expect(app.itemToEdit).toEqual({});

    });

  });

  describe('edit', () => {

    it('should set item to edit', () => {

      const item = {
        name: 'toEdit'
      };

      app.edit(item);

      expect(app.modal).toEqual(true);
      expect(app.itemToEdit).toEqual(item);

    });

  });

  describe('remove', () => {

    it('should remove item, updateItems and activate toastr', () => {

      app.fakeBackend.add('cakes_list', { id: 1 });

      app.remove({ id: 1 });

      expect(app.fakeBackend.get('cakes_list').length).toEqual(0);
      expect(app.toastr).toBeTruthy();
      expect(app.toastrValue).toEqual('USUNĄŁEŚ CIASTO!');

    });

  });
});
