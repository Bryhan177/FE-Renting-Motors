import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MotosService, Moto } from './motos.service';

describe('MotosService', () => {
  let service: MotosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MotosService]
    });
    service = TestBed.inject(MotosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all motos', () => {
    const mockMotos: Moto[] = [
      { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'disponible' },
      { _id: '2', marca: 'Yamaha', modelo: 'R6', placa: 'XYZ789', estado: 'rentada' }
    ];

    service.getMotos().subscribe(motos => {
      expect(motos).toEqual(mockMotos);
    });

    const req = httpMock.expectOne('http://localhost:3000/motos');
    expect(req.request.method).toBe('GET');
    req.flush(mockMotos);
  });

  it('should get a single moto by id', () => {
    const mockMoto: Moto = { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'disponible' };

    service.getMoto('1').subscribe(moto => {
      expect(moto).toEqual(mockMoto);
    });

    const req = httpMock.expectOne('http://localhost:3000/motos/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMoto);
  });

  it('should create a new moto', () => {
    const newMoto: Omit<Moto, '_id'> = { marca: 'Kawasaki', modelo: 'Ninja', placa: 'DEF456', estado: 'disponible' };
    const createdMoto: Moto = { _id: '3', ...newMoto };

    service.createMoto(newMoto).subscribe(moto => {
      expect(moto).toEqual(createdMoto);
    });

    const req = httpMock.expectOne('http://localhost:3000/motos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMoto);
    req.flush(createdMoto);
  });

  it('should update a moto', () => {
    const updateData: Partial<Moto> = { estado: 'mantenimiento' };
    const updatedMoto: Moto = { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'mantenimiento' };

    service.updateMoto('1', updateData).subscribe(moto => {
      expect(moto).toEqual(updatedMoto);
    });

    const req = httpMock.expectOne('http://localhost:3000/motos/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updateData);
    req.flush(updatedMoto);
  });

  it('should delete a moto', () => {
    const deletedMoto: Moto = { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'disponible' };

    service.deleteMoto('1').subscribe(moto => {
      expect(moto).toEqual(deletedMoto);
    });

    const req = httpMock.expectOne('http://localhost:3000/motos/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedMoto);
  });
});
