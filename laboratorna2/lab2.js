let car1 = new Object();
car1.color = "black";
car1.maxSpeed = 270;
car1.driver = new Object();
car1.driver.name = "Natalia Rudenko";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;
car1.drive = function() {
    console.log("I am not driving at night");
};

let car2 = {
    color: "white",
    maxSpeed: 300,
    driver: {
        name: "Natalia Rudenko",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2,

    drive: function() {
        console.log("I can drive anytime");
    }
};

car1.drive();
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let message = `Driver ${this.driver.name} `;
            message += this.driver.nightDriving ? "drives at night" : "does not drive at night";
            message += ` and has ${this.driver.experience} years of experience`;
            console.log(message);
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

let truck1 = new Truck("black", 7000, 95, "MAN", "TGX");
let truck2 = new Truck("white", 7500, 90, "MAN", "TGS");

truck1.AssignDriver("Natalia Rudenko", true, 5);
truck2.AssignDriver("Natalia Rudenko", false, 3);

truck1.trip();
truck2.trip();

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: all sides are equal, all angles are 90°.");
    }

    length() {
        console.log(`Perimeter: ${this.a * 4}`);
    }

    square() {
        console.log(`Area: ${this.a ** 2}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides are equal, all angles are 90°.");
    }

    length() {
        console.log(`Perimeter: ${(this.a + this.b) * 2}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus: all sides are equal, opposite angles are equal.");
    }

    length() {
        console.log(`Perimeter: ${this.a * 4}`);
    }

    square() {
        console.log(`Area: ${this.a ** 2 * Math.sin(this.alpha * Math.PI / 180)}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }

    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    get beta() {
        return this._beta;
    }

    set beta(value) {
        this._beta = value;
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram: opposite sides are equal, opposite angles are equal.");
    }

    length() {
        console.log(`Perimeter: ${(this.a + this.b) * 2}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b * Math.sin(this.alpha * Math.PI / 180)}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

let sq = new Square(3);
let rect = new Rectangle(4, 6);
let rhomb = new Rhombus(3, 120, 60);
let para = new Parallelogram(7, 5, 120, 60);

sq.info();
rect.info();
rhomb.info();
para.info();

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

let triangle1 = Triangular();
let triangle2 = Triangular(6, 6, 6);
let triangle3 = Triangular(7, 8, 9);

console.log(triangle1);
console.log(triangle2);
console.log(triangle3);

function PiMultiplier(n) {
    return function() {
        return Math.PI * n;
    };
}

let multBy2 = PiMultiplier(2);
let multBy2_3 = PiMultiplier(2/3);
let divBy2 = PiMultiplier(1/2);

console.log(multBy2());
console.log(multBy2_3());
console.log(divBy2());

function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
