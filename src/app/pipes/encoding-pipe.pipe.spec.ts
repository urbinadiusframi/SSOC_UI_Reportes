import { faker } from '@faker-js/faker';
import { EncodingPipe } from './encoding-pipe.pipe';

describe('Suit de test unitarios para el pipe EncodingPipe', () => {
  let pipe: EncodingPipe;

  beforeEach(() => {
    pipe = new EncodingPipe();
  });

  it('Debio crearse el pipe EncodingPipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Test unitarios al metodo transform', () => {
    it('Se debio aplicar el encoding a la url', () => {
      const mockURL: string = faker.internet.url();
      const encodingURL: string = encodeURIComponent(mockURL);
      const resultMethodTransform: string = pipe.transform(mockURL);

      expect(resultMethodTransform).toEqual(encodingURL);
    });
  });
});
