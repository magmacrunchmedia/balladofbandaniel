// shop.js - Shop system

// DOM references
const shopPanel = document.getElementById('shopPanel');
const shopItems = document.getElementById('shopItems');
const shopClose = document.getElementById('shopClose');
const coinCountDisplay = document.getElementById('coinCount');

// State
let shopOpen = false;
let coinsCollected = 0;

const shopItemsData = [
    { id: 'health_potion', name: 'Health Potion', description: 'Restores 30 health. Click in inventory to use!', price: 10, emoji: '🧪', usable: true, consumable: true },
    { id: 'speed_boots', name: 'Speed Boots', description: 'Increases movement speed', price: 25, emoji: '👢', usable: false },
    { id: 'magic_sword', name: 'Magic Sword', description: 'A powerful weapon (decorative)', price: 50, emoji: '⚔️', usable: false },
    { id: 'shield', name: 'Shield', description: 'Provides protection (decorative)', price: 30, emoji: '🛡️', usable: false },
    { id: 'treasure_map', name: 'Treasure Map', description: 'Shows hidden treasures (decorative)', price: 15, emoji: '🗺️', usable: false }
];

shopClose.addEventListener('click', () => {
    shopOpen = false;
    shopPanel.classList.remove('active');
});

function openShop() {
    shopOpen = true;
    shopPanel.classList.add('active');
    updateShopDisplay();
}

function updateShopDisplay() {
    shopItems.innerHTML = shopItemsData.map(item => {
        const owned = inventory.find(i => i.id === item.id);
        const canAfford = coinsCollected >= item.price;
        return `
            <div class="shop-item ${owned ? 'owned' : ''}" onclick="buyItem('${item.id}')" style="${!canAfford ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
                <div class="shop-item-info">
                    <div class="item-name">${item.emoji} ${item.name} ${owned ? '(Owned)' : ''}</div>
                    <div class="item-description">${item.description}</div>
                </div>
                <div class="shop-item-price">🪙 ${item.price}</div>
            </div>
        `;
    }).join('');
}

function buyItem(itemId) {
    const item = shopItemsData.find(i => i.id === itemId);
    const owned = inventory.find(i => i.id === itemId);
    
    if (owned) {
        return;
    }
    
    if (coinsCollected >= item.price) {
        coinsCollected -= item.price;
        coinCountDisplay.textContent = coinsCollected;
        inventory.push({...item});
        
        if (itemId === 'speed_boots') {
            player.speed = 0.25;
        }
        
        updateShopDisplay();
        updateInventoryDisplay();
    }
}

window.buyItem = buyItem;