const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function maxFrogsInSingleBucket(N, positions) {
    let maxCount = 0;
    let buckets = new Array(2 * N + 1).fill(0);

    // Initialize the buckets with the initial positions of the frogs
    for (let pos of positions) {
        buckets[pos]++;
    }

    // Check the maximum count in the initial state
    maxCount = Math.max(...buckets);

    // Simulate the jumping process
    let allInSameBucket = false;

    while (!allInSameBucket) {
        allInSameBucket = true;
        let newPositions = [...positions];

        for (let i = 0; i < N; i++) {
            let currentPos = positions[i];
            let targetFrogIndex = -1;

            // Find the smallest index of a frog not in the same bucket
            for (let j = 1; j <= N; j++) {
                if (positions[j - 1] !== currentPos) {
                    targetFrogIndex = j - 1;
                    break;
                }
            }

            if (targetFrogIndex !== -1) {
                if (positions[targetFrogIndex] < currentPos) {
                    newPositions[i]--;
                } else {
                    newPositions[i]++;
                }
                allInSameBucket = false;
            }
        }

        positions = newPositions;

        // Update the bucket counts
        buckets.fill(0);
        for (let pos of positions) {
            buckets[pos]++;
        }

        // Check the maximum count in the current state
        maxCount = Math.max(maxCount, ...buckets);
    }

    return maxCount;
}

rl.on('line', (input) => {
    const data = input.split('\n');
    const T = parseInt(data[0]);
    let results = [];

    for (let i = 1; i <= T; i++) {
        const N = parseInt(data[i * 2 - 1]);
        const positions = data[i * 2].split(' ').map(Number);
        results.push(maxFrogsInSingleBucket(N, positions));
    }

    console.log(results.join('\n'));
    rl.close();
