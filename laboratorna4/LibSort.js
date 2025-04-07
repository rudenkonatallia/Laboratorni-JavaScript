const LibSort = {
    stats: {
        comparisons: 0,
        swaps: 0,
        reset() {
            this.comparisons = 0;
            this.swaps = 0;
        },
        log(method, arr) {
            const sparseMessage = arr.some(el => el === undefined) ? "Sparse array. " : "Full array.";
            console.log(`${sparseMessage}${method} -> Comparisons: ${this.comparisons}, Swaps/Moves: ${this.swaps}`);
        },
    },

    bubbleSort(arr, ascending = true) {
        this.stats.reset();
        arr = arr.filter(el => el !== undefined).concat(arr.filter(el => el === undefined));
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.stats.comparisons++;
                if (arr[j] === undefined || arr[j + 1] === undefined) {
                    continue;  
                }
                let cond = ascending
                    ? arr[j] > arr[j + 1]
                    : arr[j] < arr[j + 1];
                if (cond) {
                    this.stats.swaps++;
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        this.stats.log("Bubble Sort", arr);
        return arr;
    },

    insertionSort(arr, ascending = true) {
        this.stats.reset();
        arr = arr.filter(el => el !== undefined).concat(arr.filter(el => el === undefined));
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (
                j >= 0 &&
                arr[j] !== undefined &&
                key !== undefined &&
                (ascending ? arr[j] > key : arr[j] < key)
            ) {
                this.stats.comparisons++;
                this.stats.swaps++;
                arr[j + 1] = arr[j];
                j--;
            }
            this.stats.comparisons++;
            arr[j + 1] = key;
        }
        this.stats.log("Insertion Sort", arr);
        return arr;
    },

    selectionSort(arr, ascending = true) {
        this.stats.reset();
        arr = arr.filter(el => el !== undefined).concat(arr.filter(el => el === undefined));
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                this.stats.comparisons++;
                if (arr[j] === undefined || arr[targetIdx] === undefined) {
                    continue;
                }
                let cond = ascending
                    ? arr[targetIdx] > arr[j]
                    : arr[targetIdx] < arr[j];
                if (cond) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                this.stats.swaps++;
                [arr[i], arr[targetIdx]] = [arr[targetIdx], arr[i]];
            }
        }
        this.stats.log("Selection Sort", arr);
        return arr;
    },

    shellSort(arr, ascending = true) {
        this.stats.reset();
        arr = arr.filter(el => el !== undefined).concat(arr.filter(el => el === undefined));
        let n = arr.length;
        let gap = Math.floor(n / 2);
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;
                while (
                    j >= gap &&
                    arr[j - gap] !== undefined &&
                    temp !== undefined &&
                    (ascending ? arr[j - gap] > temp : arr[j - gap] < temp)
                ) {
                    this.stats.comparisons++;
                    this.stats.swaps++;
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                this.stats.comparisons++;
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        this.stats.log("Shell Sort", arr);
        return arr;
    },

    quickSort(arr, ascending = true) {
        this.stats.reset();
        const partition = (arr, low, high) => {
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                this.stats.comparisons++;
                if (arr[j] === undefined || pivot === undefined) {
                    continue;
                }
                let cond = ascending
                    ? arr[j] <= pivot
                    : arr[j] >= pivot;
                if (cond) {
                    i++;
                    this.stats.swaps++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            this.stats.swaps++;
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        };

        const quickSortRecursive = (arr, low, high) => {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSortRecursive(arr, low, pi - 1);
                quickSortRecursive(arr, pi + 1, high);
            }
        };

        quickSortRecursive(arr, 0, arr.length - 1);
        arr = arr.filter(el => el !== undefined).concat(arr.filter(el => el === undefined));
        this.stats.log("Quick Sort", arr);
        return arr;
    }
};