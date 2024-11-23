import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLGenerator } from '../URLGenerator';
import { Theatre } from './theatre';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}


  getTheatresList() {
    return this.http.get<Theatre[]>(URLGenerator.GetTheatresListURL, { responseType: 'json', observe: 'response', withCredentials: true  });
  }

  addNewTheatre(theatre:Theatre){
    return this.http.post<Theatre>(URLGenerator.AddTheatreURL, { "name": theatre.name, "location": theatre.location, "capacity" : theatre.capacity} ,{ responseType: 'json', observe: 'response', withCredentials: true  });
  }

  getMoviesList(id:String) {
    return this.http.get<Movie[]>(URLGenerator.GetAllMovieURL + id ,{ responseType: 'json', observe: 'response', withCredentials: true  });
  }

  addMovie(movie:Movie) {
    return this.http.post<Movie>(URLGenerator.AddMovieURL, movie ,{ responseType: 'json', observe: 'response', withCredentials: true  });
  }
 
}
