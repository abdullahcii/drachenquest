let health = 100;
let gold = 70;
let xp = 0;
let weapons = [];
let dragonHealth;

function goToStore() {
    document.getElementById('store').style.display = 'block';
    hideBattleOptions();
}

function buyWeapon(weapon, cost, damage) {
    if (gold >= cost) {
        gold -= cost;
        weapons.push({ name: weapon, damage: damage });
        updateStats();
    } else {
        alert('Not enough gold!');
    }
}

function closeStore() {
    document.getElementById('store').style.display = 'none';
    if (dragonHealth === undefined) {
        showMainOptions();
    }
}

function initiateFight(type) {
    document.getElementById('options').style.display = 'none';
    document.getElementById('battle-options').style.display = 'block';
    document.getElementById('dragon-health').style.display = 'block';
    dragonHealth = type === 'small' ? 50 : 100; 
    updateStats();
}

function attackDragon() {
    let playerDamage = calculatePlayerDamage();
    let dragonDamage = Math.floor(Math.random() * 15) + 1; 

    health -= dragonDamage;
    dragonHealth -= playerDamage;

    if (health <= 0) {
        alert('You were defeated by the dragon! Game Over.');
        resetGame();
    } else if (dragonHealth <= 0) {
        let goldReward = calculateGoldReward();
        alert('Congratulations! You defeated the dragon and gained ' + goldReward + ' Gold.');
        xp += 50;
        gold += goldReward;
        resetBattle();
    } else {
        updateStats();
    }
}

function runAway() {
    alert('You managed to escape from the dragon!');
    resetBattle();
}

function updateStats() {
    document.getElementById('health').textContent = health;
    document.getElementById('gold').textContent = gold;
    document.getElementById('xp').textContent = xp;
    document.getElementById('weapons').textContent = weapons.map(w => w.name).join(', ');
    document.getElementById('dragon-health-value').textContent = dragonHealth;
}

function resetBattle() {
    showMainOptions();
    hideBattleOptions();
    document.getElementById('dragon-health').style.display = 'none';
    updateStats();
}

function resetGame() {
    health = 100;
    gold = 70;
    xp = 0;
    weapons = [];
    resetBattle();
}

function showMainOptions() {
    document.getElementById('options').style.display = 'block';
}

function hideBattleOptions() {
    document.getElementById('battle-options').style.display = 'none';
}

function calculatePlayerDamage() {
    let totalDamage = weapons.reduce((total, weapon) => total + weapon.damage, 0);
    return Math.floor(Math.random() * totalDamage) + 1;
}

function calculateGoldReward() {
    return Math.floor(Math.random() * 20) + 1; 
}
