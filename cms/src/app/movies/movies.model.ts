export class Movie {
    public id: string;
    public name: string;
    public description: string;
    public trailerUrl: string;
    public image: string;
    public children: string;

    constructor(id: string, name: string, description: string, trailerUrl: string, image: string, children: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.trailerUrl = trailerUrl;
        this.image = image;
        this.children = children;

    }
}