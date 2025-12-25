import { Component } from '@angular/core';
import { Suggestion } from '../../../model/suggestion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent {

suggestion!: Suggestion;
suggestions : Suggestion[] = [];
suggestionForm!: FormGroup;
id!: number;          // ID de la suggestion à modifier
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sugg:SuggestionService,
     private actR: ActivatedRoute, // <- ajouter
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z]*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });

      // Récupérer l'ID depuis l'URL
  this.id = this.actR.snapshot.params['id'];
  if (this.id) {
    this.sugg.getSuggestionById(this.id).subscribe((data) => {
      this.suggestion = data;
      this.suggestionForm.patchValue(this.suggestion); // Remplir le formulaire
    });
  }
  }

  get f() {
    return this.suggestionForm.controls;
  }



  onSubmit(): void {
  if (this.suggestionForm.invalid) return;

  const suggestionData: Suggestion = {
    ...this.suggestionForm.getRawValue(),
    nbLikes: this.suggestion ? this.suggestion.nbLikes : 0,
    id: this.id ? this.id : Date.now() // garde l'ID existant ou crée un nouveau
  };

  if (this.id) {

// this.sugg.getSuggestionById(this.id).subscribe((data) => {
//       this.suggestion = data;
//       const { id, nbLikes, ...formData } = data;
//       this.suggestionForm.patchValue(formData);
//     });
    
    // Mise à jour
    this.sugg.UpdateSuggestion(suggestionData).subscribe({
      next: (data) => {
        console.log('Suggestion mise à jour avec succès', data);
        this.router.navigate(['/suggestions']);
      },
      error: (err) => console.error('Erreur lors de la mise à jour:', err)
    });
  } else {
    // Ajout
    this.sugg.AddSuggestion(suggestionData).subscribe({
      next: (data) => {
        console.log('Suggestion ajoutée avec succès', data);
        this.router.navigate(['/suggestions']);
      },
      error: (err) => console.error('Erreur lors de l\'ajout:', err)
    });
  }
}

}
