const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 画面サイズ設定
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ゲーム状態管理
let gameState = "TITLE"; // TITLE, PLAYING
let menuIndex = 0; // 0: New Game, 1: Continue
const menuItems = ["NEW GAME", "CONTINUE"];

// キー入力管理
window.addEventListener("keydown", e => {
    if (gameState === "TITLE") {
        if (e.key === "ArrowUp") {
            menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        }
        if (e.key === "ArrowDown") {
            menuIndex = (menuIndex + 1) % menuItems.length;
        }
        if (e.key === "Enter") {
            selectMenu();
        }
    }
});

function selectMenu() {
    if (menuIndex === 0) {
        console.log("Starting New Game...");
        gameState = "PLAYING";
    } else {
        alert("セーブデータがありません！"); // コンティニューの仮処理
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "TITLE") {
        drawTitleMenu();
    } else {
        drawGameScren();
    }
}

function drawTitleMenu() {
    // 背景（暗い森のイメージ）
    ctx.fillStyle = "#0a1a05";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // タイトル文字
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.font = "bold 60px 'Courier New', sans-serif";
    ctx.fillText("FOREST QUEST", canvas.width / 2, canvas.height / 3);

    // メニュー項目
    ctx.font = "30px 'Courier New', sans-serif";
    ctx.shadowBlur = 0;

    menuItems.forEach((item, index) => {
        const y = canvas.height / 2 + (index * 60);
        
        if (index === menuIndex) {
            // 選択中の項目（矢印を表示して光らせる）
            ctx.fillStyle = "#ffff00"; 
            ctx.fillText("▶ " + item, canvas.width / 2, y);
            
            // 選択中の枠線（RPG風）
            ctx.strokeStyle = "#ffff00";
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 120, y - 35, 240, 50);
        } else {
            // 非選択の項目
            ctx.fillStyle = "#aaaaaa";
            ctx.fillText(item, canvas.width / 2, y);
        }
    });
}

