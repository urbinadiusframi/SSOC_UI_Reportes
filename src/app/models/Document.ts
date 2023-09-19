export class Document {
  radicado: string;
  process: number;
  procedure: number;
  constructor(radicado: string, process: number, procedure: number) {
    this.radicado = radicado;
    this.process = process;
    this.procedure = procedure;
  }
}
