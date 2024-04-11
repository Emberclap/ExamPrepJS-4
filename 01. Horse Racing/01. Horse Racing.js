function solve(input) {
    const horses = [];
    const horsesArr = input.shift().split('|');

    for (let i = 0; i < horsesArr.length; i++) {
        const currentHorse = horsesArr[i]
        horses.push({ name: currentHorse, position: horsesArr.length - i })
    }
    while (input != 'Finish') {
        const tokens = input.shift().split(' ');
        const action = tokens[0];

        if (action === 'Finish') {
            break;
        }

        if (action === 'Retake') {
            const overtakingHorse = horseFinder(tokens[1]);
            const overtakenHorse = horseFinder(tokens[2]);
            if (overtakingHorse && overtakenHorse) {
                if (overtakingHorse.position > overtakenHorse.position) {
                    [overtakingHorse.position, overtakenHorse.position] = [overtakenHorse.position, overtakingHorse.position]
                    console.log(`${overtakingHorse.name} retakes ${overtakenHorse.name}.`);
                }
            }
        }
        else if (action === 'Rage') {
            const currentHorse = horseFinder(tokens[1]);
            const horseCurrentPosition = currentHorse.position;
            let exactPosition = horseCurrentPosition - 2;
            if (exactPosition < 1) {
                exactPosition = 1;
            }
            while (exactPosition < currentHorse.position) {
                const horseToChangePosition = positionFinder(currentHorse.position - 1);
                currentHorse.position--;
                horseToChangePosition.position++;
            }
            console.log(`${currentHorse.name} rages 2 positions ahead.`);
        }
        else if (action === 'Trouble') {
            const currentHorse = horseFinder(tokens[1]);
            if (currentHorse) {
                const horseCurrentPosition = currentHorse.position;
                if (horseCurrentPosition < horses.length) {
                    const horseToChangePosition = positionFinder(horseCurrentPosition + 1);
                    horseToChangePosition.position--;
                    currentHorse.position++;
                    console.log(`Trouble for ${currentHorse.name} - drops one position.`);
                }
            }
        } else if (action === 'Miracle') {
            const currentHorse = positionFinder(horses.length);
            while (currentHorse.position > 1) {
                const horseToChangePosition = positionFinder(currentHorse.position - 1);
                currentHorse.position--;
                horseToChangePosition.position++;
            }
            console.log(`What a miracle - ${currentHorse.name} becomes first.`);
        }
    }
    let result = [];
    horses
        .sort((a, b) => b.position - a.position)
        .forEach(horse => result.push(horse.name))

    console.log(result.join('->'));
    console.log(`The winner is: ${result[result.length - 1]}`);

    function horseFinder(horseName) {
        return horses.find(x => x.name === horseName)
    }
    function positionFinder(horsePosition) {
        return horses.find(x => x.position === horsePosition)
    }

}
solve((['Bella|Sugar',
    'Retake Alexia Sugar',
    'Rage Bella',
    'Trouble Bella',
    'Finish']))

solve((['Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'])
)
solve((['Fancy|Lilly',
    'Retake Lilly Fancy',
    'Trouble Lilly',
    'Trouble Lilly',
    'Finish',
    'Rage Lilly']))