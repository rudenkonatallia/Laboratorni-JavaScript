let fullArray = [];
for (let i = 0; i < 100; i++) {
    fullArray.push(Math.floor(Math.random() * 101));
}
let sparseArray = [...fullArray];
sparseArray[16] = undefined;
sparseArray[31] = undefined;
sparseArray[48] = undefined;
sparseArray[55] = undefined;
sparseArray[79] = undefined;
sparseArray[96] = undefined;

console.log("Original full array:", [...fullArray]);
console.log("\n--------------------");
console.log("Original sparse array:", [...sparseArray]);
console.log("\n--------------------");


LibSort.bubbleSort([...fullArray], true);
console.log(LibSort.bubbleSort([...fullArray], true));
console.log("\n--------------------");

LibSort.selectionSort([...fullArray], false);
console.log(LibSort.selectionSort([...fullArray], false));
console.log("\n--------------------");

LibSort.insertionSort([...fullArray], false);
console.log(LibSort.insertionSort([...fullArray], false));
console.log("\n--------------------");

LibSort.shellSort([...fullArray], true);
console.log(LibSort.shellSort([...fullArray], true));
console.log("\n--------------------");

LibSort.quickSort([...fullArray], false);
console.log(LibSort.quickSort([...fullArray], false));
console.log("\n--------------------");


LibSort.bubbleSort([...sparseArray], true);
console.log(LibSort.bubbleSort([...sparseArray], true));
console.log("\n--------------------");

LibSort.selectionSort([...sparseArray], true);
console.log(LibSort.selectionSort([...sparseArray], true));
console.log("\n--------------------");

LibSort.insertionSort([...sparseArray], false);
console.log(LibSort.insertionSort([...sparseArray], false));
console.log("\n--------------------");

LibSort.shellSort([...sparseArray], false);
console.log(LibSort.shellSort([...sparseArray], false));
console.log("\n--------------------");

LibSort.quickSort([...sparseArray], true);
console.log(LibSort.quickSort([...sparseArray], true));
