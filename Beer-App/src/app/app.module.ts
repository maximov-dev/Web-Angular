import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { GoodsComponent} from './goods/goods.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {PaginationComponent} from './pagination/pagination.component';
import {NotFoundComponent} from './not-found.component';
import {ModalComponent} from './modal/modal.component';
import {ComponentsDataService} from './services/components-data.service';

const appRoutes: Routes = [
  { path: '', component: GoodsComponent},
  { path: 'home', component: GoodsComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent, AuthComponent, GoodsComponent, PaginationComponent, NotFoundComponent, ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ComponentsDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
