class Mower {
  lawn = { x: 0, y: 0 };
  valid = true;
  pattern = { 0: "N", 90: "E", 180: "S", 270: "O" };
  position = { x: 0, y: 0 };
  orientation;

  constructor(x, y) {
    this.lawn.x = x;
    this.lawn.y = y;
  }

  //fonction d'initialisation de la tondeuse
  mowerStart(start) {
    this.position.x = Number(start[0]); //x
    this.position.y = Number(start[2]); //y
    //Orientation
    switch (start[4]) {
      case "N":
        this.orientation = 0;
        break;
      case "E":
        this.orientation = 90;
        break;
      case "S":
        this.orientation = 180;
        break;
      case "O":
        this.orientation = 270;
        break;

      default:
        this.notGoodLetter("init");
        break;
    }
  }

  //fonction d'éxecution de séquence
  mowerMove(move) {
    for (const c of move) {
      switch (c.toUpperCase()) {
        case "L":
          if (this.orientation === 0) {
            this.orientation = 270;
          } else {
            this.orientation -= 90;
          }
          break;
        case "R":
          if (this.orientation === 270) {
            this.orientation = 0;
          } else {
            this.orientation += 90;
          }
          break;

        case "F":
          if (this.orientation === 360 || this.orientation === 0) {
            if (this.position.y + 1 > this.lawn.y) break;
            this.position.y += 1;
          } else if (this.orientation === 90) {
            if (this.position.x + 1 > this.lawn.x) break;
            this.position.x += 1;
          } else if (this.orientation === 180) {
            if (this.position.y - 1 < 0) break;
            this.position.y -= 1;
          } else {
            if (this.position.x - 1 < 0) break;
            this.position.x -= 1;
          }
          break;
        default:
          this.notGoodLetter();
          break;
      }
    }

    // vérification si il n'y a pas de fautes de frappe
    if (this.valid) {
      console.log(
        this.position.x,
        this.position.y,
        this.pattern[this.orientation]
      );
    }
  }

  //fonction de renvoie si il y a une faute de frappe
  notGoodLetter(e) {
    this.valid = false;
    if (e == "init") {
      console.log(
        "[TYPING ERROR] you must choice [N or E or S or O] in start function"
      );
    } else {
      console.log(
        "[TYPING ERROR] you must choice [F or N or E or S or O] in instruction function"
      );
    }
  }
}

const m = new Mower(5, 5); // définition de la grille de départ

m.mowerStart("1 2 N"); //définition de la position de départ de la 1er tondeuse
m.mowerMove("LFLFLFLFF"); //instruction de la 1er tondeuse

m.mowerStart("3 3 E"); //définition de la position de départ de la 2ième tondeuse
m.mowerMove("FFRFFRFRRF"); //instruction de la 2ième tondeuse
