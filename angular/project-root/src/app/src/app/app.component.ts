import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInput: string = '';
  userId: string = 'user123';
  chatOutput: string = '';
  debugOutput: string = '';

  constructor(private apiService: ApiService) {}

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.debugOutput += `Envoi de userInput: ${this.userInput}, userId: ${this.userId}\n`;
      this.apiService.getResponse(this.userInput).then(
        (response) => {
          this.debugOutput += `Réponse reçue: ${response.response}\n`;
          this.chatOutput += `Vous: ${this.userInput}\nBot: ${response.response}\n`;
          this.userInput = '';
        },
        (error: Error) => {
          this.debugOutput += `Erreur: ${error.message}\n`;
        }
      );
    }
  }
}
