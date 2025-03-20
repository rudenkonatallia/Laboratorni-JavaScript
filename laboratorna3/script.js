(function() {

  let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  let names2 = [ "Helen", "Jack", "Catherine", "Alex", "Ivy", "Derek", "Brian", "Elena", "Felix", "George"];

  for (let i = 0; i < names.length; i++) {
    let firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("Name selection by sum of ASCII codes");

  let threshold = 450;

  for (let i = 0; i < names2.length; i++) {
    let asciiSum = 0;

    for (let j = 0; j < names2[i].length; j++) {
      asciiSum += names2[i].charCodeAt(j);
    }

    if (asciiSum > threshold) {
      byeSpeaker.speak(names2[i]);
    } else {
      helloSpeaker.speak(names2[i]);
    }
  }

})();
