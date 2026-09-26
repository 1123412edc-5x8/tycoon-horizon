// --- 1. 遊戲資料庫設定 (9大產業, 135項產物) ---
const IND_DATA = [
    { id: "agri", name: "1. 農業與生技", techName: "完美基因工程", techCost: 100000, parent: null, 
      items: ["粗糙種子", "有機穀物", "營養麵粉", "初級飼料", "畜牧鮮肉", "基因作物", "合成蛋白", "特級營養液", "強化細胞飲", "醫療用血清", "萬能幹細胞", "生態培養艙", "完美複製體", "長壽基因藥", "神之恩典"] },
    { id: "wood", name: "2. 林業與新材料", techName: "生態共生矩陣", techCost: 500000, parent: "agri", 
      items: ["粗原木", "基礎木板", "強化合板", "造紙木漿", "基礎建材", "壓縮碳纖維", "阻燃塗層板", "奈米絕緣木", "智慧環境板", "生態共生材", "自修復建材", "記憶形狀板", "反重力地基", "次世代裝甲板", "星辰樹(宇宙建材)"] },
    { id: "mine", name: "3. 礦業與冶金", techName: "超導體與暗物質冶煉", techCost: 1500000, parent: "wood", 
      items: ["碎石", "粗鐵礦", "精煉鋼錠", "銅線圈", "鋁合金", "鈦金屬", "稀土粉末", "鎢鋼合金", "超導秘銀", "鈀金矩陣", "零元素礦", "暗物質碎塊", "空間摺疊晶體", "恆星核心碎片", "創世粒子"] },
    { id: "energy", name: "4. 能源與化工", techName: "核聚變與反物質能源", techCost: 5000000, parent: "mine", 
      items: ["煤炭", "原油", "天然氣", "精煉汽油", "高分子塑膠", "工業潤滑油", "固態電池", "鈾燃料棒", "核聚變核心", "電漿容器", "反物質粒子", "零點能模組", "虛空吸能器", "微型黑洞源", "宇宙魔方"] },
    { id: "light", name: "5. 輕工與民生科技", techName: "靈能防護外骨骼", techCost: 12000000, parent: "energy", 
      items: ["棉花", "粗布料", "成衣", "高級紡織品", "防護服", "智慧穿戴衣", "碳奈米絲裝", "光學迷彩服", "外骨骼纖維", "神經連結頭盔", "動力裝甲底層", "生物防護力場", "量子相位衣", "靈能增幅披風", "虛空漫步者裝備"] },
    { id: "tech", name: "6. 電子與半導體", techName: "量子算力與維度主機", techCost: 35000000, parent: "light", 
      items: ["矽砂", "粗製晶圓", "電路板", "基礎晶片", "高階處理器", "AI運算單元", "類神經網路", "光子運算核", "量子邏輯閘", "攜帶型超算", "全息投影陣列", "意識上傳模組", "行星級主機", "維度運算器", "宇宙真理引擎"] },
    { id: "auto", name: "7. 載具與重機具", techName: "反重力與巨獸機甲", techCost: 80000000, parent: "tech", 
      items: ["齒輪", "基礎引擎", "車用底盤", "燃油車", "電動車", "無人自駕車", "重型機甲", "磁懸浮載具", "次音速列車", "離子推進器", "單人飛行器", "陸戰巨獸機甲", "移動堡壘", "反重力航母", "行星吞噬者"] },
    { id: "aero", name: "8. 航太與國防", techName: "深空殖民艦隊與躍遷", techCost: 200000000, parent: "auto", 
      items: ["無人機", "觀測衛星", "商業客機", "近地軌道火箭", "太空梭", "登月艙", "軌道防禦衛星", "深空探測器", "離子驅動飛船", "星際採礦艦", "軌道電梯纜繩", "空間站核心", "恆星級戰艦", "躍遷引擎", "銀河母艦"] },
    { id: "quantum", name: "9. 量子與星際科技", techName: "多重宇宙與全知神格", techCost: 999999999, parent: "aero", 
      items: ["基礎數據", "加密區塊鏈", "虛擬現實艙", "元宇宙伺服器", "腦機接口", "記憶備份庫", "靈魂數位儀", "平行宇宙觀測", "時間膨脹艙", "蟲洞穩定器", "維度切割刀", "現實扭曲力場", "戴森球結構", "多重宇宙航標", "全知神格"] }
];

