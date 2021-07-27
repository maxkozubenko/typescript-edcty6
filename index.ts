// 1. Add typings/access modifiers to the fruitBasket constant
enum Fruit {
  BANANA = 'banana',
  ORANGE = 'orange',
  KIWI = 'kiwi',
  APPLE = 'apple'
}

type FruitBasket = { [key in Fruit]: number };

const fruitBasket: FruitBasket = {
  banana: 2,
  orange: 3,
  kiwi: 2,
  apple: 3
};

// 2. Add typings/access modifiers to the Person class
interface PersonType {
  name: string;
  gender: string;
  age: number;
  likes: string[];

  introduce: () => string;
}

class Person implements PersonType {
  public name: string;
  public gender: string;
  public age: number;
  public likes: string[];

  public constructor(
    name: string,
    gender: string,
    age: number,
    likes: string[]
  ) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.likes = likes;
  }

  public introduce() {
    const { name, gender, age, likes } = this;
    const goodLookingMap = new Map([['male', 'handsome'], ['female', 'cute']]);
    return `
      Hello, I'm ${name}, ${age} years old, I like: ${likes.join(', ')}. 
      As you can see, I'm quite ${goodLookingMap.get(gender)} too!
    `;
  }
}

const Dima = new Person('Dima', 'male', 22, ['video games', 'martial arts']);
// console.log(Dima.introduce());

// 3. Add typings/access modifiers to MovieService class
type Logger = LoggerOne | LoggerTwo;

class MovieService<Logger> {
  public logger: Logger;
  public constructor(logger: Logger) {
    this.logger = logger;
  }
  public getMovies() {
    return Promise.resolve(['Jaws', 'Spider-Man']).catch(err => {
      if (
        this.logger instanceof LoggerOne ||
        this.logger instanceof LoggerTwo
      ) {
        this.logger.log(err);
      }
      return [];
    });
  }
}

class LoggerOne {
  public log(err: Error) {
    console.log('sending logs to log storage 1', err);
  }
}
class LoggerTwo {
  public log(err: Error) {
    console.log('sending logs to log storage 2', err);
  }
}

const movieService1 = new MovieService<Logger>(new LoggerOne());
const movieService2 = new MovieService<Logger>(new LoggerTwo());

console.log(movieService1.getMovies());
console.log(movieService2.getMovies());
