import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MarketPageComponent } from "./pages/market-page/market-page.component";


const routes: Routes = [
  { path: '',
    children: [
      { path: 'market', component: MarketPageComponent},
      { path: '**', redirectTo: 'market' }
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class MainRoutingModule {}
