import shuffle from './shuffle'

function initCards(totalCards: number | string) {
    const result = []
    const count = totalCards
    const side = Math.sqrt(+totalCards * 2)
    let currentValue = 1
    let currentId = 1

    for (let i = 1; i <= side; i++) {
        let row: CardRow[] = []

        for (let j = 1; j <= side; j++) {
            if (currentValue > count) {
                currentValue = 1
            }

            row.push({
                id: currentId++,
                value: currentValue++,
            })
        }

        result.push(shuffle<CardRow>(row))
    }

    return result
}

export default initCards