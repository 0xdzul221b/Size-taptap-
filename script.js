// CONFIGURATION
const OPENROUTER_API_KEY = "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"; //

// GAME STATES
let balance = 0;
let energy = 100;
let currentLevel = 1;
let maxEnergy = 100;
let tapPower = 1; // প্রতি ট্যাপে কত পয়েন্ট যোগ হবে

// DOM ELEMENTS
const balanceEl = document.getElementById("balance");
const energyValEl = document.getElementById("energy-val");
const energyFillEl = document.getElementById("energy-fill");
const tapBtn = document.getElementById("tap-btn");
const aiStatusEl = document.getElementById("ai-status");
const usernameEl = document.getElementById("username");
const levelBadgeEl = document.getElementById("level-badge");

// MODAL ELEMENTS
const nameModal = document.getElementById("name-modal");
const playerInput = document.getElementById("player-input");
const startBtn = document.getElementById("start-btn");

// PLAYER NAME CHECK (Local Storage)
let savedUser = localStorage.getItem("taptap_user");

if (savedUser) {
    nameModal.classList.add("hidden");
    usernameEl.innerText = savedUser;
} else {
    startBtn.addEventListener("click", () => {
        let name = playerInput.value.trim();
        if (name === "") {
            alert("Please enter a valid name!");
            return;
        }
        localStorage.setItem("taptap_user", name);
        usernameEl.innerText = name;
        nameModal.classList.add("hidden");
    });
}

// ENERGY RECOVERY (প্রতি সেকেন্ডে ১ এনার্জি রিচার্জ)
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        updateUI();
    }
}, 1000);

// লেভেল এবং ট্যাপিং পাওয়ার ক্যালকুলেশন ফাংশন
function checkLevel() {
    let calculatedLevel = 1;

    // আপনার দেওয়া রিকোয়ারমেন্ট অনুযায়ী পয়েন্ট রেঞ্জ ম্যাপিং
    if (balance >= 0 && balance <= 999) {
        calculatedLevel = 1;
    } else if (balance >= 1000 && balance <= 1999) {
        calculatedLevel = 2;
    } else if (balance >= 2000 && balance <= 4999) {
        calculatedLevel = 3;
    } else if (balance >= 5000 && balance <= 9999) {
        calculatedLevel = 4;
    } else if (balance >= 10000 && balance <= 19999) {
        calculatedLevel = 5;
    } else if (balance >= 20000 && balance <= 34999) {
        calculatedLevel = 6;
    } else if (balance >= 35000 && balance <= 49999) {
        calculatedLevel = 7;
    } else if (balance >= 50000 && balance <= 69999) {
        calculatedLevel = 8;
    } else if (balance >= 70000 && balance <= 89999) {
        calculatedLevel = 9;
    } else if (balance >= 90000) {
        calculatedLevel = 10;
    }

    // লেভেল পরিবর্তন হলে ক্ষমতা বাড়ানোর লজিক
    if (calculatedLevel !== currentLevel) {
        currentLevel = calculatedLevel;
        
        // লেভেল অনুযায়ী ট্যাপিং পাওয়ার বৃদ্ধি
        if (currentLevel === 1) tapPower = 1;
        else if (currentLevel === 2) tapPower = 2;   // ১০০০+ পয়েন্টে +২
        else if (currentLevel === 3) tapPower = 5;   // ২০০০+ পয়েন্টে +৫
        else if (currentLevel === 4) tapPower = 10;  // ৫০০০+ পয়েন্টে +১০
        else if (currentLevel === 5) tapPower = 20;  
        else if (currentLevel === 6) tapPower = 40;
        else if (currentLevel === 7) tapPower = 70;
        else if (currentLevel === 8) tapPower = 100;
        else if (currentLevel === 9) tapPower = 150;
        else if (currentLevel === 10) tapPower = 250; // লেভেল ১০ এ পৌঁছালে এক ট্যাপে +২৫০!

        // লেভেল বাড়লে এনার্জি লিমিটও বেড়ে যাবে
        maxEnergy = 100 + (currentLevel - 1) * 30; 
        energy = maxEnergy; // লেভেল আপ হলে এনার্জি ফুল করে দেওয়া হবে
        
        aiStatusEl.innerText = `🚀 Level Up! You reached Level ${currentLevel}. Tap Power is now +${tapPower}!`;
    }
}

function updateUI() {
    balanceEl.innerText = balance.toLocaleString();
    energyValEl.innerText = `${energy}/${maxEnergy}`;
    energyFillEl.style.width = `${(energy / maxEnergy) * 100}%`;
    levelBadgeEl.innerText = `⭐ LEVEL ${currentLevel}`;
}

// CLICK / TAP EVENT
tapBtn.addEventListener("click", (e) => {
    if (energy <= 0) {
        aiStatusEl.innerText = "❌ Out of energy! Wait for recharge.";
        return;
    }

    balance += tapPower;
    energy--;
    
    checkLevel();
    updateUI();
    createFloatingText(e, tapPower);

    // প্রতি ১০টি সফল ট্যাপ পরপর AI কোচ রেসপন্স জেনারেট করবে
    if (balance % (10 * tapPower) === 0) {
        getAiComment(balance);
    }
});

// Floating Text (+X) Animation Generator
function createFloatingText(e, power) {
    const float = document.createElement("div");
    float.classList.add("floating-num");
    float.innerText = `+${power}`;
    
    float.style.left = `${e.clientX - 15}px`;
    float.style.top = `${e.clientY - 30}px`;
    
    document.body.appendChild(float);
    
    setTimeout(() => {
        float.remove();
    }, 800);
}

// OpenRouter API Integration
async function getAiComment(currentScore) {
    const currentPlayer = localStorage.getItem("taptap_user") || "Gamer";
    aiStatusEl.innerText = "🤖 AI Coach is thinking...";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                messages: [
                    { 
                        role: "user", 
                        content: `Give a very short, funny comment for a taptap crypto gamer named ${currentPlayer} who is currently at Level ${currentLevel} with ${currentScore} points. Keep it under 15 words.` 
                    }
                ]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            aiStatusEl.innerText = "🤖 AI Coach: " + data.choices[0].message.content;
        }
    } catch (error) {
        console.error("AI Fetch Error:", error);
        aiStatusEl.innerText = `🤖 AI Coach: Nice speed, ${currentPlayer}! Keep going for Level ${currentLevel + 1}!`;
    }
}
