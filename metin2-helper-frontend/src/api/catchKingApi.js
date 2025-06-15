export function fetchKingState() {
    return Promise.resolve({
        spawnInMs: 5 * 60 * 1000,
        scores: [
            { name: 'Atakan', score: 3 },
            { name: 'Leyla', score: 2 }
        ]
    })
}
