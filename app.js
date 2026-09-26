// Firebase 初始化設定
const firebaseConfig = {
    apiKey: "AIzaSyA8GiYixLGmW73CYg340D5xJTu_15SYlFA",
    authDomain: "tycoon-horizon-85f43.firebaseapp.com",
    databaseURL: "https://tycoon-horizon-85f43-default-rtdb.firebaseio.com",
    projectId: "tycoon-horizon-85f43",
    storageBucket: "tycoon-horizon-85f43.firebasestorage.app",
    messagingSenderId: "808593962056",
    appId: "1:808593962056:web:e015411fc7f4f3e76d547d",
    measurementId: "G-9D863R525T"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const ADMIN_EMAIL = "yahoo@gmail.com";

// 產業樹配置資料
const INDUSTRIES = [
    { id: "heavy", name: "1. 重工業與冶金 (採礦)", t1: "金屬礦石", t2: "粗鋼精煉銅", t3: "大型工業機具", basePrice: { t1: 12, t2: 55, t3: 280 }, techName: "超導體與超合金冶煉", techCost: 100000, techReq: { t1: 100, t2: 50, t3: 10 }, unlockParent: null },
    { id: "energy", name: "2. 能源與化學", t1: "原油天然氣", t2: "汽柴油塑膠", t3: "高階潤滑油", basePrice: { t1: 15, t2: 70, t3: 350 }, techName: "核聚變與反物質能源", techCost: 500000, techReq: { t1: 200, t2: 100, t3: 20 }, unlockParent: "heavy" },
    { id: "tech", name: "3. 高科技電子", t1: "晶圓稀土", t2: "晶片電路板", t3: "AI伺服器", basePrice: { t1: 25, t2: 120, t3: 650 }, techName: "量子算力矩陣", techCost: 2000000, techReq: { t1: 300, t2: 150, t3: 30 }, unlockParent: "energy" },
    { id: "agri", name: "4. 農業與食品加工", t1: "農作物鮮奶", t2: "麵粉植物油", t3: "精裝餐盒", basePrice: { t1: 8, t2: 35, t3: 180 }, techName: "合成生物基因食品", techCost: 5000000, techReq: { t1: 500, t2: 200, t3: 50 }, unlockParent: "tech" },
    { id: "light", name: "5. 輕工與紡織", t1: "棉花原木", t2: "布料紙漿", t3: "高級傢俱服飾", basePrice: { t1: 10, t2: 45, t3: 220 }, techName: "智能防護外骨骼布料", techCost: 10000000, techReq: { t1: 800, t2: 300, t3: 60 }, unlockParent: "agri" },
    { id: "auto", name: "6. 汽車與陸路運輸", t1: "鋼材橡膠", t2: "車用電池引擎", t3: "電動車EV", basePrice: { t1: 18, t2: 85, t3: 450 }, techName: "磁懸浮與反重力載具", techCost: 20000000, techReq: { t1: 1000, t2: 400, t3: 80 }, unlockParent: "light" },
    { id: "aero", name: "7. 航太與國防科技", t1: "鈦合金碳纖維", t2: "火箭推進器", t3: "商業客機火箭", basePrice: { t1: 40, t2: 200, t3: 1200 }, techName: "深空殖民艦隊與太空站", techCost: 50000000, techReq: { t1: 1200, t2: 500, t3: 100 }, unlockParent: "auto" }
];

let isSignUpMode = false;
let currentUser = null;
let playerData = { companyName: "", cash: 50000, inventory: {}, unlockedTechs: {}, activeTask: null, lastTimestamp: Date.now(), banned: false, message: "", isAdmin: false, redeemedCodes: {} };
let priceMultipliers = {};
let isAdminDataLoaded = false;

// Toast 訊息提示
function showToast(msg) {
    let container = document.getElementById('toast-container');
    let toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// 頁籤切換
function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    evt.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    // 避免管理員後台重複監聽造成畫面凍結，僅在點擊時手動載入資料
    if (tabId === 'tab-admin' && !isAdminDataLoaded) {
        refreshAdminData();
    }
}

// 監聽 Firebase 身分驗證狀態
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        db.ref('users/' + user.uid).on('value', snapshot => {
            let data = snapshot.exists() ? snapshot.val() : {};

            if (user.email === ADMIN_EMAIL) {
                data.isAdmin = true;
                if (!data.companyName) data.companyName = "最高聯邦總局 (ADMIN)";
            }

            if (data.banned) {
                alert("❌ 您的企業帳號已被管理員封鎖！無法進入遊戲。");
                auth.signOut();
                return;
            }

            playerData = { ...playerData, ...data };
            if (!playerData.inventory) playerData.inventory = {};
            if (!playerData.unlockedTechs) playerData.unlockedTechs = {};
            if (!playerData.redeemedCodes) playerData.redeemedCodes = {};

            Object.keys(playerData.inventory).forEach(k => {
                playerData.inventory[k] = Math.round(playerData.inventory[k] || 0);
            });

            document.getElementById('display-name').innerText = playerData.companyName || "企業用戶";
            document.getElementById('auth-sec').style.setProperty('display', 'none', 'important');
            document.getElementById('game-sec').style.display = 'block';

            if (user.email === ADMIN_EMAIL || playerData.isAdmin) {
                document.getElementById('admin-tab-btn').style.display = 'inline-flex';
                document.getElementById('admin-tag').style.display = 'inline-block';
            } else {
                document.getElementById('admin-tab-btn').style.display = 'none';
                document.getElementById('admin-tag').style.display = 'none';
            }

            if (playerData.message) {
                document.getElementById('msg-card').style.display = 'block';
                document.getElementById('msg-content').innerText = playerData.message;
            } else {
                document.getElementById('msg-card').style.display = 'none';
            }

            processOfflineEarnings();
        });

        listenToPriceMultipliers();
        renderProductionTab();
        renderIndustryTree();
        renderMarketSelects();
        startGameLoop();
        listenToGlobalMarket();
        initDefaultCode();
    } else {
        currentUser = null;
        document.getElementById('auth-sec').style.display = 'block';
        document.getElementById('game-sec').style.display = 'none';
    }
});

