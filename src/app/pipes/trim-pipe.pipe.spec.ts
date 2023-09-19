import { TrimPipe } from './trim-pipe.pipe';

describe('Suit de test unitarios para el pipe TrimPipe', () => {
  let pipe: TrimPipe;

  beforeEach(() => {
    pipe = new TrimPipe();
  });

  it('Debio crearse el pipe TrimPipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Test unitarios al metodo transform', () => {
    it('Debio retornar el mismo valor porque la cadena es vacia', () => {
      const resultMethodTransform: string = pipe.transform('');

      expect(resultMethodTransform).toEqual('');
      expect(resultMethodTransform).toBeFalsy();
    });

    it('Debio retornar el mismo valor porque la cadena es " "', () => {
      const resultMethodTransform: string = pipe.transform(' ');

      expect(resultMethodTransform).toEqual(' ');
      expect(resultMethodTransform).toBeTruthy();
    });

    it('Debio retornar la cadena sin espacios en blanco adicionales', () => {
      const resultMethodTransform: string = pipe.transform(
        'hola mundo         s'
      );

      expect(resultMethodTransform).toEqual('hola mundo s');
      expect(resultMethodTransform).toBeTruthy();
    });
  });
});