function drawGameScren() {
    ctx.fillStyle = "#2d5a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("冒険が始まった！ (ESCでタイトルへ)", canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ゲーム状態: TITLE, NAME_INPUT, PLAYING
let gameState = "TITLE";
let menuIndex = 0;
const menuItems = ["NEW GAME", "CONTINUE"];

// 名前入力用
let playerName = "";
const MAX_NAME_LENGTH = 8;

window.addEventListener("keydown", e => {
    if (gameState === "TITLE") {
        if (e.key === "ArrowUp") menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        if (e.key === "ArrowDown") menuIndex = (menuIndex + 1) % menuItems.length;
        if (e.key === "Enter") {
            if (menuIndex === 0) gameState = "NAME_INPUT";
            else alert("セーブデータがありません！");
        }
    } 
    else if (gameState === "NAME_INPUT") {
        if (e.key === "Enter" && playerName.length > 0) {
            gameState = "PLAYING"; // 名前を決めたら本編へ
        } else if (e.key === "Backspace") {
            playerName = playerName.slice(0, -1);
        } else if (e.key.length === 1 && playerName.length < MAX_NAME_LENGTH) {
            // 1文字の入力（英数字など）を受け付ける
            playerName += e.key;
        }
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameState === "TITLE") {
        drawTitleMenu();
    } else if (gameState === "NAME_INPUT") {
        drawNameInput();
    } else if (gameState === "PLAYING") {
        drawGameScren();
    }
}

function drawNameInput() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "30px 'Courier New', sans-serif";
    ctx.fillText("名前を入力してください", canvas.width / 2, canvas.height / 3);

    // 入力中の名前を表示する枠
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(canvas.width / 2 - 150, canvas.height / 2 - 30, 300, 60);
    
    // 入力中の文字と、末尾で点滅するカーソル
    let cursor = (Math.floor(Date.now() / 500) % 2 === 0) ? "_" : "";
    ctx.font = "40px 'Courier New', sans-serif";
    ctx.fillText(playerName + cursor, canvas.width / 2, canvas.height / 2 + 15);

    ctx.font = "20px 'Courier New', sans-serif";
    ctx.fillText("Enterキーで決定", canvas.width / 2, canvas.height / 2 + 100);
}

function drawTitleMenu() {
    ctx.fillStyle = "#0a1a05";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "bold 60px 'Courier New', sans-serif";
    ctx.fillText("FOREST QUEST", canvas.width / 2, canvas.height / 3);

    menuItems.forEach((item, index) => {
        const y = canvas.height / 2 + (index * 60);
        ctx.fillStyle = (index === menuIndex) ? "#ffff00" : "#aaaaaa";
        ctx.fillText((index === menuIndex ? "▶ " : "") + item, canvas.width / 2, y);
    });
}

function drawGameScren() {
    ctx.fillStyle = "#2d5a27";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillText(`冒険者 ${playerName} の旅が始まった！`, canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ゲーム状態: TITLE, NAME_INPUT, INTRO, PLAYING
let gameState = "TITLE";
let menuIndex = 0;
const menuItems = ["NEW GAME", "CONTINUE"];

let playerName = "";
const MAX_NAME_LENGTH = 8;

// セリフ管理用
let introText = "";
let introIndex = 0;
let charIndex = 0;
const introLines = [
    "……、……。",
    "……聞こえますか？",
    "目が覚めたようですね。",
    "あなたの冒険は、ここから始まります。"
];

window.addEventListener("keydown", e => {
    if (gameState === "TITLE") {
        if (e.key === "ArrowUp") menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        if (e.key === "ArrowDown") menuIndex = (menuIndex + 1) % menuItems.length;
        if (e.key === "Enter") {
            if (menuIndex === 0) gameState = "NAME_INPUT";
        }
    } 
    else if (gameState === "NAME_INPUT") {
        if (e.key === "Enter" && playerName.length > 0) {
            introLines[2] = `${playerName}、目が覚めたようですね。`; // 名前をセリフに組み込む
            gameState = "INTRO";
        } else if (e.key === "Backspace") {
            playerName = playerName.slice(0, -1);
        } else if (e.key.length === 1 && playerName.length < MAX_NAME_LENGTH) {
            playerName += e.key;
        }
    }
    else if (gameState === "INTRO") {
        if (e.key === "Enter" || e.key === " ") {
            // 全文字表示されていれば次のセリフへ、そうでなければ一気に表示
            if (charIndex < introLines[introIndex].length) {
                charIndex = introLines[introIndex].length;
            } else {
                nextIntro();
            }
        }
    }
});

function nextIntro() {
    introIndex++;
    charIndex = 0;
    if (introIndex >= introLines.length) {
        gameState = "PLAYING"; // セリフが終わったら森へ
    }
}

function update() {
    // セリフを一文字ずつ増やす（タイピング演出）
    if (gameState === "INTRO") {
        if (charIndex < introLines[introIndex].length) {
            charIndex += 0.2; // ここを大きくすると早くなる
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameState === "TITLE") {
        drawTitleMenu();
    } else if (gameState === "NAME_INPUT") {
        drawNameInput();
    } else if (gameState === "INTRO") {
        drawIntro();
    } else if (gameState === "PLAYING") {
        drawGameScren();
    }
}

function drawIntro() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px 'serif'";
    
    // 現在のセリフを切り出して表示
    let currentText = introLines[introIndex].substring(0, Math.floor(charIndex));
    ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);

    // 次へ促すアイコン
    if (charIndex >= introLines[introIndex].length) {
        let yOffset = Math.sin(Date.now() / 200) * 5;
        ctx.fillText("▼", canvas.width / 2, canvas.height / 2 + 60 + yOffset);
    }
}

// (drawTitleMenu, drawNameInput, drawGameScren は前回と同じため省略/維持)
function drawNameInput() {
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "30px sans-serif";
    ctx.fillText("名前を入力してください", canvas.width / 2, canvas.height / 3);
    ctx.fillText(playerName + (Math.floor(Date.now() / 500) % 2 === 0 ? "_" : ""), canvas.width / 2, canvas.height / 2);
}

function drawTitleMenu() {
    ctx.fillStyle = "#0a1a05"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "bold 60px sans-serif";
    ctx.fillText("FOREST QUEST", canvas.width / 2, canvas.height / 3);
    menuItems.forEach((item, index) => {
        ctx.fillStyle = (index === menuIndex) ? "#ffff00" : "#aaaaaa";
        ctx.fillText((index === menuIndex ? "▶ " : "") + item, canvas.width / 2, canvas.height / 2 + (index * 60));
    });
}

function drawGameScren() {
    ctx.fillStyle = "#2d5a27"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "30px Arial";
    ctx.fillText(`森に到着した ${playerName}`, canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
