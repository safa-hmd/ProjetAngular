import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../model/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-detail',
  templateUrl: './suggestions-detail.component.html',
  styleUrl: './suggestions-detail.component.css'
})
export class SuggestionsDetailComponent implements OnInit {

  id!: number;
  suggestion!: Suggestion;

  constructor(private act: ActivatedRoute, private sugg: SuggestionService,private router: Router) { }

ngOnInit(): void {
  this.id = Number(this.act.snapshot.paramMap.get('id'));

  this.sugg.getSuggestionById(this.id).subscribe({
    next: (data: any) => {
      this.suggestion = data.suggestion; // <-- récupère l'objet à l'intérieur
      console.log('Suggestion reçue :', this.suggestion);
    },
    error: (err) => console.error('Erreur fetch suggestion :', err)
  });
}

updateSuggestion(id: number) {
  // redirige vers le composant formulaire en passant l'id dans l'URL
  this.router.navigate(['/update-suggestion', id]);
}

}
