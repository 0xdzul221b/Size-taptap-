* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #311042 100%);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    overflow: hidden;
}

.game-container {
    width: 100%;
    max-width: 400px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    padding: 25px;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h2 {
    color: #818cf8;
    font-size: 1.2rem;
    letter-spacing: 1px;
}

#user-display {
    background: #312e81;
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid #4338ca;
}

.score-section {
    text-align: center;
    margin-top: 15px;
}

.score-section p {
    color: #94a3b8;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.score-section h1 {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(to right, #22d3ee, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.tap-area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
}

#tap-btn {
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    border: 6px solid #818cf8;
    width: 210px;
    height: 210px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 50px rgba(99, 102, 241, 0.5);
    transition: transform 0.05s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
}

#tap-btn:active {
    transform: scale(0.92);
}

.coin {
    font-size: 5rem;
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.6));
}

.ai-box {
    background: rgba(0, 0, 0, 0.4);
    border-left: 4px solid #10b981;
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 0.85rem;
    color: #e2e8f0;
    margin-bottom: 15px;
    line-height: 1.4;
    min-height: 55px;
}

.energy-section {
    background: rgba(255, 255, 255, 0.04);
    padding: 15px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.05);
}

.energy-text {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 8px;
    font-weight: 500;
}

.progress-bar {
    background: #020617;
    height: 12px;
    border-radius: 10px;
    overflow: hidden;
    padding: 2px;
}

#energy-fill {
    background: linear-gradient(to right, #06b6d4, #6366f1);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: width 0.1s ease;
}

/* ট্যাপ করলে যে লেখাটি ভেসে উঠবে তার অ্যানিমেশন */
.floating-num {
    position: absolute;
    color: #22d3ee;
    font-size: 1.8rem;
    font-weight: 900;
    animation: floatUp 0.8s ease-out forwards;
    pointer-events: none;
    text-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
    z-index: 500;
}

@keyframes floatUp {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-120px) scale(0.8); opacity: 0; }
}
