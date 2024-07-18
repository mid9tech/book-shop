export interface About {
  title: string;
  description: string;
  image: string;
}

export interface renderAbout {
  main: About[];
  child: About[];
  qAndA: About[];
}