// 初始化預設萬用禮包碼
function initDefaultCode() {
    db.ref('codes/zxcvb123').get().then(snap => {
        if (!snap.exists()) {
            db.ref('codes/zxcvb123').set({
                type: 'ADMIN',
                val: 1,
                limit: 99999,
                used: 0,
                created: Date.now()
            });
        }
    }).catch(e => console.error("預設兌換碼建立失敗:", e));
}

// 玩家兌換禮包碼
function redeemCode() {
    let inputCode = document.getElementById('redeem-code-input').value.trim();
    if (!inputCode) return showToast("⚠️ 請輸入兌換碼！");

    if (playerData.redeemedCodes && playerData.redeemedCodes[inputCode]) {
        return showToast("❌ 您已經領取過此兌換碼！");
    }

    db.ref('codes/' + inputCode).get().then(snap => {
        if (!snap.exists()) {
            return showToast("❌ 無效的兌換碼！");
        }

        let cData = snap.val();
        let used = cData.used || 0;
        let limit = cData.limit || 1;

        if (used >= limit) {
            return showToast("❌ 該兌換碼已被領完，達到人數上限！");
        }

        if (cData.type === 'ADMIN') {
            playerData.isAdmin = true;
            showToast("🎉 兌換成功！獲得【最高管理員權限】！正在更新頁面...");
        } else if (cData.type === 'CASH') {
            let amount = Math.round(cData.val || 0);
            playerData.cash = Math.round(playerData.cash + amount);
            showToast(`🎉 兌換成功！獲得現金 $${amount.toLocaleString()}！`);
        } else {
            let itemKey = cData.type;
            playerData.inventory[itemKey] = Math.round((playerData.inventory[itemKey] || 0) + cData.val);
            showToast(`🎉 兌換成功！獲得指定物料 x${cData.val}！`);
        }

        if (!playerData.redeemedCodes) playerData.redeemedCodes = {};
        playerData.redeemedCodes[inputCode] = true;

        db.ref('users/' + currentUser.uid).set(playerData).then(() => {
            db.ref('codes/' + inputCode + '/used').transaction(u => (u || 0) + 1);
            document.getElementById('redeem-code-input').value = "";
            
            if (cData.type === 'ADMIN') {
                setTimeout(() => location.reload(), 800);
            }
        }).catch(err => alert("❌ 儲存失敗: " + err.message));

    }).catch(err => alert("❌ 讀取資料庫失敗: " + err.message));
}

