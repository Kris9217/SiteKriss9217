import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/get_response';

  async getResponse(userInput: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, { userInput });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error || 'An unknown error occurred');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}
