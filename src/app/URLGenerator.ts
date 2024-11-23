export class URLGenerator {

    static AuthBaseURL = "http://localhost:3000/";
    static MovieServiceBaseURL = "http://localhost:3100/";
    static TheatreServiceBaseURL = "http://localhost:3200/";
    
    // login
    static LoginURL = URLGenerator.AuthBaseURL + "api/v1/sessions/sign_in"
    static GetUserDetailsURL = URLGenerator.AuthBaseURL + "api/v1/sessions/"
    
    // signup
    static SignupURL = URLGenerator.AuthBaseURL + "api/v1/sessions/sign_up"
    
    //Logout
    static LogoutURL=URLGenerator.AuthBaseURL + "api/v1/sessions/sign_out"

    // Get Theatres List
    static GetTheatresListURL = URLGenerator.TheatreServiceBaseURL+"api/theatres/all"

    //add Theatre
    static AddTheatreURL = URLGenerator.TheatreServiceBaseURL+"api/theatres/add"

    // Get Movie
     static GetAllMovieURL = URLGenerator.MovieServiceBaseURL+"api/movies/get?theatreId="

    // add Movie
    static AddMovieURL= URLGenerator.MovieServiceBaseURL+"api/movies/add"
}