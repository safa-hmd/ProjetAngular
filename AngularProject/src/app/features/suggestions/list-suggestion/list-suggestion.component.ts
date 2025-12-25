import { Component } from '@angular/core';
import { Suggestion } from '../../../model/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {

 suggestions: Suggestion[] = []

 constructor (private SuggS : SuggestionService) { }

 ngOnInit(){
  //this.suggestions=this.SuggS.suggestions;
  this.SuggS.getAllSuggestion().subscribe(
    (data) =>  this.suggestions=data
  )
}

deleteSuggestion(id: number) {
  this.SuggS.deleteSuggestion(id).subscribe(() => {
    // Supprimer la suggestion du tableau local pour mettre à jour l'affichage
    this.suggestions = this.suggestions.filter(s => s.id !== id);
  }, error => {
    console.log("Erreur lors de la suppression :", error);
  });
}


likeSuggestion(suggestion: Suggestion) {
  this.SuggS.likeSuggestion(suggestion.id).subscribe({
    next: (res) => {
      if (res.success) {
        // Incrément local pour l'affichage immédiat
        suggestion.nbLikes = (suggestion.nbLikes || 0) + 1;
        console.log(res.message);
      } else {
        console.warn('Impossible de liker cette suggestion');
      }
    },
    error: (err) => {
      console.error('Erreur lors du like :', err);
    }
  });
}




}