// 動態生成帶有細節的產線資料
const INDUSTRIES = IND_DATA.map(data => {
    return {
        id: data.id, 
        name: data.name, 
        unlockParent: data.parent, 
        techName: data.techName, 
        techCost: data.techCost,
        techReq: { t1: 500, t5: 100, t10: 10 },
        tiers: data.items.map((itemName, idx) => {
            let tierNum = idx + 1;
            return {
                id: `t${tierNum}`,
                name: itemName,
                time: 3 + (tierNum - 1) * 2, // T1需3秒, 隨階數遞增
                reqQty: tierNum === 1 ? 0 : 2, // 升級需2個上一階原料
                basePrice: Math.floor(10 * Math.pow(1.6, idx))
            };
        })
    };
});

// --- 2. 玩家資料與存檔系統 ---
let playerData = {
    cash: 500, // 初始資金
    inventory: {},
    unlockedTechs: { agri: true }, // 預設解鎖農業
    activeTask: null,
    items: {} 
};
let priceMultipliers = {}; // 動態物價

function savePlayerData() {
    localStorage.setItem('enterprise_save', JSON.stringify(playerData));
}

function loadPlayerData() {
    let saved = localStorage.getItem('enterprise_save');
    if (saved) {
        playerData = JSON.parse(saved);
        // 版本過渡防錯
        if (!playerData.unlockedTechs) playerData.unlockedTechs = { agri: true };
        if (!playerData.inventory) playerData.inventory = {};
    }
}

