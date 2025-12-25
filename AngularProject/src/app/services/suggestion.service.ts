import { Injectable } from '@angular/core';
import { Suggestion } from '../model/suggestion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {


   suggestions: Suggestion[] = [
{
id: 1,
title: 'Organiser une journée team building',
description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
category: 'Événements',
date: new Date('2025-01-20'),
status: 'acceptee'
},
{
id: 2,
title: 'Améliorer le système de réservation',
description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
category: 'Technologie',
date: new Date('2025-01-15'),
status: 'refusee'
},
{
id: 3,
title: 'Créer un système de récompenses',
description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
category: 'Ressources Humaines',
date: new Date('2025-01-25'),
status: 'refusee'
},
{
id: 4,
title: 'Moderniser l\'interface utilisateur',
description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
category: 'Technologie',
date: new Date('2025-01-30'),
status: 'en_attente'
},
{
id: 5,
title: 'Formation à la sécurité informatique',
description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
category: 'Formation',
date: new Date('2025-02-05'),
status: 'acceptee'
}];

  constructor(private http : HttpClient) { }

  suggestionUrl ='http://localhost:3000/suggestions'

  getAllSuggestion(){
  return this.http.get<Suggestion[]>(this.suggestionUrl)
  }

  getSuggestionById(id:number){
    return this.http.get<Suggestion>(this.suggestionUrl+'/'+id)
  }

  AddSuggestion(suggestion:Suggestion){
    return this.http.post<Suggestion>(this.suggestionUrl,suggestion)
  }
  UpdateSuggestion(suggestion:Suggestion){
    return this.http.put<Suggestion>(this.suggestionUrl+'/'+suggestion.id,suggestion)
  }

  deleteSuggestion(id:number){
    return this.http.delete<void>(this.suggestionUrl+'/'+id)
  }

 updateLikes(id: number, nbLikes: number) {
  return this.http.put<Suggestion>(`/api/suggestions/${id}/likes`, { nbLikes });
}


likeSuggestion(id: number) {
  return this.http.post<{ success: boolean; message: string }>(
    `${this.suggestionUrl}/${id}/like`, 
    {}
  );
}


}