import {NgModule} from "@angular/core";
import {shoppingListRoutingModule} from "./shopping-list-routing.module";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [SharedModule, FormsModule, shoppingListRoutingModule]
})

export class shoppingListModule {

}
