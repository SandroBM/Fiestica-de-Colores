
// Color Party JavaScript
const partyTitle = document.getElementById('party-title');
const colorGrid = document.getElementById('color-grid');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const popularColorDisplay = document.getElementById('popular-color');
const partySound = document.getElementById('party-sound');

class ColorParty {
    constructor() {
        this.timer = 10;
        this.colorVotes = {};
        this.countdownInterval = null;
        
        this.initializeEventListeners();
        this.resetParty();
    }

    generateRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    }

    startCountdown() {
        clearInterval(this.countdownInterval);
        this.timer = 10;
        timerDisplay.textContent = this.timer;
        
        this.countdownInterval = setInterval(() => {
            this.timer--;
            timerDisplay.textContent = this.timer;
            
            if (this.timer <= 0) {
                this.resetParty();
            }
        }, 1000);
    }

    createColorButton(color) {
        const btn = document.createElement('button');
        btn.classList.add('color-btn');
        btn.style.backgroundColor = color;
        btn.addEventListener('click', () => this.selectColor(color));
        return btn;
    }

    selectColor(color) {
        partyTitle.style.color = color;
        partySound.play();

        this.colorVotes[color] = (this.colorVotes[color] || 0) + 1;
        this.updatePopularColor();
        this.startCountdown();
    }

    updatePopularColor() {
        if (Object.keys(this.colorVotes).length === 0) {
            popularColorDisplay.innerHTML = '-';
            return;
        }

        const mostPopular = Object.entries(this.colorVotes).reduce((a, b) => 
            b[1] > a[1] ? b : a
        )[0];

        popularColorDisplay.innerHTML = `
            <span style="display:inline-block; width:20px; height:20px; background-color:${mostPopular}; border-radius:50%;"></span>
        `;
    }

    addColor() {
        const newColor = this.generateRandomColor();
        const colorBtn = this.createColorButton(newColor);
        
        if (colorGrid.children.length < 20) {
            colorGrid.insertBefore(colorBtn, colorGrid.lastElementChild);
        }
        
        this.startCountdown();
    }

    resetParty() {
        colorGrid.innerHTML = '';
        partyTitle.style.color = 'white';
        this.colorVotes = {};
        popularColorDisplay.textContent = '-';

        for (let i = 0; i < 3; i++) {
            const color = this.generateRandomColor();
            const colorBtn = this.createColorButton(color);
            colorGrid.appendChild(colorBtn);
        }

        const addColorBtn = this.createAddColorButton();
        colorGrid.appendChild(addColorBtn);

        this.startCountdown();
    }

    createAddColorButton() {
        const addColorBtn = document.createElement('button');
        addColorBtn.id = 'add-color-btn';
        addColorBtn.classList.add('color-btn');
        addColorBtn.textContent = '+';
        addColorBtn.addEventListener('click', () => this.addColor());
        return addColorBtn;
    }

    initializeEventListeners() {
        addBtn.addEventListener('click', () => this.addColor());
        resetBtn.addEventListener('click', () => this.resetParty());
    }
}

new ColorParty();
