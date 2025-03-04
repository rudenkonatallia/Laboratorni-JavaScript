function triangle(value1 = 4, type1 = "leg", value2 = 3, type2 = "leg"){

    console.log("The function solves a right triangle given two given elements and their types.");
    console.log("Possible types: leg, hypotenuse, adjacent angle, opposite angle, angle(when hypotenuse is given).");
    console.log("The function accepts arguments in the following order: value of argument 1, type of argument 1, value of argument 2, type of argument 2.");
    console.log("Example: triangle(4, \"leg\", 8, \"hypotenuse\"); \n");

    if(value1 <= 0 || value2 <= 0){
        return "Zero or negative input";
    }

    if(value1 <= 1e-6 || value2 <= 1e-6 || value2 >= 1e6 || value2 >= 1e6){
        return "Too small/large value";
    }
    
    const possibleTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if(!possibleTypes.includes(type1) || !possibleTypes.includes(type2)){
        console.log("Invalid type. You should read the instructions again.");
        return "failed";
    }

    const validPairs = [
        ["leg", "leg"],
        ["leg", "hypotenuse"],
        ["angle", "hypotenuse"],
        ["leg", "adjacent angle"],
        ["leg", "opposite angle"]
    ];

    if (!validPairs.some(pair =>
        (pair[0] === type1 && pair[1] === type2) || 
        (pair[0] === type2 && pair[1] === type1)
    )) {
        console.log("Incompatible pair of types. You should read the instructions again.");
        return "failed";
    }

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "hypotenuse" || type2 === "leg" && type1 === "hypotenuse") {
        let leg = type1 === "leg" ? value1 : value2;
        let hypotenuse = type1 === "hypotenuse" ? value1 : value2;
        if (leg >= hypotenuse) {
            return "Leg greater than or equal to hypotenuse";
        }
        a = leg;
        c = hypotenuse;
        b = Math.sqrt(c * c - a * a);
        alpha = Math.atan(a / b) * (180 / Math.PI);
        beta = 90 - alpha;
    }else if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = Math.atan(a / b) * (180 / Math.PI);
        beta = 90 - alpha;
    }else if(type1 === "angle" && type2 === "hypotenuse" || type2 === "angle" && type1 === "hypotenuse"){
        let angle = type1 === "angle" ? value1 : value2;
        let hypotenuse = type1 === "hypotenuse" ? value1 : value2;
        if (angle >= 90) {
            return "obtuse angle";
        }
        c = hypotenuse;
        beta = angle; 
        alpha = 90 - angle; 
        a = c * Math.sin(alpha * (Math.PI / 180));
        b = c * Math.sin(beta * (Math.PI / 180));
    }else if(type1 === "leg" && type2 === "adjacent angle" || type2 === "leg" && type1 === "adjacent angle"){
        let leg = type1 === "leg" ? value1 : value2;
        let adjacent_angle = type1 === "adjacent angle" ? value1 : value2;
        if (adjacent_angle >= 90) {
            console.log("Angle must be between 0 and 90 degrees.");
            return "obtuse angle";
        }
        b = leg;
        alpha = adjacent_angle;
        beta = 90 - alpha;
        c = b / Math.cos(alpha * (Math.PI / 180));
        a = b * Math.tan(alpha * (Math.PI / 180));
    }else{
        let leg = type1 === "leg" ? value1 : value2;
        let opposite_angle = type1 === "opposite angle" ? value1 : value2;
        if (opposite_angle >= 90) {
            return "obtuse angle";
        }
        b = leg;
        beta = opposite_angle;
        alpha = 90 - beta;
        c = b / Math.sin(beta * (Math.PI / 180));
        a = b * Math.tan(alpha * (Math.PI / 180));
    }
    
    console.log("Результати:");
    console.log(`Катет a: ${a.toFixed(14)}`);
    console.log(`Катет b: ${b.toFixed(14)}`);
    console.log(`Гіпотенуза c: ${c.toFixed(14)}`);
    console.log(`Кут alpha: ${alpha.toFixed(14)}°`);
    console.log(`Кут beta: ${beta.toFixed(14)}°`);
    return "success";
}
