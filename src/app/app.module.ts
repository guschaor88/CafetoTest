import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Languages } from './languages';

//Services
import { MovieService } from './movie.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    Languages
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
