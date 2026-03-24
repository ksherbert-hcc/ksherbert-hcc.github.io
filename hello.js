


function startgame(user) {
    console.log("Hello, "+user+". Would you like to play a game?");
    console.log("1. Yes");
    console.log("2. No");
    console.log("");

    let choice = prompt("Enter your choice:");
    switch (choice) {
        case "1":
            woodedPath(user);
            return;
        case "2":
            console.log("You walk away without playing.");
            endgame();
            return;
        default:
            console.log(choice+" is not valid. Please enter a number corresponding to your choice.");
            startgame(user);
    }
}

function endgame() {
    console.log("");
    console.log("Game over. Refresh to play again.");
    console.log("");
    console.log("This was one of 5 unique endings. Try to find them all.");
}

function woodedPath(user, hasSword, killedOgre, hasPrincess) {
    console.log("You are in the woods, following a path to the enchanted castle.");
    console.log("1. Look around.");
    console.log("2. Walk down the path, toward the castle.");
    console.log("3. Walk down the path, away from the castle.");
    console.log("");

    let choice = prompt("Enter your choice:");
    switch (choice) {
        case "1":
            if (hasSword) {
                console.log("You don't find anything else.");
            } else {
                console.log("You find a sword embedded in a tree. You pull it out.");
            }
            woodedPath(user, true, killedOgre, hasPrincess);
            return;
        case "2":
            castleGate(user, hasSword, hasPrincess);
            return;
        case "3":
            if (hasPrincess) {
                console.log("You and the princess return home and live happily ever after.");
            } else {
                console.log("You go home. The princess is never seen or heard from again, and you are ridiculed as a coward.");
            }
            endgame();
            return;
        default:
            console.log(choice+" is not valid. Please enter a number corresponding to your choice.");
            woodedPath(user, true, killedOgre, hasPrincess);
    }
}

function castleGate(user, hasSword, killedOgre, hasPrincess) {
    if (killedOgre) {
        console.log("You are at the castle gate. The ogre lies dead at your feet.");
        console.log("1. Investigate the corpse.");
        console.log("2. Walk into the castle.");
        console.log("3. Go back down the path.");
        console.log("");
    } else if (hasPrincess) {
        console.log("You try to sneak back out, but the princess shrieks when she sees the ogre, and he eats you both.");
        endgame();
        return;
    } else {
        console.log("You are at the castle gate. It is guarded by a fearsome ogre.");
        console.log("1. Fight the ogre.");
        console.log("2. Sneak past the ogre into the castle.");
        console.log("3. Go back down the path.");
        console.log("");
    }

    let choice = prompt("Enter your choice:");
    switch (choice) {
        case "1":
            if (killedOgre) {
                console.log("The corpse is already starting to stink. Best leave it alone.");
                castleGate(user, hasSword, killedOgre, hasPrincess);
            } else if (hasSword) {
                console.log("You slay the ogre with your trusty sword.");
                castleGate(user, hasSword, true, hasPrincess);
            } else {
                console.log("Without a sword, you are no match for the ogre. It eats you.");
                endgame();
            }
            return;
        case "2":
            throneRoom(user, hasSword, killedOgre, hasPrincess);
            return;
        case "3":
            woodedPath(user, hasSword, killedOgre, hasPrincess);
            return;
        default:
            console.log(choice+" is not valid. Please enter a number corresponding to your choice.");
            castleGate(user, true, killedOgre, hasPrincess);
    }
}

function throneRoom(user, hasSword, killedOgre, hasPrincess) {
    if (hasPrincess) {
        console.log("The throne room is now quiet.");
    } else {
        console.log("The princess looks up from her throne. \""+user+"! You have come to save me! Let us be gone from this cursed place.\"");
    }
    console.log("1. Leave the castle.");
    console.log("");

    let choice = prompt("Enter your choice:");
    switch (choice) {
        case "1":
            castleGate(user, hasSword, killedOgre, true);
            return;
        default:
            console.log(choice+" is not valid. Please enter a number corresponding to your choice.");
            throneRoom(user, true, killedOgre, hasPrincess);
    }
}






let user = prompt("What is your name?");
startgame(user);