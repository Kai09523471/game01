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
