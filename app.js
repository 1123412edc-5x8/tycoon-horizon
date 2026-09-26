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
// 全球 9 大領域 135 項完整產業鏈資料庫
const GAME_INDUSTRIES = [
  // 1. 能源與化學 (energy)
  { id: 'e1', name: '原油鑽井', cat: 'energy', tier: 1, cost: 2000, income: 50, in: '無', out: '原油' },
  { id: 'e2', name: '天然氣井', cat: 'energy', tier: 1, cost: 2500, income: 65, in: '無', out: '天然氣' },
  { id: 'e3', name: '鋰礦採掘場', cat: 'energy', tier: 1, cost: 3000, income: 80, in: '無', out: '鋰礦' },
  { id: 'e4', name: '鈾礦露天場', cat: 'energy', tier: 1, cost: 5000, income: 150, in: '無', out: '鈾礦' },
  { id: 'e5', name: '硫磺礦採集站', cat: 'energy', tier: 1, cost: 2200, income: 55, in: '無', out: '硫磺' },
  { id: 'e6', name: '煉油廠', cat: 'energy', tier: 2, cost: 12000, income: 350, in: '原油', out: '汽油' },
  { id: 'e7', name: '塑膠合成廠', cat: 'energy', tier: 2, cost: 15000, income: 420, in: '原油', out: '塑膠粒' },
  { id: 'e8', name: '鋰電池製造廠', cat: 'energy', tier: 2, cost: 20000, income: 600, in: '鋰礦', out: '鋰電池' },
  { id: 'e9', name: '濃縮鈾精煉廠', cat: 'energy', tier: 2, cost: 35000, income: 1100, in: '鈾礦', out: '濃縮鈾' },
  { id: 'e10', name: '化學肥料廠', cat: 'energy', tier: 2, cost: 14000, income: 380, in: '硫磺', out: '複合肥' },
  { id: 'e11', name: '航空燃料供應站', cat: 'energy', tier: 3, cost: 80000, income: 2800, in: '汽油', out: '現金' },
  { id: 'e12', name: '核能發電站組件廠', cat: 'energy', tier: 3, cost: 150000, income: 5500, in: '濃縮鈾', out: '現金' },
  { id: 'e13', name: '加油站連鎖', cat: 'energy', tier: 3, cost: 60000, income: 2100, in: '汽油', out: '現金' },
  { id: 'e14', name: '高階潤滑油旗艦店', cat: 'energy', tier: 3, cost: 50000, income: 1800, in: '汽油', out: '現金' },
  { id: 'e15', name: '氫能加氣站網', cat: 'energy', tier: 3, cost: 95000, income: 3400, in: '天然氣', out: '現金' },

  // 2. 農業與食品 (agri)
  { id: 'a1', name: '小麥農場', cat: 'agri', tier: 1, cost: 1000, income: 20, in: '無', out: '小麥' },
  { id: 'a2', name: '大豆農場', cat: 'agri', tier: 1, cost: 1200, income: 25, in: '無', out: '大豆' },
  { id: 'a3', name: '鮮奶牧場', cat: 'agri', tier: 1, cost: 1500, income: 35, in: '無', out: '生鮮牛奶' },
  { id: 'a4', name: '畜牧養殖場', cat: 'agri', tier: 1, cost: 1800, income: 45, in: '無', out: '生肉' },
  { id: 'a5', name: '精品咖啡莊園', cat: 'agri', tier: 1, cost: 2000, income: 50, in: '無', out: '咖啡豆' },
  { id: 'a6', name: '麵粉磨坊', cat: 'agri', tier: 2, cost: 6000, income: 150, in: '小麥', out: '麵粉' },
  { id: 'a7', name: '植物油壓榨廠', cat: 'agri', tier: 2, cost: 7500, income: 190, in: '大豆', out: '食用油' },
  { id: 'a8', name: '起司乳品加工廠', cat: 'agri', tier: 2, cost: 9000, income: 240, in: '生鮮牛奶', out: '起司乳品' },
  { id: 'a9', name: '肉品冷凍包裝廠', cat: 'agri', tier: 2, cost: 10000, income: 270, in: '生肉', out: '包裝肉品' },
  { id: 'a10', name: '咖啡烘焙工坊', cat: 'agri', tier: 2, cost: 11000, income: 300, in: '咖啡豆', out: '熟咖啡豆' },
  { id: 'a11', name: '連鎖快餐品牌', cat: 'agri', tier: 3, cost: 40000, income: 1200, in: '麵粉,包裝肉品', out: '現金' },
  { id: 'a12', name: '米其林高級餐廳', cat: 'agri', tier: 3, cost: 100000, income: 3600, in: '起司乳品,熟咖啡豆', out: '現金' },
  { id: 'a13', name: '精品咖啡連鎖店', cat: 'agri', tier: 3, cost: 45000, income: 1400, in: '熟咖啡豆', out: '現金' },
  { id: 'a14', name: '生鮮連鎖超市', cat: 'agri', tier: 3, cost: 55000, income: 1700, in: '包裝肉品,食用油', out: '現金' },
  { id: 'a15', name: '中央廚房餐盒廠', cat: 'agri', tier: 3, cost: 35000, income: 1050, in: '麵粉,包裝肉品', out: '現金' },

  // 3. 重工業與冶金 (heavy)
  { id: 'h1', name: '露天鐵礦場', cat: 'heavy', tier: 1, cost: 2500, income: 60, in: '無', out: '鐵礦石' },
  { id: 'h2', name: '銅礦採掘場', cat: 'heavy', tier: 1, cost: 2800, income: 70, in: '無', out: '銅礦石' },
  { id: 'h3', name: '鋁土礦採掘場', cat: 'heavy', tier: 1, cost: 3200, income: 85, in: '無', out: '鋁土礦' },
  { id: 'h4', name: '稀土礦採集站', cat: 'heavy', tier: 1, cost: 4500, income: 130, in: '無', out: '稀土原礦' },
  { id: 'h5', name: '石灰石採石場', cat: 'heavy', tier: 1, cost: 1500, income: 35, in: '無', out: '石灰石' },
  { id: 'h6', name: '大型煉鋼廠', cat: 'heavy', tier: 2, cost: 16000, income: 450, in: '鐵礦石', out: '鋼材' },
  { id: 'h7', name: '銅線抽絲廠', cat: 'heavy', tier: 2, cost: 18000, income: 520, in: '銅礦石', out: '高純度銅線' },
  { id: 'h8', name: '高純度矽晶圓廠', cat: 'heavy', tier: 2, cost: 30000, income: 950, in: '石灰石', out: '晶圓棒' },
  { id: 'h9', name: '鋁合金精練廠', cat: 'heavy', tier: 2, cost: 22000, income: 680, in: '鋁土礦', out: '航空鋁材' },
  { id: 'h10', name: '稀土元素提純廠', cat: 'heavy', tier: 2, cost: 32000, income: 1000, in: '稀土原礦', out: '高純稀土' },
  { id: 'h11', name: '建築鋼骨製造廠', cat: 'heavy', tier: 3, cost: 70000, income: 2400, in: '鋼材', out: '現金' },
  { id: 'h12', name: '大型工業機具廠', cat: 'heavy', tier: 3, cost: 120000, income: 4200, in: '鋼材,高純度銅線', out: '現金' },
  { id: 'h13', name: '自動化機械臂廠', cat: 'heavy', tier: 3, cost: 140000, income: 5000, in: '航空鋁材,高純稀土', out: '現金' },
  { id: 'h14', name: '重型工程車輛廠', cat: 'heavy', tier: 3, cost: 110000, income: 3900, in: '鋼材', out: '現金' },
  { id: 'h15', name: '礦山巨型掘進機廠', cat: 'heavy', tier: 3, cost: 180000, income: 6500, in: '鋼材,高純度銅線', out: '現金' },

  // 4. 輕工與紡織 (light)
  { id: 'l1', name: '天然棉花田', cat: 'light', tier: 1, cost: 1200, income: 25, in: '無', out: '原棉' },
  { id: 'l2', name: '天然橡膠園', cat: 'light', tier: 1, cost: 1800, income: 40, in: '無', out: '生橡膠' },
  { id: 'l3', name: '養蠶絲綢農場', cat: 'light', tier: 1, cost: 2200, income: 55, in: '無', out: '生絲' },
  { id: 'l4', name: '皮革原料牧場', cat: 'light', tier: 1, cost: 2000, income: 48, in: '無', out: '原皮' },
  { id: 'l5', name: '商業林場木材庫', cat: 'light', tier: 1, cost: 1500, income: 32, in: '無', out: '原木' },
  { id: 'l6', name: '大型紡織廠', cat: 'light', tier: 2, cost: 8000, income: 210, in: '原棉', out: '高品質布料' },
  { id: 'l7', name: '合成橡膠加工廠', cat: 'light', tier: 2, cost: 10000, income: 270, in: '生橡膠', out: '工業橡膠' },
  { id: 'l8', name: '印染與化纖廠', cat: 'light', tier: 2, cost: 11000, income: 310, in: '原棉', out: '染色布匹' },
  { id: 'l9', name: '紙漿與造紙廠', cat: 'light', tier: 2, cost: 9000, income: 240, in: '原木', out: '高級紙張' },
  { id: 'l10', name: '皮革熟化加工廠', cat: 'light', tier: 2, cost: 12000, income: 340, in: '原皮', out: '精製皮革' },
  { id: 'l11', name: '時尚服飾國際品牌', cat: 'light', tier: 3, cost: 50000, income: 1600, in: '高品質布料,精製皮革', out: '現金' },
  { id: 'l12', name: '專業運動鞋工廠', cat: 'light', tier: 3, cost: 45000, income: 1400, in: '工業橡膠,高品質布料', out: '現金' },
  { id: 'l13', name: '奢華木製家具門市', cat: 'light', tier: 3, cost: 60000, income: 1950, in: '原木,精製皮革', out: '現金' },
  { id: 'l14', name: '包裝紙箱印刷集團', cat: 'light', tier: 3, cost: 38000, income: 1150, in: '高級紙張', out: '現金' },
  { id: 'l15', name: '高級絲綢精品店', cat: 'light', tier: 3, cost: 55000, income: 1800, in: '生絲', out: '現金' },

  // 5. 高科技電子 (tech)
  { id: 't1', name: '高純度石英砂礦', cat: 'tech', tier: 1, cost: 3500, income: 90, in: '無', out: '高純石英' },
  { id: 't2', name: '晶圓切割廠', cat: 'tech', tier: 1, cost: 5000, income: 140, in: '無', out: '基礎晶圓' },
  { id: 't3', name: '導電銅箔廠', cat: 'tech', tier: 1, cost: 4000, income: 110, in: '無', out: '銅箔' },
  { id: 't4', name: '貴金屬提煉廠', cat: 'tech', tier: 1, cost: 6000, income: 180, in: '無', out: '工業黃金' },
  { id: 't5', name: '高科技螢幕基板廠', cat: 'tech', tier: 1, cost: 4500, income: 125, in: '無', out: '玻璃基板' },
  { id: 't6', name: 'IC 晶片製造廠', cat: 'tech', tier: 2, cost: 40000, income: 1300, in: '基礎晶圓', out: '先進晶片' },
  { id: 't7', name: 'OLED 顯示螢幕廠', cat: 'tech', tier: 2, cost: 28000, income: 850, in: '玻璃基板', out: '顯示螢幕' },
  { id: 't8', name: 'PCB 多層電路板廠', cat: 'tech', tier: 2, cost: 22000, income: 650, in: '銅箔', out: '電路板' },
  { id: 't9', name: '精密感測器封裝廠', cat: 'tech', tier: 2, cost: 25000, income: 750, in: '先進晶片', out: '感測器' },
  { id: 't10', name: '高速記憶體顆粒廠', cat: 'tech', tier: 2, cost: 35000, income: 1100, in: '基礎晶圓', out: '記憶體' },
  { id: 't11', name: '智慧型手機超級工廠', cat: 'tech', tier: 3, cost: 120000, income: 4300, in: '先進晶片,顯示螢幕', out: '現金' },
  { id: 't12', name: '個人電腦與筆電廠', cat: 'tech', tier: 3, cost: 100000, income: 3500, in: '先進晶片,電路板', out: '現金' },
  { id: 't13', name: 'AI 算力伺服器中心', cat: 'tech', tier: 3, cost: 250000, income: 9800, in: '先進晶片,記憶體', out: '現金' },
  { id: 't14', name: '超級電腦研發基地', cat: 'tech', tier: 3, cost: 300000, income: 12000, in: '先進晶片,記憶體', out: '現金' },
  { id: 't15', name: '智慧穿戴裝置旗艦店', cat: 'tech', tier: 3, cost: 85000, income: 2900, in: '感測器,先進晶片', out: '現金' },

  // 6. 汽車與運輸 (auto)
  { id: 'c1', name: '高張力車用鋼材廠', cat: 'auto', tier: 1, cost: 3000, income: 75, in: '無', out: '車用鋼板' },
  { id: 'c2', name: '車用橡膠煉製場', cat: 'auto', tier: 1, cost: 2500, income: 60, in: '無', out: '車用橡膠' },
  { id: 'c3', name: '安全強化玻璃廠', cat: 'auto', tier: 1, cost: 2200, income: 50, in: '無', out: '車用玻璃' },
  { id: 'c4', name: '鋰電池模組研發廠', cat: 'auto', tier: 1, cost: 4000, income: 110, in: '無', out: '電池模組' },
  { id: 'c5', name: '車用輕量化鋁材廠', cat: 'auto', tier: 1, cost: 3500, income: 90, in: '無', out: '車用鋁材' },
  { id: 'c6', name: 'V8 內燃機引擎廠', cat: 'auto', tier: 2, cost: 25000, income: 780, in: '車用鋼板,車用鋁材', out: '燃油引擎' },
  { id: 'c7', name: '汽車車架與底盤廠', cat: 'auto', tier: 2, cost: 20000, income: 600, in: '車用鋼板', out: '汽車底盤' },
  { id: 'c8', name: '高功率電動馬達廠', cat: 'auto', tier: 2, cost: 28000, income: 880, in: '車用鋼板', out: '電動馬達' },
  { id: 'c9', name: '車用 ECU 控制模組廠', cat: 'auto', tier: 2, cost: 30000, income: 950, in: '車用鋼板', out: '車用晶片' },
  { id: 'c10', name: '雙離合變速箱製造廠', cat: 'auto', tier: 2, cost: 22000, income: 670, in: '車用鋼板', out: '變速箱' },
  { id: 'c11', name: '豪華燃油跑車製造廠', cat: 'auto', tier: 3, cost: 150000, income: 5200, in: '燃油引擎,汽車底盤', out: '現金' },
  { id: 'c12', name: '新能源電動車超級工廠', cat: 'auto', tier: 3, cost: 200000, income: 7500, in: '電動馬達,電池模組', out: '現金' },
  { id: 'c13', name: '商業重型卡車組裝廠', cat: 'auto', tier: 3, cost: 130000, income: 4500, in: '燃油引擎,汽車底盤', out: '現金' },
  { id: 'c14', name: '全國連鎖 4S 車輛門市', cat: 'auto', tier: 3, cost: 80000, income: 2700, in: '汽車底盤', out: '現金' },
  { id: 'c15', name: '自動駕駛計程車車隊', cat: 'auto', tier: 3, cost: 180000, income: 6400, in: '車用晶片,電動馬達', out: '現金' },

  // 7. 航太與國防 (aero)
  { id: 'r1', name: '鈦合金提煉熔爐', cat: 'aero', tier: 1, cost: 5000, income: 140, in: '無', out: '鈦合金塊' },
  { id: 'r2', name: '碳纖維複合材料廠', cat: 'aero', tier: 1, cost: 6000, income: 170, in: '無', out: '碳纖維板' },
  { id: 'r3', name: '軍規耐高溫晶片廠', cat: 'aero', tier: 1, cost: 8000, income: 240, in: '無', out: '軍規晶片' },
  { id: 'r4', name: '特種航太橡膠封條廠', cat: 'aero', tier: 1, cost: 4000, income: 100, in: '無', out: '航太密封件' },
  { id: 'r5', name: '高比能火箭燃料廠', cat: 'aero', tier: 1, cost: 7000, income: 200, in: '無', out: '火箭燃料' },
  { id: 'r6', name: '火箭推進器製造廠', cat: 'aero', tier: 2, cost: 45000, income: 1500, in: '鈦合金塊,火箭燃料', out: '推進器' },
  { id: 'r7', name: '航電系統整合總廠', cat: 'aero', tier: 2, cost: 50000, income: 1700, in: '軍規晶片', out: '航電系統' },
  { id: 'r8', name: '相控陣雷達感測器廠', cat: 'aero', tier: 2, cost: 42000, income: 1400, in: '軍規晶片', out: '雷達系統' },
  { id: 'r9', name: '噴射渦輪引擎工廠', cat: 'aero', tier: 2, cost: 55000, income: 1900, in: '鈦合金塊,碳纖維板', out: '噴射引擎' },
  { id: 'r10', name: '高精度雷射陀螺儀廠', cat: 'aero', tier: 2, cost: 38000, income: 1250, in: '軍規晶片', out: '陀螺儀' },
  { id: 'r11', name: '商業雙通道客機廠', cat: 'aero', tier: 3, cost: 300000, income: 11000, in: '噴射引擎,航電系統', out: '現金' },
  { id: 'r12', name: '低軌通訊衛星超級工廠', cat: 'aero', tier: 3, cost: 220000, income: 8200, in: '雷達系統,陀螺儀', out: '現金' },
  { id: 'r13', name: '商業運載火箭發射場', cat: 'aero', tier: 3, cost: 400000, income: 15000, in: '推進器,航電系統', out: '現金' },
  { id: 'r14', name: '全地形國防裝甲車廠', cat: 'aero', tier: 3, cost: 180000, income: 6200, in: '鈦合金塊,噴射引擎', out: '現金' },
  { id: 'r15', name: '軍用無人機蜂群總廠', cat: 'aero', tier: 3, cost: 250000, income: 9500, in: '碳纖維板,軍規晶片', out: '現金' },

  // 8. 生技與醫療 (bio)
  { id: 'b1', name: '藥用植物種植園', cat: 'bio', tier: 1, cost: 1500, income: 35, in: '無', out: '草藥原萃' },
  { id: 'b2', name: '化學試劑基底廠', cat: 'bio', tier: 1, cost: 2000, income: 50, in: '無', out: '基礎試劑' },
  { id: 'b3', name: '高純度葡萄糖廠', cat: 'bio', tier: 1, cost: 1800, income: 42, in: '無', out: '醫用葡萄糖' },
  { id: 'b4', name: '醫用高分子材料廠', cat: 'bio', tier: 1, cost: 2800, income: 70, in: '無', out: '高分子塑膠' },
  { id: 'b5', name: '基因定序試劑採集站', cat: 'bio', tier: 1, cost: 3500, income: 95, in: '無', out: '酶試劑' },
  { id: 'b6', name: '醫用酒精精煉廠', cat: 'bio', tier: 2, cost: 8000, income: 210, in: '基礎試劑', out: '醫用酒精' },
  { id: 'b7', name: '微生物培養基實驗室', cat: 'bio', tier: 2, cost: 12000, income: 330, in: '醫用葡萄糖', out: '高級培養基' },
  { id: 'b8', name: '合成藥物化學總廠', cat: 'bio', tier: 2, cost: 20000, income: 600, in: '草藥原萃,基礎試劑', out: '藥物原料' },
  { id: 'b9', name: 'mRNA 疫苗原料研發中心', cat: 'bio', tier: 2, cost: 35000, income: 1100, in: '酶試劑', out: '疫苗原液' },
  { id: 'b10', name: '精密醫療耗材廠', cat: 'bio', tier: 2, cost: 15000, income: 420, in: '高分子塑膠', out: '醫療耗材' },
  { id: 'b11', name: '特效處方止痛藥廠', cat: 'bio', tier: 3, cost: 65000, income: 2100, in: '藥物原料', out: '現金' },
  { id: 'b12', name: '全球 mRNA 疫苗專利廠', cat: 'bio', tier: 3, cost: 160000, income: 5800, in: '疫苗原液', out: '現金' },
  { id: 'b13', name: '高階核磁共振醫療器材廠', cat: 'bio', tier: 3, cost: 180000, income: 6600, in: '醫療耗材', out: '現金' },
  { id: 'b14', name: '連鎖私立醫療綜合中心', cat: 'bio', tier: 3, cost: 120000, income: 4200, in: '醫療耗材,藥物原料', out: '現金' },
  { id: 'b15', name: '基因治療與克隆醫療所', cat: 'bio', tier: 3, cost: 250000, income: 9800, in: '疫苗原液', out: '現金' },

  // 9. 房地產與營建 (realty)
  { id: 'm1', name: '河沙採砂場', cat: 'realty', tier: 1, cost: 1000, income: 20, in: '無', out: '建築砂石' },
  { id: 'm2', name: '水泥石灰石礦場', cat: 'realty', tier: 1, cost: 1500, income: 35, in: '無', out: '石灰石' },
  { id: 'm3', name: '建築黏土採掘場', cat: 'realty', tier: 1, cost: 1200, income: 28, in: '無', out: '黏土' },
  { id: 'm4', name: '瀝青原油加工站', cat: 'realty', tier: 1, cost: 2000, income: 50, in: '無', out: '道路瀝青' },
  { id: 'm5', name: '建築玻璃原砂場', cat: 'realty', tier: 1, cost: 1800, income: 40, in: '無', out: '玻璃砂' },
  { id: 'm6', name: '紅磚與空心磚廠', cat: 'realty', tier: 2, cost: 6000, income: 150, in: '黏土', out: '建築磚塊' },
  { id: 'm7', name: '大型預拌混凝土廠', cat: 'realty', tier: 2, cost: 10000, income: 270, in: '建築砂石,石灰石', out: '商品混凝土' },
  { id: 'm8', name: '建築鋼筋加工廠', cat: 'realty', tier: 2, cost: 12000, income: 330, in: '建築砂石', out: '結構鋼筋' },
  { id: 'm9', name: '雙層隔音玻璃廠', cat: 'realty', tier: 2, cost: 9000, income: 230, in: '玻璃砂', out: '建材玻璃' },
  { id: 'm10', name: '防水與隔熱塗料廠', cat: 'realty', tier: 2, cost: 11000, income: 300, in: '道路瀝青', out: '防水塗料' },
  { id: 'm11', name: '高層住宅大樓建案', cat: 'realty', tier: 3, cost: 80000, income: 2800, in: '商品混凝土,結構鋼筋', out: '現金' },
  { id: 'm12', name: 'CBD 甲級商業辦公大樓', cat: 'realty', tier: 3, cost: 150000, income: 5500, in: '結構鋼筋,建材玻璃', out: '現金' },
  { id: 'm13', name: '五星級奢華飯店', cat: 'realty', tier: 3, cost: 200000, income: 7600, in: '建材玻璃,防水塗料', out: '現金' },
  { id: 'm14', name: '大型連鎖購物中心', cat: 'realty', tier: 3, cost: 180000, income: 6800, in: '商品混凝土', out: '現金' },
  { id: 'm15', name: '國際會展中心大樓', cat: 'realty', tier: 3, cost: 220000, income: 8500, in: '結構鋼筋', out: '現金' }
];

