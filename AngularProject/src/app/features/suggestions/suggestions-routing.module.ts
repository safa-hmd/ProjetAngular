import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { SuggestionsDetailComponent } from './suggestions-detail/suggestions-detail.component';

const routes: Routes = [
  { path: '', component: ListSuggestionComponent },
  { path: 'new', component: SuggestionFormComponent },
   { path: 'update-suggestion/:id', component: SuggestionFormComponent }, 
  {path : 'detail/:id', component: SuggestionsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
