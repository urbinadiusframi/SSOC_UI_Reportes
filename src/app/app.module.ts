import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { TrimPipe } from './pipes/trim-pipe.pipe';
import { EncodingPipe } from './pipes/encoding-pipe.pipe';
import { PipeModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    NgbTooltipModule,
    PipeModule,
  ],
  exports: [
  ],
  providers: [
    TrimPipe,
    EncodingPipe,],
  schemas: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