// 計算離線生產收益（上限10小時）
function processOfflineEarnings() {
    if (!playerData.lastTimestamp) {
        playerData.lastTimestamp = Date.now();
        savePlayerData();
        return;
    }

    let now = Date.now();
    let offlineMs = now - playerData.lastTimestamp;
    const MAX_OFFLINE_MS = 10 * 3600 * 1000;

    if (offlineMs > 10000 && playerData.activeTask) {
        let actualMs = Math.min(offlineMs, MAX_OFFLINE_MS);
        let task = playerData.activeTask;
        let taskDurationMs = task.duration * 1000;
        let cycles = Math.floor(actualMs / taskDurationMs);

        if (cycles > 0) {
            let produced = 0;
            let targetKey = `${task.indId}_${task.stage}`;

            if (task.stage === 't1') {
                produced = cycles;
                playerData.inventory[targetKey] = Math.round((playerData.inventory[targetKey] || 0) + produced);
            } else {
                let reqKey = task.stage === 't2' ? `${task.indId}_t1` : `${task.indId}_t2`;
                let currentReqInv = playerData.inventory[reqKey] || 0;
                let maxPossibleCycles = Math.floor(currentReqInv / 2);
                let actualCycles = Math.min(cycles, maxPossibleCycles);

                if (actualCycles > 0) {
                    playerData.inventory[reqKey] -= actualCycles * 2;
                    playerData.inventory[targetKey] = Math.round((playerData.inventory[targetKey] || 0) + actualCycles);
                    produced = actualCycles;
                }

                if (actualCycles < cycles) {
                    playerData.activeTask = null;
                    showToast(`⚠️ 原料用盡，自動生產已暫停。`);
                }
            }

            let hoursStr = (actualMs / (3600 * 1000)).toFixed(1);
            let capTip = offlineMs > MAX_OFFLINE_MS ? " (已達 10 小時離線上限)" : "";
            showToast(`🌙 歡迎回來！離線 ${hoursStr} 小時${capTip}，共自動生產了 ${produced} 個【${task.displayName}】！`);
        }
    }

    playerData.lastTimestamp = now;
    savePlayerData();
}

// 切換登入與註冊模式
function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    document.getElementById('auth-title').innerHTML = isSignUpMode ? '<i class="fa-solid fa-user-plus"></i> 註冊新企業帳號' : '<i class="fa-solid fa-lock"></i> 企業帳號登入';
    document.getElementById('auth-btn').innerHTML = isSignUpMode ? '<i class="fa-solid fa-user-check"></i> 註冊' : '<i class="fa-solid fa-right-to-bracket"></i> 登入';
    document.getElementById('toggle-btn').innerHTML = isSignUpMode ? '<i class="fa-solid fa-right-to-bracket"></i> 切換至：登入帳號' : '<i class="fa-solid fa-user-plus"></i> 切換至：註冊新帳號';
    document.getElementById('company-name-box').style.display = isSignUpMode ? "block" : "none";
}

// 處理登入/註冊動作
function handleAuth() {
    let email = document.getElementById('auth-email').value.trim();
    let pass = document.getElementById('auth-pass').value.trim();
    if (!email || !pass) return showToast("⚠️ 請填寫 Email 與密碼！");

    if (isSignUpMode) {
        let company = document.getElementById('auth-company').value.trim();
        if (!company) return showToast("⚠️ 請輸入企業名稱！");
        
        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            let initData = {
                companyName: company,
                cash: 50000,
                inventory: {},
                unlockedTechs: {},
                isAdmin: (email === ADMIN_EMAIL)
            };
            db.ref('users/' + cred.user.uid).set(initData);
            showToast("🎉 註冊成功！歡迎進入遊戲。");
        }).catch(err => showToast("❌ 註冊失敗: " + err.message));
    } else {
        auth.signInWithEmailAndPassword(email, pass).catch(err => {
            if (err.code === 'auth/user-not-found') {
                showToast("❌ 帳號不存在！請先點擊【切換至：註冊新帳號】來創建帳號。");
            } else {
                showToast("❌ 登入失敗: " + err.message);
            }
        });
    }
}

function logout() { auth.signOut().then(() => location.reload()); }

function savePlayerData() { 
    if (currentUser) {
        playerData.lastTimestamp = Date.now();
        db.ref('users/' + currentUser.uid).set(playerData); 
    }
}

function listenToPriceMultipliers() {
    db.ref('priceMultipliers').on('value', snap => {
        priceMultipliers = snap.val() || {};
        updateMarketPriceDisplay();
    });
}

function isIndustryUnlocked(ind) {
    if (!ind.unlockParent) return true;
    return !!playerData.unlockedTechs[ind.unlockParent];
}

