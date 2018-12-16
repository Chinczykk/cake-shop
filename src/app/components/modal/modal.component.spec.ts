import { TestBed, async } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FakeBackendService } from '../../fake-backend/fake-backend.service';

describe('AppComponent', () => {
  let fixture: any;
  let app: ModalComponent;
  let form: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
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
    fixture = TestBed.createComponent(ModalComponent);
    app = fixture.debugElement.componentInstance;

    form = app.cakeForm.controls;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('form', () => {

    it('form should be invalid', () => {

      expect(app.cakeForm.valid).toEqual(false);

      form['image'].setValue('s');
      form['name'].setValue('q');
      form['numberOfPortions'].setValue('w');
      form['cost'].setValue(123);

      expect(app.cakeForm.valid).toEqual(true);

    });

  });

  describe('countPortionCost', () => {

    it('should not be able to count becouse number of portions is undefined', () => {

      form['cost'].setValue(40);

      app.countPortionCost();

      expect(app.costPerPortion).toEqual(0);

    });

    it('should not be able to count becouse cost is equal 0', () => {

      form['numberOfPortions'].setValue('4');

      app.countPortionCost();

      expect(app.costPerPortion).toEqual(0);

    });

    it('should count', () => {

      form['cost'].setValue(40);
      form['numberOfPortions'].setValue('4');

      app.countPortionCost();

      expect(app.costPerPortion).toEqual(10);

    });

  });

  describe('save', () => {

    it('should add new item', () => {

      expect(app.fakeBackend.get('cakes_list').length).toEqual(0);

      form['image'].setValue('s');
      form['name'].setValue('q');
      form['numberOfPortions'].setValue('w');
      form['cost'].setValue(123);

      app.save();

      const list = app.fakeBackend.get('cakes_list');

      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('q');
      expect(list[0].cost).toEqual(123);

    });

    it('should add item becouse id of item to edit is not defined', () => {

      app.fakeBackend.add('cakes_list', {
        id: 1,
        name: '123'
      });

      expect(app.fakeBackend.get('cakes_list').length).toEqual(1);

      app.item = {
        name: '123'
      };

      form['name'].setValue('changed');
      form['numberOfPortions'].setValue(4);
      form['cost'].setValue(123);

      expect(app.cakeForm.valid).toBeTruthy();

      app.save();

      const list = app.fakeBackend.get('cakes_list');

      expect(list.length).toEqual(2);

    });

    it('should edit item', () => {

      app.fakeBackend.add('cakes_list', {
        id: 1,
        name: '123'
      });

      expect(app.fakeBackend.get('cakes_list').length).toEqual(1);

      app.item = {
        id: 1,
        name: '123'
      };

      form['name'].setValue('changed');
      form['numberOfPortions'].setValue(4);
      form['cost'].setValue(123);

      expect(app.cakeForm.valid).toBeTruthy();

      app.save();

      const list = app.fakeBackend.get('cakes_list');

      expect(list.length).toEqual(1);
      expect(list[0].id).toEqual(1);
      expect(list[0].name).toEqual('changed');

    });

  });

  describe('ngOnInit', () => {

    it('should call ngOnInit and save item to edit', () => {

      app.item = {
        id: 1,
        name: '2',
        desc: '3',
        numberOfPortions: 4,
        cost: 5
      };
      fixture.detectChanges();

      expect(form['name'].value).toEqual('2');
      expect(form['desc'].value).toEqual('3');
      expect(form['numberOfPortions'].value).toEqual(4);
      expect(form['cost'].value).toEqual(5);

    });

  });

});
