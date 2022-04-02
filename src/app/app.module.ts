import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { StructureComponent } from './features/structure/structure.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainMenuComponent } from './shared/components/main-menu/main-menu.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StructureComponent,
    MainHeaderComponent,
    MainMenuComponent,
    MainFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [StructureComponent]
})
export class AppModule { }