// --- 3. UI 渲染邏輯 ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
    if(tabId === 'market') renderMarketSelects();
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
                    <p style="font-size:0.85em; color:var(--danger); margin: 5px 0;">需先研發解鎖【${parentInd.name}】之終極科技</p>
                </div>`;
        }

        let tiersHtml = ind.tiers.map((tier, idx) => {
            let reqText = tier.reqQty === 0 ? "自動採集" : `需 2x ${ind.tiers[idx-1].name}`;
            return `
                <div style="margin-bottom:6px; background:#111; padding:8px; border-radius:4px; font-size:0.9em;">
                    <div class="flex-between">
                        <span>[T${idx+1}] ${tier.name} <br><small style="color:#aaa;">(${reqText} | ${tier.time}s)</small></span>
                        <button class="btn btn-purple" style="font-size:0.85em;" onclick="startAutoTask('${ind.id}', '${tier.id}')">
                            <i class="fa-solid fa-play"></i> 啟動
                        </button>
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="industry-card" style="max-height: 500px; overflow-y: auto;">
                <h4 style="margin:0 0 8px 0; color:var(--primary); position:sticky; top:0; background:#252525; padding:5px 0; z-index:10;">${ind.name}</h4>
                ${tiersHtml}
                <div class="tech-box">
                    <div class="flex-between" style="margin-bottom:5px;">
                        <b>科技: ${ind.techName}</b>
                        <span style="color:${isTechUnlocked ? 'var(--success)' : 'var(--warning)'}; font-weight:bold;">${isTechUnlocked ? '已解鎖' : '未解鎖'}</span>
                    </div>
                    <div style="font-size:0.8em; color:#aaa; margin-bottom: 8px;">
                        解鎖資金: $${ind.techCost.toLocaleString()}
                    </div>
                    ${!isTechUnlocked ? `<button class="btn btn-warning" style="width:100%;" onclick="unlockIndustryTech('${ind.id}')">研發下一級產業</button>` : ''}
                </div>
            </div>`;
    }).join('');
}

function updateUI() {
    document.getElementById('cash').innerText = '$' + Math.floor(playerData.cash).toLocaleString();
    let tBase = 0, tMid = 0, tHigh = 0;
    let detailHtml = "";
    
    INDUSTRIES.forEach(ind => {
        let indBase=0, indMid=0, indHigh=0;
        let lineDetails = [];
        ind.tiers.forEach((tier, idx) => {
            let qty = Math.floor(playerData.inventory[`${ind.id}_${tier.id}`] || 0);
            if (qty > 0) {
                lineDetails.push(`<span style="display:inline-block; margin-right:8px; font-size:0.9em; background:#333; padding:2px 6px; border-radius:4px;">${tier.name}: ${qty}</span>`);
                if(idx < 5) { tBase += qty; indBase += qty; }
                else if(idx < 10) { tMid += qty; indMid += qty; }
                else { tHigh += qty; indHigh += qty; }
            }
        });

        if (indBase > 0 || indMid > 0 || indHigh > 0) {
            detailHtml += `<div style="margin-bottom:10px;"><b style="color:var(--primary);">${ind.name}</b><br>${lineDetails.join('')}</div>`;
        }
    });
    
    document.getElementById('inv-t1-sum').innerText = tBase;
    document.getElementById('inv-t2-sum').innerText = tMid;
    document.getElementById('inv-t3-sum').innerText = tHigh;
    document.getElementById('inventory-detail-list').innerHTML = detailHtml || "<div style='color:#777;'>倉庫目前空空如也</div>";

    // 處理正在進行的任務 UI
    const taskBox = document.getElementById('active-task-box');
    if (playerData.activeTask) {
        taskBox.style.display = 'block';
        document.getElementById('task-name').innerText = playerData.activeTask.displayName;
        document.getElementById('task-time').innerText = `${playerData.activeTask.progress}s / ${playerData.activeTask.duration}s`;
        let pct = (playerData.activeTask.progress / playerData.activeTask.duration) * 100;
        document.getElementById('task-progress').style.width = pct + '%';
    } else {
        taskBox.style.display = 'none';
    }
}

function renderIndustryTree() {
    const container = document.getElementById('industry-tree-table-body');
    if (!container) return;
    container.innerHTML = INDUSTRIES.map(item => {
        let parent = item.unlockParent ? INDUSTRIES.find(i => i.id === item.unlockParent).name : "無 (初始)";
        return `
            <tr>
                <td style="font-weight:bold; color:var(--primary);">${item.name}</td>
                <td style="font-size:0.85em;">${item.tiers[0].name} ...至... <b style="color:var(--warning)">${item.tiers[14].name}</b></td>
                <td style="color:var(--danger); font-weight:bold;">${item.techName}</td>
                <td style="color:var(--success);">$${item.techCost.toLocaleString()}</td>
                <td style="color:var(--warning);">${parent}</td>
            </tr>
        `;
    }).join('');
}

// --- 4. 遊戲核心動作邏輯 ---
function startAutoTask(indId, tierId) {
    let ind = INDUSTRIES.find(i => i.id === indId);
    let currentTier = ind.tiers.find(t => t.id === tierId);
    let currentIdx = ind.tiers.indexOf(currentTier);

    // 檢查原料 (T1不用檢查)
    if (currentTier.reqQty > 0) {
        let prevTier = ind.tiers[currentIdx - 1];
        let reqKey = `${indId}_${prevTier.id}`;
        if ((playerData.inventory[reqKey] || 0) < currentTier.reqQty) {
            return showToast(`❌ 原料不足！啟動需要至少 ${currentTier.reqQty} 個【${prevTier.name}】。`, "error");
        }
    }

    playerData.activeTask = {
        indId: indId,
        tierId: tierId,
        duration: currentTier.time,
        progress: 0,
        displayName: `${ind.name} - ${currentTier.name}`
    };

    savePlayerData();
    showToast(`⚙️ 已開始自動生產：${currentTier.name}`);
    updateUI();
}

function unlockIndustryTech(indId) {
    let ind = INDUSTRIES.find(i => i.id === indId);
    if (playerData.cash < ind.techCost) {
        return showToast(`❌ 資金不足！需要 $${ind.techCost.toLocaleString()}`, "error");
    }
    playerData.cash -= ind.techCost;
    playerData.unlockedTechs[indId] = true;
    showToast(`🧪 科技研發成功！解鎖【${ind.techName}】及下一級產業！`);
    savePlayerData();
    renderProductionTab();
    updateUI();
}

// 遊戲迴圈 (每秒更新)
setInterval(() => {
    if (playerData.activeTask) {
        playerData.activeTask.progress += 1;
        
        let task = playerData.activeTask;
        if (task.progress >= task.duration) {
            let ind = INDUSTRIES.find(i => i.id === task.indId);
            let currentTier = ind.tiers.find(t => t.id === task.tierId);
            let tierIdx = ind.tiers.indexOf(currentTier);
            
            // 檢查並扣除原料 (防抽乾機制可擴充)
            if (currentTier.reqQty > 0) {
                let prevTier = ind.tiers[tierIdx - 1];
                let reqKey = `${task.indId}_${prevTier.id}`;
                
                if ((playerData.inventory[reqKey] || 0) < currentTier.reqQty) {
                    showToast(`⚠️ 材料耗盡！${task.displayName} 已自動停止。`, "error");
                    playerData.activeTask = null;
                } else {
                    playerData.inventory[reqKey] -= currentTier.reqQty;
                    // 產出
                    let targetKey = `${task.indId}_${task.tierId}`;
                    playerData.inventory[targetKey] = (playerData.inventory[targetKey] || 0) + 1;
                    task.progress = 0; // 重置進度以循環
                }
            } else {
                // T1 無需原料
                let targetKey = `${task.indId}_${task.tierId}`;
                playerData.inventory[targetKey] = (playerData.inventory[targetKey] || 0) + 1;
                task.progress = 0;
            }
            savePlayerData();
        }
    }
    updateUI();
}, 1000);

// --- 5. 市場交易邏輯 ---
function getDynamicUnitPrice(itemKey) {
    let parts = itemKey.split('_');
    let ind = INDUSTRIES.find(i => i.id === parts[0]);
    if(!ind) return { baseP: 0, dynamicP: 0 };
    let tier = ind.tiers.find(t => t.id === parts[1]);
    let baseP = tier ? tier.basePrice : 10;
    let mult = priceMultipliers[itemKey] || 1.0;
    return { baseP: baseP, dynamicP: Math.round(baseP * mult) };
}

function renderMarketSelects() {
    let options = "";
    INDUSTRIES.filter(ind => isIndustryUnlocked(ind)).forEach(ind => {
        ind.tiers.forEach((tier, idx) => {
            options += `<option value="${ind.id}_${tier.id}">[T${idx+1}] ${ind.name} - ${tier.name}</option>`;
        });
    });
    const sellItem = document.getElementById('sell-item');
    if (sellItem) {
        sellItem.innerHTML = options;
        updateMarketPriceDisplay();
    }
}

function updateMarketPriceDisplay() {
    let itemKey = document.getElementById('sell-item').value;
    let qty = parseInt(document.getElementById('sell-qty').value) || 1;
    let priceData = getDynamicUnitPrice(itemKey);
    let invQty = Math.floor(playerData.inventory[itemKey] || 0);
    
    document.getElementById('market-unit-price').innerText = '$' + priceData.dynamicP.toLocaleString();
    document.getElementById('market-inventory-qty').innerText = invQty;
    document.getElementById('market-total-revenue').innerText = '$' + (priceData.dynamicP * qty).toLocaleString();
}

function executeSell() {
    let itemKey = document.getElementById('sell-item').value;
    let qty = parseInt(document.getElementById('sell-qty').value);
    let invQty = Math.floor(playerData.inventory[itemKey] || 0);
    
    if (qty <= 0) return showToast("數量必須大於 0", "error");
    if (invQty < qty) return showToast("庫存不足！", "error");
    
    let priceData = getDynamicUnitPrice(itemKey);
    let revenue = priceData.dynamicP * qty;
    
    playerData.inventory[itemKey] -= qty;
    playerData.cash += revenue;
    
    // 簡易市場機制：大量拋售導致價格微降
    priceMultipliers[itemKey] = Math.max(0.3, (priceMultipliers[itemKey] || 1.0) - (qty * 0.005));
    
    showToast(`💰 成功出售 ${qty} 個物品，獲得 $${revenue.toLocaleString()}`);
    savePlayerData();
    updateMarketPriceDisplay();
    updateUI();
}

// 波動市價 (每分鐘刷新)
setInterval(() => {
    INDUSTRIES.forEach(ind => {
        ind.tiers.forEach(tier => {
            let key = `${ind.id}_${tier.id}`;
            let currentMult = priceMultipliers[key] || 1.0;
            // 價格有 50% 機率回調向 1.0，50% 隨機波動
            if (Math.random() > 0.5) {
                priceMultipliers[key] = currentMult + (Math.random() * 0.2 - 0.1);
            } else {
                priceMultipliers[key] = currentMult + (1.0 - currentMult) * 0.1;
            }
            priceMultipliers[key] = Math.max(0.3, Math.min(3.0, priceMultipliers[key]));
        });
    });
    if(document.getElementById('tab-market').classList.contains('active')) {
        updateMarketPriceDisplay();
    }
}, 60000);

// --- 6. 工具函式 ---
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = type === 'error' ? 'var(--danger)' : 'var(--success)';
    toast.innerHTML = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- 初始化執行 ---
window.onload = () => {
    loadPlayerData();
    renderProductionTab();
    renderIndustryTree();
    renderMarketSelects();
    updateUI();
};
