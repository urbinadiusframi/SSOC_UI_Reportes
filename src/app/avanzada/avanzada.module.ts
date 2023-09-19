import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../pipes/pipes.module';
import { AvanzadaRoutingModule } from './avanzada-routing.module';
import { AvanzadaComponent } from './avanzada.component';
import { DetailRadicadoComponent } from './components/detail-radicado/detail-radicado.component';
import { DropdownSearchComponent } from './components/dropdown-search/dropdown-search.component';
import { NumeroRadicadoComponent } from './components/filtros/home/numero-radicado/numero-radicado.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { SelectHideColumnComponent } from './components/select-hide-column/select-hide-column.component';
import { SelectSearchWithRequestComponent } from './components/select-search-with-request/select-search-with-request.component';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AvanzadaComponent,
    HeaderComponent,
    TableComponent,
    HomeComponent,
    ModalComponent,
    SelectHideColumnComponent,
    SelectSearchWithRequestComponent,
    DropdownSearchComponent,
    DetailRadicadoComponent,
    NumeroRadicadoComponent,
  ],
  imports: [
    CommonModule,
    AvanzadaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatProgressBarModule,
    MatDialogModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    NgbTooltipModule,
    PipeModule,
  ],
  exports: [HeaderComponent, TableComponent, SelectHideColumnComponent, DropdownSearchComponent, SelectHideColumnComponent, NumeroRadicadoComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AvanzadaModule { }
