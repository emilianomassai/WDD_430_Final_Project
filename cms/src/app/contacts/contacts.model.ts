export class Contact {
  public id: string;
  public title: string;
  public overview: string;
  public release_date: string;
  public poster_path: string;
  public vote_average: string;

  constructor(id: string, title: string, overview: string, release_date: string, poster_path: string, vote_average: string) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
  }
}
