// CONFIGURATION
const OPENROUTER_API_KEY = "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"; // <---

// GAME STATES
let balance = 0;
let energy = 100;
const maxEnergy = 100;

// DOM ELEMENTS
const balanceEl = document.getElementById("balance");
const energyValEl = document.getElementById("energy-val");
const energyFillEl = document.getElementById("energy-fill");
const tapBtn = document.getElementById("tap-btn");
const aiStatusEl = document.getElementById("ai-status");
const usernameEl = document.getElementById("username");

// ইউজারনেম হ্যান্ডলিং (Local Storage)
let savedUser = localStorage.getItem("taptap_user");
if (!savedUser) {
    savedUser = "Player_" + Math.floor(Math.random() * 9000 + 1000);
    localStorage.setItem("taptap_user", savedUser);
}
usernameEl.innerText = savedUser;

// এনার্জি রিকভারি (প্রতি ১ সেকেন্ডে ১ এনার্জি বাড়বে)
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        updateUI();
    }
}, 1000);

function updateUI() {
    balanceEl.innerText = balance.toLocaleString();
    energyValEl.innerText = `${energy}/${maxEnergy}`;
    energyFillEl.style.width = `${(energy / maxEnergy) * 100}%`;
}

// TAP ACTION
tapBtn.addEventListener("click", (e) => {
    if (energy <= 0) {
        aiStatusEl.innerText = "❌ Out of energy! Wait for recharge.";
        return;
    }

    balance++;
    energy--;
    updateUI();
    createFloatingText(e);

    // প্রতি ১০ ট্যাপে AI থেকে কমেন্ট নিবে
    if (balance % 10 === 0) {
        getAiComment(balance);
    }
});

// FLOATING TEXT (+1) ANIMATION
function createFloatingText(e) {
    const float = document.createElement("div");
    float.classList.add("floating-num");
    float.innerText = "+1";
    
    // মাউস/ট্যাপের পজিশন অনুযায়ী সেট করা
    float.style.left = `${e.clientX - 15}px`;
    float.style.top = `${e.clientY - 30}px`;
    
    document.body.appendChild(float);
    
    setTimeout(() => {
        float.remove();
    }, 800);
}

// OPENROUTER API CALL
async function getAiComment(currentScore) {
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
                        content: `Give a very short, funny, 1-sentence motivation for a tap-to-earn crypto gamer who just reached ${currentScore} points. Keep it under 15 words.` 
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
        aiStatusEl.innerText = "🤖 AI Coach: Keep tapping, you are doing great!";
    }
}