// 分類與 UI 選項對應
const CATEGORY_NAMES = {
    all: '全部產業',
    energy: '能源化學',
    agri: '農業食品',
    heavy: '重工冶金',
    light: '輕工紡織',
    tech: '高科技',
    auto: '汽車運輸',
    aero: '航太國防',
    bio: '生技醫療',
    realty: '房產營建'
};

let currentFilter = 'all';

// 初始化介面
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryFilter();
    renderIndustries();
});

// 渲染類別按鈕
function renderCategoryFilter() {
    const container = document.getElementById('category-filter');
    container.innerHTML = Object.entries(CATEGORY_NAMES).map(([key, label]) => `
        <button class="cat-btn ${currentFilter === key ? 'active' : ''}" onclick="filterCategory('${key}')">
            ${label}
        </button>
    `).join('');
}

// 切換類別
function filterCategory(cat) {
    currentFilter = cat;
    renderCategoryFilter();
    renderIndustries();
}

// 渲染產業卡片
function renderIndustries() {
    const grid = document.getElementById('industry-grid');
    const filtered = currentFilter === 'all' 
        ? GAME_INDUSTRIES 
        : GAME_INDUSTRIES.filter(item => item.cat === currentFilter);

    grid.innerHTML = filtered.map(item => `
        <div class="card">
            <div class="card-header">
                <h3>${item.name}</h3>
                <span class="tier-tag">Tier ${item.tier}</span>
            </div>
            <div class="card-body">
                <p>建造成本：$${item.cost.toLocaleString()}</p>
                <p>基礎產出：$${item.income}/週期</p>
                <p>消耗物料：${item.in}</p>
                <p>產出物料：${item.out}</p>
            </div>
            <div class="card-actions">
                <button class="btn-buy" onclick="buyIndustry('${item.id}')">建造 / 升級</button>
            </div>
        </div>
    `).join('');
}

