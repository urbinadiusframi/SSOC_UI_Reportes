import { NgModule } from '@angular/core';
import { EncodingPipe } from './encoding-pipe.pipe';
import { TrimPipe } from './trim-pipe.pipe';

@NgModule({
  declarations: [
    TrimPipe,
    EncodingPipe,
  ],
  imports: [
  ],
  exports: [
    TrimPipe,
    EncodingPipe,
  ]
})
export class PipeModule { }
