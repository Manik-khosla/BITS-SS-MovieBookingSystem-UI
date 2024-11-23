import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../session/local-storage.service';
import { Router } from '@angular/router';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeService } from './home.service';
import * as bootstrap from 'bootstrap';
import { Theatre } from './theatre';
import { Movie } from './movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService]
})
export class HomeComponent implements OnInit{

  isAdminUser: boolean = false;
  ErrorMessage: any;
  SuccessMessage: any;
  theatreList: Theatre[] | null;
  movieList: Movie[] | null;
  NewTheatre: Theatre = new Theatre();
  NewMovie: Movie = new Movie();
  selectedTheatreId!: any;

  constructor(private localStorage : LocalStorageService, private router: Router, private jwtHelper: JwtHelperService, private homeService: HomeService) {
  this.theatreList = [];
  this.movieList = [];
  }

  ngOnInit() {
    if(this.jwtHelper.isTokenExpired(HomeComponent.EmptyIfNull(this.localStorage.getJWTToken()))) {
     this.router.navigate(['main']);
     this.localStorage.DeleteJWTToken();
     this.getTheatresList();
    }else{
      var token = this.localStorage.getJWTToken() == null ? "" : this.localStorage.getJWTToken();
      const decodedToken = this.jwtHelper.decodeToken(HomeComponent.EmptyIfNull(this.localStorage.getJWTToken()));
      if(decodedToken.role == "Admin"){
        this.isAdminUser = true;   
      }
      this.getTheatresList();
    }
    }

    getTheatresList(){
     this.homeService.getTheatresList().subscribe(theatresListResponse=> {
     this.theatreList = theatresListResponse.body;
     },
     errorResponse => { 
      this.ErrorMessage = "An Error Occured while fetching Theatre List. Please try later";
      const myToast = bootstrap.Toast.getOrCreateInstance('#showErrorMsg') 
      myToast.show()})
    
    }

    AddTheatre(theatre: Theatre) {
      this.homeService.addNewTheatre(theatre).subscribe(newTheatre => {
        this.theatreList?.push(newTheatre.body!);
        this.SuccessMessage = "Theatre Added Successfully";
        const myToast = bootstrap.Toast.getOrCreateInstance('#showSuccessMsg') ;
         myToast.show();
        bootstrap.Modal.getInstance('#AddTheatreModal')?.dispose;
        this.NewTheatre = new Theatre();
        },
        errorResponse => { 
         this.ErrorMessage = "An Error Occured while adding Theatre. Please try later";
         const myToast = bootstrap.Toast.getOrCreateInstance('#showErrorMsg') 
         myToast.show()}
        )
      }

      setTheatreId(selectedTheatreId : String) {
        this.selectedTheatreId = selectedTheatreId;
      }
      
      AddMovieInTheatre(movie:Movie ) {
      movie.theatreId = this.selectedTheatreId;
      this.homeService.addMovie(movie).subscribe(res=> {
        this.SuccessMessage = "Movie Added Successfully To Theatre";
        const myToast = bootstrap.Toast.getOrCreateInstance('#showSuccessMsg') ;
        myToast.show();
       bootstrap.Modal.getInstance('#AddMovieModal')?.dispose;
       this.NewMovie = new Movie();
      },
      errorResponse => { 
       this.ErrorMessage = "An Error Occured while Adding Movie. Please try later";
       const myToast = bootstrap.Toast.getOrCreateInstance('#showErrorMsg') 
       myToast.show()}
      )
      }

      getMoviesList(id: String) {
        this.homeService.getMoviesList(id).subscribe(resp=> {
        this.movieList = resp.body;
        })
      }

    public static EmptyIfNull(value: string | null): string
    {
        if (value == null)
            return "";
        return value.toString();
    }
}