// 切換頁籤
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    event.currentTarget.classList.add('active');
}
// 道具資料定義
const GAME_ITEMS = {
    item_box: { name: "泰坦幸運盲盒", desc: "開啟後隨機獲得 1 個機率爆擊卡或加速藥水！", color: "var(--purple)" },
    card_double: { name: "產量升級卡", desc: "產量升級！生產完成時 40% 機率爆擊獲得 2 個成品。", color: "var(--teal)" },
    card_nodrain: { name: "零材料省功卡", desc: "不用材料！加工時 30% 機率完全不消耗原料。", color: "var(--warning)" },
    card_extra: { name: "幸運再來一個卡", desc: "再來一個！完成時 25% 機率多獲贈 1 個隨機物料。", color: "var(--accent)" },
    potion_speed: { name: "工業加速藥水", desc: "時間加速！15 分鐘內生產所需時間減半 (速度 2 倍)！", color: "var(--danger)" }
};

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
let playerData = { companyName: "", cash: 50000, inventory: {}, items: {}, unlockedTechs: {}, activeTask: null, speedBuffUntil: 0, lastTimestamp: Date.now(), banned: false, message: "", isAdmin: false, redeemedCodes: {} };
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

// 關閉通知卡片並清空資料庫中的訊息
function closeNoticeCard() {
    document.getElementById('msg-card').style.display = 'none';
    playerData.message = "";
    if (currentUser) {
        db.ref('users/' + currentUser.uid + '/message').remove();
    }
}