function renderProductionTab() {
    const container = document.getElementById('industry-production-list');
    if (!container) return;
    container.innerHTML = INDUSTRIES.map(ind => {
        let unlocked = isIndustryUnlocked(ind);
        let isTechUnlocked = playerData.unlockedTechs[ind.id];

        if (!unlocked) {
            let parentInd = INDUSTRIES.find(i => i.id === ind.unlockParent);
            return `
                <div class="industry-card locked">
                    <h4 style="margin:0; color:#888;"><i class="fa-solid fa-lock"></i> ${ind.name} (未解鎖)</h4>
                    <p style="font-size:0.85em; color:#dc3545; margin: 5px 0;">需先研發解鎖【${parentInd.name}】之終極科技</p>
                </div>
            `;
        }

        return `
            <div class="industry-card">
                <h4 style="margin:0 0 8px 0; color:#007bff;"><i class="fa-solid fa-industry"></i> ${ind.name}</h4>
                <div style="margin-bottom:6px;">
                    <div class="flex-between">
                        <span><i class="fa-solid fa-rotate"></i> 自動採集 (${ind.t1}) - 3秒/次</span>
                        <button class="btn btn-success" onclick="startAutoTask('${ind.id}', 't1')"><i class="fa-solid fa-play"></i> 啟動採集</button>
                    </div>
                </div>
                <div style="margin-bottom:6px;">
                    <div class="flex-between">
                        <span><i class="fa-solid fa-gears"></i> 加工組裝 (${ind.t2}) - 需 2x ${ind.t1} (5秒)</span>
                        <button class="btn btn-purple" onclick="startAutoTask('${ind.id}', 't2')"><i class="fa-solid fa-play"></i> 啟動加工</button>
                    </div>
                </div>
                <div style="margin-bottom:6px;">
                    <div class="flex-between">
                        <span><i class="fa-solid fa-box"></i> 高階製造 (${ind.t3}) - 需 2x ${ind.t2} (10秒)</span>
                        <button class="btn btn-teal" onclick="startAutoTask('${ind.id}', 't3')"><i class="fa-solid fa-play"></i> 啟動製造</button>
                    </div>
                </div>
                <div class="tech-box">
                    <div class="flex-between">
                        <b><i class="fa-solid fa-flask"></i> 科技: ${ind.techName}</b>
                        <span style="color:${isTechUnlocked ? '#28a745' : '#ffc107'}; font-weight:bold;">${isTechUnlocked ? '<i class="fa-solid fa-circle-check"></i> 已解鎖' : '未解鎖'}</span>
                    </div>
                    <div style="font-size:0.8em; color:#aaa; margin: 4px 0;">
                        資金: $${ind.techCost.toLocaleString()} | 材料: ${ind.t1}x${ind.techReq.t1}, ${ind.t2}x${ind.techReq.t2}, ${ind.t3}x${ind.techReq.t3}
                    </div>
                    ${!isTechUnlocked ? `<button class="btn btn-warning" style="width:100%;" onclick="unlockIndustryTech('${ind.id}')"><i class="fa-solid fa-atom"></i> 研發科技</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function startAutoTask(indId, stage) {
    let ind = INDUSTRIES.find(i => i.id === indId);
    let duration = stage === 't1' ? 3 : (stage === 't2' ? 5 : 10);
    let stageName = stage === 't1' ? ind.t1 : (stage === 't2' ? ind.t2 : ind.t3);

    if (stage !== 't1') {
        let reqKey = stage === 't2' ? `${indId}_t1` : `${indId}_t2`;
        if ((playerData.inventory[reqKey] || 0) < 2) {
            return showToast(`❌ 原物料不足！至少需要 2 單位材料。`);
        }
    }

    playerData.activeTask = {
        indId: indId,
        stage: stage,
        duration: duration,
        progress: 0,
        displayName: `${ind.name} - ${stageName}`
    };

    savePlayerData();
    showToast(`⚙️ 已開始自動生產：${stageName} (離線支援10小時)`);
}

function stopProductionTask() {
    if (playerData.activeTask) {
        showToast("🛑 已停止自動生產作業。");
        playerData.activeTask = null;
        savePlayerData();
    }
}

// 主遊戲實時進度 Loop
function startGameLoop() {
    setInterval(() => {
        if (playerData.activeTask) {
            let task = playerData.activeTask;
            task.progress += 0.1;
            let percent = Math.min((task.progress / task.duration) * 100, 100);

            document.getElementById('global-task-name').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${task.displayName} (${percent.toFixed(0)}%)`;
            document.getElementById('global-progress-bar').style.width = percent + "%";
            document.getElementById('stop-task-btn').style.display = "inline-flex";

            if (task.progress >= task.duration) {
                let targetKey = `${task.indId}_${task.stage}`;
                
                if (task.stage !== 't1') {
                    let reqKey = task.stage === 't2' ? `${task.indId}_t1` : `${task.indId}_t2`;
                    if ((playerData.inventory[reqKey] || 0) < 2) {
                        showToast(`⚠️ 材料耗盡！${task.displayName} 已自動停止。`);
                        playerData.activeTask = null;
                    } else {
                        playerData.inventory[reqKey] -= 2;
                        playerData.inventory[targetKey] = Math.round((playerData.inventory[targetKey] || 0) + 1);
                        task.progress = 0;
                    }
                } else {
                    playerData.inventory[targetKey] = Math.round((playerData.inventory[targetKey] || 0) + 1);
                    task.progress = 0;
                }
                savePlayerData();
            }
        } else {
            document.getElementById('global-task-name').innerHTML = "💤 工廠閒置中";
            document.getElementById('global-progress-bar').style.width = "0%";
            document.getElementById('stop-task-btn').style.display = "none";
        }
        updateUI();
    }, 100);
}

function unlockIndustryTech(indId) {
    let ind = INDUSTRIES.find(i => i.id === indId);
    if (!ind) return;

    if (playerData.cash < ind.techCost) return showToast(`❌ 現金不足 $${ind.techCost.toLocaleString()}！`);
    let t1Qty = playerData.inventory[`${indId}_t1`] || 0;
    let t2Qty = playerData.inventory[`${indId}_t2`] || 0;
    let t3Qty = playerData.inventory[`${indId}_t3`] || 0;

    if (t1Qty < ind.techReq.t1 || t2Qty < ind.techReq.t2 || t3Qty < ind.techReq.t3) {
        return showToast(`❌ 物料材料不足！`);
    }

    playerData.cash -= ind.techCost;
    playerData.inventory[`${indId}_t1`] -= ind.techReq.t1;
    playerData.inventory[`${indId}_t2`] -= ind.techReq.t2;
    playerData.inventory[`${indId}_t3`] -= ind.techReq.t3;
    playerData.unlockedTechs[indId] = true;

    savePlayerData();
    renderProductionTab();
    renderMarketSelects();
    showToast(`🎉 解鎖科技【${ind.techName}】！`);
}

function updateUI() {
    document.getElementById('cash').innerText = '$' + Math.round(playerData.cash).toLocaleString();
    let t1Sum = 0, t2Sum = 0, t3Sum = 0;
    let detailHtml = "";
    INDUSTRIES.forEach(ind => {
        let q1 = Math.round(playerData.inventory[`${ind.id}_t1`] || 0);
        let q2 = Math.round(playerData.inventory[`${ind.id}_t2`] || 0);
        let q3 = Math.round(playerData.inventory[`${ind.id}_t3`] || 0);
        t1Sum += q1; t2Sum += q2; t3Sum += q3;

        if (q1 > 0 || q2 > 0 || q3 > 0) {
            detailHtml += `<div><b>${ind.name}:</b> T1:${q1} | T2:${q2} | T3:${q3}</div>`;
        }
    });
    document.getElementById('inv-t1-sum').innerText = t1Sum;
    document.getElementById('inv-t2-sum').innerText = t2Sum;
    document.getElementById('inv-t3-sum').innerText = t3Sum;
    document.getElementById('inventory-detail-list').innerHTML = detailHtml || "<div>倉庫目前空空如也</div>";
}

function renderIndustryTree() {
    const container = document.getElementById('industry-tree-table-body');
    if (!container) return;
    container.innerHTML = INDUSTRIES.map(item => {
        let parent = item.unlockParent ? INDUSTRIES.find(i => i.id === item.unlockParent).name : "無 (初始)";
        return `
            <tr>
                <td style="font-weight:bold; color:#007bff;">${item.name}</td>
                <td>${item.t1}</td>
                <td>${item.t2}</td>
                <td>${item.t3}</td>
                <td style="color:#dc3545; font-weight:bold;">${item.techName}</td>
                <td style="color:#28a745;">$${item.techCost.toLocaleString()}</td>
                <td style="color:#ffc107;">${parent}</td>
            </tr>
        `;
    }).join('');
}

function renderMarketSelects() {
    let options = "";
    let giveOptions = '<option value="CASH">💵 現金 (USD)</option>';
    let codeOptions = '<option value="CASH">💵 現金 (USD)</option><option value="ADMIN">🛡️ 管理員權限 (ADMIN)</option>';

    INDUSTRIES.filter(ind => isIndustryUnlocked(ind)).forEach(ind => {
        options += `<option value="${ind.id}_t1">[T1] ${ind.name} - ${ind.t1}</option>`;
        options += `<option value="${ind.id}_t2">[T2] ${ind.name} - ${ind.t2}</option>`;
        options += `<option value="${ind.id}_t3">[T3] ${ind.name} - ${ind.t3}</option>`;
        
        giveOptions += `<option value="${ind.id}_t1">[T1] ${ind.t1}</option>`;
        giveOptions += `<option value="${ind.id}_t2">[T2] ${ind.t2}</option>`;
        giveOptions += `<option value="${ind.id}_t3">[T3] ${ind.t3}</option>`;

        codeOptions += `<option value="${ind.id}_t1">[T1] ${ind.t1}</option>`;
        codeOptions += `<option value="${ind.id}_t2">[T2] ${ind.t2}</option>`;
        codeOptions += `<option value="${ind.id}_t3">[T3] ${ind.t3}</option>`;
    });

    document.getElementById('sell-item').innerHTML = options;
    document.getElementById('npc-sell-item').innerHTML = options;
    document.getElementById('admin-give-item').innerHTML = giveOptions;
    document.getElementById('new-code-type').innerHTML = codeOptions;
    updateMarketPriceDisplay();
    updateNpcEstimate();
}

function getDynamicUnitPrice(itemKey) {
    let parts = itemKey.split('_');
    let ind = INDUSTRIES.find(i => i.id === parts[0]);
    let baseP = ind.basePrice[parts[1]];
    let mult = priceMultipliers[itemKey] || 1.0;
    return { baseP: baseP, dynamicP: Math.round(baseP * mult) };
}

function updateMarketPriceDisplay() {
    let val = document.getElementById('sell-item').value;
    if (!val) return;
    let priceInfo = getDynamicUnitPrice(val);
    document.getElementById('selected-market-price').innerText = priceInfo.dynamicP;
    document.getElementById('selected-min-price').innerText = priceInfo.baseP;
}

function updateNpcEstimate() {
    let val = document.getElementById('npc-sell-item').value;
    if (!val) return;
    let qty = Math.round(parseFloat(document.getElementById('npc-sell-qty').value) || 0);
    let priceInfo = getDynamicUnitPrice(val);
    let unitPrice = Math.round(priceInfo.dynamicP * 0.99);
    document.getElementById('npc-est-payout').innerText = '$' + Math.round(unitPrice * qty).toLocaleString();
}

function confirmNpcSell() {
    let val = document.getElementById('npc-sell-item').value;
    let qtyInput = document.getElementById('npc-sell-qty').value;
    
    if (qtyInput.includes('.')) return showToast("⚠️ 物品最小單位為 1，數量不可輸入小數點！");
    let qty = Math.round(parseFloat(qtyInput) || 0);
    
    if (qty <= 0) return showToast("⚠️ 請輸入有效的出售數量！");
    if ((playerData.inventory[val] || 0) < qty) return showToast("❌ 倉庫庫存不足！");

    let priceInfo = getDynamicUnitPrice(val);
    let unitPrice = Math.round(priceInfo.dynamicP * 0.99);
    let total = Math.round(unitPrice * qty);

    playerData.inventory[val] = Math.round(playerData.inventory[val] - qty);
    playerData.cash = Math.round(playerData.cash + total);
    savePlayerData();
    updateNpcEstimate();
    showToast(`💵 出售給政府，獲得 $${total.toLocaleString()}！`);
}

function postGlobalOrder() {
    let itemKey = document.getElementById('sell-item').value;
    let qtyInput = document.getElementById('sell-qty').value;
    let priceInput = document.getElementById('sell-price').value;

    if (qtyInput.includes('.')) {
        return showToast("⚠️ 物品最小單位為 1，數量嚴禁輸入小數點！");
    }

    let qty = Math.round(parseFloat(qtyInput));
    let price = Math.round(parseFloat(priceInput));

    let priceInfo = getDynamicUnitPrice(itemKey);
    if (price < priceInfo.baseP) return showToast(`⚠️ 價格不能低於法定底價 $${priceInfo.baseP}！`);

    let parts = itemKey.split('_');
    let ind = INDUSTRIES.find(i => i.id === parts[0]);
    let matName = ind[parts[1]];

    if (qty > 0 && price > 0 && (playerData.inventory[itemKey] || 0) >= qty) {
        playerData.inventory[itemKey] = Math.round(playerData.inventory[itemKey] - qty);
        savePlayerData();

        db.ref('market').push({
            sellerUid: currentUser.uid,
            sellerName: playerData.companyName || "未知企業",
            itemKey: itemKey,
            itemName: `${ind.name} (${matName})`,
            qty: qty,
            price: price,
            timestamp: Date.now()
        });
        showToast("📢 成功上架交易所！");
    } else showToast("❌ 庫存不足或數量錯誤！");
}

function listenToGlobalMarket() {
    db.ref('market').on('value', snapshot => {
        let tbody = document.getElementById('global-market-list');
        tbody.innerHTML = '';
        let data = snapshot.val();
        if (!data) {
            tbody.innerHTML = '<tr><td colspan="5">目前市場暫無賣單</td></tr>';
            return;
        }
        let now = Date.now();
        let isAdmin = currentUser && (currentUser.email === ADMIN_EMAIL || playerData.isAdmin);

        Object.keys(data).forEach(key => {
            let ord = data[key];

            if (ord.qty % 1 !== 0) {
                db.ref('market/' + key).remove();
                db.ref('users/' + ord.sellerUid + '/inventory/' + ord.itemKey).transaction(q => Math.round((q || 0) + ord.qty));
                return;
            }

            let isMine = ord.sellerUid === currentUser.uid;

            if (now - ord.timestamp > 12 * 3600 * 1000 && !ord.discounted) {
                ord.price = Math.round(ord.price * 0.9);
                ord.discounted = true;
                db.ref('market/' + key).update({ price: ord.price, discounted: true });
            }

            tbody.innerHTML += `
                <tr>
                    <td><b>${ord.sellerName || '匿名企業'}</b> ${isMine ? '(我)' : ''}</td>
                    <td>${ord.itemName || '未知物料'}</td>
                    <td>${Math.round(ord.qty)}</td>
                    <td>$${Math.round(ord.price)} ${ord.discounted ? '<span style="color:#dc3545; font-size:0.8em;">(降價10%)</span>' : ''}</td>
                    <td>
                        ${isMine ? '<span style="color:#aaa;">我的賣單</span>' : `<button class="btn btn-success" onclick="buyOrder('${key}', '${ord.itemKey}',${ord.qty}, ${ord.price}, '${ord.sellerUid}')"><i class="fa-solid fa-cart-shopping"></i> 購買</button>`}
                        ${isAdmin ? `<button class="btn btn-danger" style="padding:2px 5px; font-size:0.75em;" onclick="adminForceRemoveOrder('${key}', '${ord.sellerUid}', '${ord.itemKey}',${ord.qty})">強制下架</button>` : ''}
                    </td>
                </tr>
            `;
        });
    });
}

function buyOrder(orderId, itemKey, qty, price, sellerUid) {
    let total = Math.round(qty * price);
    if (playerData.cash < total) return showToast("❌ 現金不足！");

    db.ref('market/' + orderId).remove().then(() => {
        playerData.cash = Math.round(playerData.cash - total);
        playerData.inventory[itemKey] = Math.round((playerData.inventory[itemKey] || 0) + qty);
        savePlayerData();
        db.ref('users/' + sellerUid + '/cash').transaction(c => Math.round((c || 0) + total));

        db.ref('salesVolume/' + itemKey).transaction(vol => (vol || 0) + qty, (err, committed, snap) => {
            let totalVol = snap.val();
            if (totalVol >= 1000) {
                db.ref('salesVolume/' + itemKey).set(totalVol % 1000);
                setTimeout(() => {
                    db.ref('priceMultipliers/' + itemKey).transaction(m => +((m || 1.0) * 1.05).toFixed(3));
                }, 3600 * 1000);
            }
        });

        showToast("🛒 購買成功！已入庫。");
    }).catch(() => showToast("❌ 交易失敗，可能已被買走！"));
}

// 管理員控制台邏輯（採用 single fetch 防止無限迴圈與效能卡死）
function refreshAdminData() {
    isAdminDataLoaded = true;
    loadAdminCodesOnce();
    loadAdminUsersOnce();
}

function loadAdminCodesOnce() {
    db.ref('codes').once('value').then(snap => {
        let codes = snap.val() || {};
        let tbody = document.getElementById('admin-codes-list');
        tbody.innerHTML = '';

        Object.keys(codes).forEach(code => {
            let c = codes[code];
            let rewardStr = c.type === 'ADMIN' ? '🛡️ 管理權限' : (c.type === 'CASH' ? `$${c.val.toLocaleString()}` : `${c.type} x${c.val}`);
            
            tbody.innerHTML += `
                <tr>
                    <td><b style="color:var(--purple);">${code}</b></td>
                    <td>${rewardStr}</td>
                    <td>${c.used || 0} / ${c.limit || 1}</td>
                    <td>
                        <button class="btn btn-danger" style="padding:2px 5px; font-size:0.75em;" onclick="adminDeleteCode('${code}')">刪除</button>
                    </td>
                </tr>
            `;
        });
    }).catch(e => showToast("❌ 載入兌換碼失敗: " + e.message));
}

function loadAdminUsersOnce() {
    db.ref('users').once('value').then(snap => {
        let users = snap.val() || {};
        let tbody = document.getElementById('admin-user-list');
        let select = document.getElementById('admin-target-user');
        tbody.innerHTML = '';
        select.innerHTML = '';

        Object.keys(users).forEach(uid => {
            let u = users[uid];
            let isBanned = !!u.banned;

            tbody.innerHTML += `
                <tr>
                    <td style="font-size:0.75em;">${uid.substring(0, 8)}...</td>
                    <td><b>${u.companyName || '無名氏'}</b> ${u.isAdmin ? '<span style="color:#28a745;">(管理員)</span>' : ''}</td>
                    <td style="color:${isBanned ? '#dc3545' : '#28a745'};">${isBanned ? '已封鎖' : '正常'}</td>
                    <td>$${Math.round(u.cash || 0).toLocaleString()}</td>
                    <td>
                        <button class="btn ${isBanned ? 'btn-success' : 'btn-danger'}" style="padding:2px 6px; font-size:0.75em;" onclick="adminToggleBan('${uid}', ${isBanned})">
                            ${isBanned ? '解封' : 'Ban 封鎖'}
                        </button>
                    </td>
                </tr>
            `;

            select.innerHTML += `<option value="${uid}">${u.companyName || '無名氏'} (${uid.substring(0, 6)})</option>`;
        });
    }).catch(e => showToast("❌ 載入玩家清單失敗: " + e.message));
}

function adminCreateCode() {
    let code = document.getElementById('new-code-name').value.trim();
    let type = document.getElementById('new-code-type').value;
    let val = Math.round(parseFloat(document.getElementById('new-code-val').value) || 0);
    let limit = Math.round(parseFloat(document.getElementById('new-code-limit').value) || 1);

    if (!code) return showToast("⚠️ 請輸入兌換碼！");
    if (limit <= 0) return showToast("⚠️ 限制人數必須大於 0！");

    db.ref('codes/' + code).set({
        type: type,
        val: val,
        limit: limit,
        used: 0,
        created: Date.now()
    }).then(() => {
        showToast(`🎉 成功發布兌換碼：${code}`);
        document.getElementById('new-code-name').value = '';
        loadAdminCodesOnce();
    });
}

function adminDeleteCode(code) {
    db.ref('codes/' + code).remove().then(() => {
        showToast("🗑️ 已刪除兌換碼！");
        loadAdminCodesOnce();
    });
}

function adminToggleBan(targetUid, currentStatus) {
    db.ref('users/' + targetUid + '/banned').set(!currentStatus).then(() => {
        showToast(!currentStatus ? "🔒 已成功 Ban 封鎖該玩家！" : "🔓 已解封該玩家！");
        loadAdminUsersOnce();
    });
}

function adminGiveItem() {
    let targetUid = document.getElementById('admin-target-user').value;
    let itemKey = document.getElementById('admin-give-item').value;
    let qtyInput = document.getElementById('admin-give-qty').value;

    if (!targetUid) return showToast("⚠️ 請選擇目標玩家！");
    if (qtyInput.includes('.')) return showToast("⚠️ 物品數量不可帶小數點！");
    let qty = Math.round(parseFloat(qtyInput) || 0);
    if (qty <= 0) return showToast("⚠️ 請輸入有效數量！");

    if (itemKey === "CASH") {
        db.ref('users/' + targetUid + '/cash').transaction(c => Math.round((c || 0) + qty), () => {
            showToast("💵 已發放現金！");
            loadAdminUsersOnce();
        });
    } else {
        db.ref('users/' + targetUid + '/inventory/' + itemKey).transaction(q => Math.round((q || 0) + qty), () => {
            showToast("🎁 已發放物料！");
            loadAdminUsersOnce();
        });
    }
}

function adminSendMessage() {
    let targetUid = document.getElementById('admin-target-user').value;
    let msg = document.getElementById('admin-msg-text').value.trim();
    if (!targetUid) return showToast("⚠️ 請選擇目標玩家！");
    if (!msg) return showToast("⚠️ 請輸入私訊內容！");

    db.ref('users/' + targetUid + '/message').set(msg).then(() => {
        showToast("✉️ 已發送私訊通知給該玩家！");
        document.getElementById('admin-msg-text').value = '';
    });
}

function adminForceRemoveOrder(orderId, sellerUid, itemKey, qty) {
    db.ref('market/' + orderId).remove().then(() => {
        db.ref('users/' + sellerUid + '/inventory/' + itemKey).transaction(q => Math.round((q || 0) + qty));
        showToast("🔨 已強制下架該掛單並歸還物料！");
    });
}