// 頁籤切換
function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    evt.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');

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
            if (!playerData.items) playerData.items = {};
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
            renderItemsTab();
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
            showToast("🎉 兌換成功！獲得【最高管理員權限】與 5 個幸運盲盒！");
            playerData.items.item_box = (playerData.items.item_box || 0) + 5;
        } else if (cData.type === 'CASH') {
            let amount = Math.round(cData.val || 0);
            playerData.cash = Math.round(playerData.cash + amount);
            showToast(`🎉 兌換成功！獲得現金 $${amount.toLocaleString()}！`);
        } else if (GAME_ITEMS[cData.type]) {
            playerData.items[cData.type] = (playerData.items[cData.type] || 0) + cData.val;
            showToast(`🎉 兌換成功！獲得道具【${GAME_ITEMS[cData.type].name}】x${cData.val}！`);
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
            renderItemsTab();
            if (cData.type === 'ADMIN') {
                setTimeout(() => location.reload(), 800);
            }
        }).catch(err => alert("❌ 儲存失敗: " + err.message));

    }).catch(err => alert("❌ 讀取資料庫失敗: " + err.message));
}

// 渲染道具背包列表
function renderItemsTab() {
    const container = document.getElementById('items-list');
    if (!container) return;
    
    let html = "";
    Object.keys(GAME_ITEMS).forEach(itemKey => {
        let count = playerData.items[itemKey] || 0;
        let itemInfo = GAME_ITEMS[itemKey];

        html += `
            <div class="item-card">
                <div>
                    <h4 style="margin:0 0 4px 0; color:${itemInfo.color};"><i class="fa-solid fa-cube"></i> ${itemInfo.name}</h4>
                    <p style="font-size:0.8em; color:#bbb; margin:0 0 6px 0;">${itemInfo.desc}</p>
                </div>
                <div class="flex-between" style="margin-top:8px;">
                    <span style="font-weight:bold; color:#ffc107;">持有: ${count}</span>
                    <button class="btn" style="background:${itemInfo.color}; font-size:0.8em; padding:4px 8px;" ${count <= 0 ? 'disabled' : ''} onclick="useGameItem('${itemKey}')">使用道具</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// 使用道具邏輯
function useGameItem(itemKey) {
    if ((playerData.items[itemKey] || 0) <= 0) return showToast("❌ 道具數量不足！");

    playerData.items[itemKey]--;

    if (itemKey === 'item_box') {
        const pool = ['card_double', 'card_nodrain', 'card_extra', 'potion_speed'];
        let picked = pool[Math.floor(Math.random() * pool.length)];
        playerData.items[picked] = (playerData.items[picked] || 0) + 1;
        showToast(`🎁 盲盒開啟成功！恭喜獲得【${GAME_ITEMS[picked].name}】！`);
    } else if (itemKey === 'potion_speed') {
        playerData.speedBuffUntil = Date.now() + 15 * 60 * 1000;
        showToast("⚡ 已使用【工業加速藥水】！未來 15 分鐘生產速度翻倍！");
    } else {
        showToast(`✅ 已啟用【${GAME_ITEMS[itemKey].name}】效果！`);
    }

    savePlayerData();
    renderItemsTab();
}

// 計算離線生產收益
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
                items: { item_box: 3 },
                unlockedTechs: {},
                isAdmin: (email === ADMIN_EMAIL)
            };
            db.ref('users/' + cred.user.uid).set(initData);
            showToast("🎉 註冊成功！贈送 3 個幸運盲盒！歡迎進入遊戲。");
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

// 主遊戲實時進度 Loop（包含 4 大機率爆擊與加速邏輯）
function startGameLoop() {
    setInterval(() => {
        // 檢查加速 Buff 是否有效
        let isSpeeding = playerData.speedBuffUntil && playerData.speedBuffUntil > Date.now();
        document.getElementById('speed-buff-tag').style.display = isSpeeding ? 'inline-block' : 'none';

        if (playerData.activeTask) {
            let task = playerData.activeTask;
            let speedMultiplier = isSpeeding ? 2 : 1;
            
            // 推進進度
            task.progress += 0.1 * speedMultiplier;
            let percent = Math.min((task.progress / task.duration) * 100, 100);

            document.getElementById('global-task-name').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${task.displayName} (${percent.toFixed(0)}%)`;
            document.getElementById('global-progress-bar').style.width = percent + "%";
            document.getElementById('stop-task-btn').style.display = "inline-flex";

            if (task.progress >= task.duration) {
                let targetKey = `${task.indId}_${task.stage}`;
                
                // 2. 機率不用材料邏輯
                let hasNoDrainCard = (playerData.items.card_nodrain || 0) > 0;
                let triggerNoDrain = hasNoDrainCard && (Math.random() < 0.30);

                if (task.stage !== 't1') {
                    let reqKey = task.stage === 't2' ? `${task.indId}_t1` : `${task.indId}_t2`;
                    let reqCost = triggerNoDrain ? 0 : 2;

                    if (!triggerNoDrain && (playerData.inventory[reqKey] || 0) < 2) {
                        showToast(`⚠️ 材料耗盡！${task.displayName} 已自動停止。`);
                        playerData.activeTask = null;
                        savePlayerData();
                        return;
                    } else {
                        if (!triggerNoDrain) playerData.inventory[reqKey] -= reqCost;
                        if (triggerNoDrain) showToast("✨ 觸發【不用材料】！本輪完全不消耗原料！");
                    }
                }

                // 1. 機率產量升級爆擊邏輯 (雙倍產量)
                let hasDoubleCard = (playerData.items.card_double || 0) > 0;
                let triggerDouble = hasDoubleCard && (Math.random() < 0.40);
                let gainQty = triggerDouble ? 2 : 1;

                if (triggerDouble) showToast("💥 觸發【產量升級】爆擊！一次獲得 2 個成品！");

                playerData.inventory[targetKey] = Math.round((playerData.inventory[targetKey] || 0) + gainQty);

                // 3. 機率再來一個邏輯
                let hasExtraCard = (playerData.items.card_extra || 0) > 0;
                if (hasExtraCard && (Math.random() < 0.25)) {
                    let allKeys = [];
                    INDUSTRIES.forEach(i => allKeys.push(`${i.id}_t1`, `${i.id}_t2`, `${i.id}_t3`));
                    let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
                    playerData.inventory[randomKey] = Math.round((playerData.inventory[randomKey] || 0) + 1);
                    showToast("🎁 觸發【再來一個】！幸運獲贈 1 個額外隨機物料！");
                }

                task.progress = 0;
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
    
    Object.keys(GAME_ITEMS).forEach(k => {
        giveOptions += `<option value="ITEM_${k}">🎒 道具 - ${GAME_ITEMS[k].name}</option>`;
    });

    let codeOptions = '<option value="CASH">💵 現金 (USD)</option><option value="ADMIN">🛡️ 管理員權限 (ADMIN)</option>';
    Object.keys(GAME_ITEMS).forEach(k => {
        codeOptions += `<option value="${k}">🎒 道具 - ${GAME_ITEMS[k].name}</option>`;
    });

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

// 管理員控制台邏輯
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
            let rewardStr = c.type === 'ADMIN' ? '🛡️ 管理權限' : (c.type === 'CASH' ? `$${c.val.toLocaleString()}` : (GAME_ITEMS[c.type] ? `${GAME_ITEMS[c.type].name} x${c.val}` : `${c.type} x${c.val}`));
            
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
    if (qtyInput.includes('.')) return showToast("⚠️ 數量不可帶小數點！");
    let qty = Math.round(parseFloat(qtyInput) || 0);
    if (qty <= 0) return showToast("⚠️ 請輸入有效數量！");

    if (itemKey === "CASH") {
        db.ref('users/' + targetUid + '/cash').transaction(c => Math.round((c || 0) + qty), () => {
            showToast("💵 已發放現金！");
            loadAdminUsersOnce();
        });
    } else if (itemKey.startsWith("ITEM_")) {
        let realKey = itemKey.replace("ITEM_", "");
        db.ref('users/' + targetUid + '/items/' + realKey).transaction(q => Math.round((q || 0) + qty), () => {
            showToast("🎁 已發放道具卡！");
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
// Toast 提示系統
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function buyIndustry(id) {
    const item = GAME_INDUSTRIES.find(x => x.id === id);
    if (item) {
        showToast(`成功投資：${item.name}`);
    }
}
