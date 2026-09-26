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

// 產業分類定義
const CATEGORIES = {
    all: "全部設施",
    energy: "能源與化學",
    agri: "農業與食品",
    heavy: "重工業與冶金",
    light: "輕工與紡織",
    tech: "高科技電子",
    auto: "汽車與運輸",
    aero: "航太與國防",
    bio: "生技與醫療",
    realty: "房地產與營建"
};

// 135 項產業設施總表
const GAME_INDUSTRIES = [
  // 1. 能源與化學
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

  // 2. 農業與食品
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
  { id: 'a11', name: '連鎖快餐品牌', cat: 'agri', tier: 3, cost: 40000, income: 1200, in: '麵粉,包裝肉', out: '現金' },
  { id: 'a12', name: '米其林高級餐廳', cat: 'agri', tier: 3, cost: 100000, income: 3600, in: '高級食材', out: '現金' },
  { id: 'a13', name: '精品咖啡連鎖店', cat: 'agri', tier: 3, cost: 45000, income: 1400, in: '熟咖啡豆', out: '現金' },
  { id: 'a14', name: '生鮮連鎖超市', cat: 'agri', tier: 3, cost: 55000, income: 1700, in: '農產品', out: '現金' },
  { id: 'a15', name: '中央廚房餐盒廠', cat: 'agri', tier: 3, cost: 35000, income: 1050, in: '農產品', out: '現金' },

  // 3. 重工業與冶金
  { id: 'h1', name: '露天鐵礦場', cat: 'heavy', tier: 1, cost: 2500, income: 60, in: '無', out: '鐵礦石' },
  { id: 'h2', name: '銅礦採掘場', cat: 'heavy', tier: 1, cost: 2800, income: 70, in: '無', out: '銅礦石' },
  { id: 'h3', name: '鋁土礦採掘場', cat: 'heavy', tier: 1, cost: 3200, income: 85, in: '無', out: '鋁土礦' },
  { id: 'h4', name: '稀土礦採集站', cat: 'heavy', tier: 1, cost: 4500, income: 130, in: '無', out: '稀土原礦' },
  { id: 'h5', name: '石灰石採石場', cat: 'heavy', tier: 1, cost: 1500, income: 35, in: '無', out: '石灰石' },
  { id: 'h6', name: '大型煉鋼廠', cat: 'heavy', tier: 2, cost: 16000, income: 450, in: '鐵礦石', out: '鋼材' },
  { id: 'h7', name: '銅線抽絲廠', cat: 'heavy', tier: 2, cost: 18000, income: 520, in: '銅礦石', out: '高純度銅線' },
  { id: 'h8', name: '高純度矽晶圓廠', cat: 'heavy', tier: 2, cost: 30000, income: 950, in: '石英', out: '晶圓棒' },
  { id: 'h9', name: '鋁合金精練廠', cat: 'heavy', tier: 2, cost: 22000, income: 680, in: '鋁土礦', out: '航空鋁材' },
  { id: 'h10', name: '稀土元素提純廠', cat: 'heavy', tier: 2, cost: 32000, income: 1000, in: '稀土原礦', out: '高純稀土' },
  { id: 'h11', name: '建築鋼骨製造廠', cat: 'heavy', tier: 3, cost: 70000, income: 2400, in: '鋼材', out: '現金' },
  { id: 'h12', name: '大型工業機具廠', cat: 'heavy', tier: 3, cost: 120000, income: 4200, in: '鋼材,銅線', out: '現金' },
  { id: 'h13', name: '自動化機械臂廠', cat: 'heavy', tier: 3, cost: 140000, income: 5000, in: '合金,晶片', out: '現金' },
  { id: 'h14', name: '重型工程車輛廠', cat: 'heavy', tier: 3, cost: 110000, income: 3900, in: '鋼材,引擎', out: '現金' },
  { id: 'h15', name: '礦山巨型掘進機廠', cat: 'heavy', tier: 3, cost: 180000, income: 6500, in: '特種鋼', out: '現金' },

  // 4. 輕工與紡織
  { id: 'l1', name: '天然棉花田', cat: 'light', tier: 1, cost: 1200, income: 25, in: '無', out: '原棉' },
  { id: 'l2', name: '天然橡膠園', cat: 'light', tier: 1, cost: 1800, income: 40, in: '無', out: '生橡膠' },
  { id: 'l3', name: '養蠶絲綢農場', cat: 'light', tier: 1, cost: 2200, income: 55, in: '無', out: '生絲' },
  { id: 'l4', name: '皮革原料牧場', cat: 'light', tier: 1, cost: 2000, income: 48, in: '無', out: '原皮' },
  { id: 'l5', name: '商業林場木材庫', cat: 'light', tier: 1, cost: 1500, income: 32, in: '無', out: '原木' },
  { id: 'l6', name: '大型紡織廠', cat: 'light', tier: 2, cost: 8000, income: 210, in: '原棉', out: '高品質布料' },
  { id: 'l7', name: '合成橡膠加工廠', cat: 'light', tier: 2, cost: 10000, income: 270, in: '生橡膠', out: '工業橡膠' },
  { id: 'l8', name: '印染與化纖廠', cat: 'light', tier: 2, cost: 11000, income: 310, in: '化學劑', out: '染色布匹' },
  { id: 'l9', name: '紙漿與造紙廠', cat: 'light', tier: 2, cost: 9000, income: 240, in: '原木', out: '高級紙張' },
  { id: 'l10', name: '皮革熟化加工廠', cat: 'light', tier: 2, cost: 12000, income: 340, in: '原皮', out: '精製皮革' },
  { id: 'l11', name: '時尚服飾國際品牌', cat: 'light', tier: 3, cost: 50000, income: 1600, in: '布料,皮革', out: '現金' },
  { id: 'l12', name: '專業運動鞋工廠', cat: 'light', tier: 3, cost: 45000, income: 1400, in: '橡膠,布料', out: '現金' },
  { id: 'l13', name: '奢華木製家具門市', cat: 'light', tier: 3, cost: 60000, income: 1950, in: '原木,皮革', out: '現金' },
  { id: 'l14', name: '包裝紙箱印刷集團', cat: 'light', tier: 3, cost: 38000, income: 1150, in: '紙張', out: '現金' },
  { id: 'l15', name: '高級絲綢精品店', cat: 'light', tier: 3, cost: 55000, income: 1800, in: '生絲', out: '現金' },

  // 5. 高科技電子
  { id: 't1', name: '高純度石英砂礦', cat: 'tech', tier: 1, cost: 3500, income: 90, in: '無', out: '高純石英' },
  { id: 't2', name: '晶圓切割廠', cat: 'tech', tier: 1, cost: 5000, income: 140, in: '無', out: '基礎晶圓' },
  { id: 't3', name: '導電銅箔廠', cat: 'tech', tier: 1, cost: 4000, income: 110, in: '無', out: '銅箔' },
  { id: 't4', name: '貴金屬提煉廠', cat: 'tech', tier: 1, cost: 6000, income: 180, in: '無', out: '工業黃金' },
  { id: 't5', name: '高科技螢幕基板廠', cat: 'tech', tier: 1, cost: 4500, income: 125, in: '無', out: '玻璃基板' },
  { id: 't6', name: 'IC 晶片製造廠', cat: 'tech', tier: 2, cost: 40000, income: 1300, in: '晶圓,高純稀土', out: '先進晶片' },
  { id: 't7', name: 'OLED 顯示螢幕廠', cat: 'tech', tier: 2, cost: 28000, income: 850, in: '玻璃基板', out: '顯示螢幕' },
  { id: 't8', name: 'PCB 多層電路板廠', cat: 'tech', tier: 2, cost: 22000, income: 650, in: '銅箔', out: '電路板' },
  { id: 't9', name: '精密感測器封裝廠', cat: 'tech', tier: 2, cost: 25000, income: 750, in: '晶片', out: '感測器' },
  { id: 't10', name: '高速記憶體顆粒廠', cat: 'tech', tier: 2, cost: 35000, income: 1100, in: '晶圓', out: '記憶體' },
  { id: 't11', name: '智慧型手機超級工廠', cat: 'tech', tier: 3, cost: 120000, income: 4300, in: '晶片,螢幕', out: '現金' },
  { id: 't12', name: '個人電腦與筆電廠', cat: 'tech', tier: 3, cost: 100000, income: 3500, in: '晶片,電路板', out: '現金' },
  { id: 't13', name: 'AI 算力伺服器中心', cat: 'tech', tier: 3, cost: 250000, income: 9800, in: '高階晶片', out: '現金' },
  { id: 't14', name: '超級電腦研發基地', cat: 'tech', tier: 3, cost: 300000, income: 12000, in: '高階晶片', out: '現金' },
  { id: 't15', name: '智慧穿戴裝置旗艦店', cat: 'tech', tier: 3, cost: 85000, income: 2900, in: '感測器,晶片', out: '現金' },

  // 6. 汽車與運輸
  { id: 'c1', name: '高張力車用鋼材廠', cat: 'auto', tier: 1, cost: 3000, income: 75, in: '無', out: '車用鋼板' },
  { id: 'c2', name: '車用橡膠煉製場', cat: 'auto', tier: 1, cost: 2500, income: 60, in: '無', out: '車用橡膠' },
  { id: 'c3', name: '安全強化玻璃廠', cat: 'auto', tier: 1, cost: 2200, income: 50, in: '無', out: '車用玻璃' },
  { id: 'c4', name: '鋰電池模組研發廠', cat: 'auto', tier: 1, cost: 4000, income: 110, in: '無', out: '電池模組' },
  { id: 'c5', name: '車用輕量化鋁材廠', cat: 'auto', tier: 1, cost: 3500, income: 90, in: '無', out: '車用鋁材' },
  { id: 'c6', name: 'V8 內燃機引擎廠', cat: 'auto', tier: 2, cost: 25000, income: 780, in: '鋼板,鋁材', out: '燃油引擎' },
  { id: 'c7', name: '汽車車架與底盤廠', cat: 'auto', tier: 2, cost: 20000, income: 600, in: '鋼板', out: '汽車底盤' },
  { id: 'c8', name: '高功率電動馬達廠', cat: 'auto', tier: 2, cost: 28000, income: 880, in: '銅線,稀土', out: '電動馬達' },
  { id: 'c9', name: '車用 ECU 控制模組廠', cat: 'auto', tier: 2, cost: 30000, income: 950, in: '晶片,電路板', out: '車用晶片' },
  { id: 'c10', name: '雙離合變速箱製造廠', cat: 'auto', tier: 2, cost: 22000, income: 670, in: '鋼材', out: '變速箱' },
  { id: 'c11', name: '豪華燃油跑車製造廠', cat: 'auto', tier: 3, cost: 150000, income: 5200, in: '引擎,底盤', out: '現金' },
  { id: 'c12', name: '新能源電動車超級工廠', cat: 'auto', tier: 3, cost: 200000, income: 7500, in: '馬達,電池模組', out: '現金' },
  { id: 'c13', name: '商業重型卡車組裝廠', cat: 'auto', tier: 3, cost: 130000, income: 4500, in: '柴油引擎,底盤', out: '現金' },
  { id: 'c14', name: '全國連鎖 4S 車輛門市', cat: 'auto', tier: 3, cost: 80000, income: 2700, in: '成車', out: '現金' },
  { id: 'c15', name: '自動駕駛計程車車隊', cat: 'auto', tier: 3, cost: 180000, income: 6400, in: '電動車,自駕晶片', out: '現金' },

  // 7. 航太與國防
  { id: 'r1', name: '鈦合金提煉熔爐', cat: 'aero', tier: 1, cost: 5000, income: 140, in: '無', out: '鈦合金塊' },
  { id: 'r2', name: '碳纖維複合材料廠', cat: 'aero', tier: 1, cost: 6000, income: 170, in: '無', out: '碳纖維板' },
  { id: 'r3', name: '軍規耐高溫晶片廠', cat: 'aero', tier: 1, cost: 8000, income: 240, in: '無', out: '軍規晶片' },
  { id: 'r4', name: '特種航太橡膠封條廠', cat: 'aero', tier: 1, cost: 4000, income: 100, in: '無', out: '航太密封件' },
  { id: 'r5', name: '高比能火箭燃料廠', cat: 'aero', tier: 1, cost: 7000, income: 200, in: '無', out: '火箭燃料' },
  { id: 'r6', name: '火箭推進器製造廠', cat: 'aero', tier: 2, cost: 45000, income: 1500, in: '鈦合金,燃料', out: '推進器' },
  { id: 'r7', name: '航電系統整合總廠', cat: 'aero', tier: 2, cost: 50000, income: 1700, in: '軍規晶片', out: '航電系統' },
  { id: 'r8', name: '相控陣雷達感測器廠', cat: 'aero', tier: 2, cost: 42000, income: 1400, in: '晶片,稀土', out: '雷達系統' },
  { id: 'r9', name: '噴射渦輪引擎工廠', cat: 'aero', tier: 2, cost: 55000, income: 1900, in: '鈦合金,碳纖維', out: '噴射引擎' },
  { id: 'r10', name: '高精度雷射陀螺儀廠', cat: 'aero', tier: 2, cost: 38000, income: 1250, in: '光學元件', out: '陀螺儀' },
  { id: 'r11', name: '商業雙通道客機廠', cat: 'aero', tier: 3, cost: 300000, income: 11000, in: '噴射引擎,航電', out: '現金' },
  { id: 'r12', name: '低軌通訊衛星超級工廠', cat: 'aero', tier: 3, cost: 220000, income: 8200, in: '雷達,太陽能板', out: '現金' },
  { id: 'r13', name: '商業運載火箭發射場', cat: 'aero', tier: 3, cost: 400000, income: 15000, in: '推進器,航電', out: '現金' },
  { id: 'r14', name: '全地形國防裝甲車廠', cat: 'aero', tier: 3, cost: 180000, income: 6200, in: '鈦合金,引擎', out: '現金' },
  { id: 'r15', name: '軍用無人機蜂群總廠', cat: 'aero', tier: 3, cost: 250000, income: 9500, in: '碳纖維,軍規晶片', out: '現金' },

  // 8. 生技與醫療
  { id: 'b1', name: '藥用植物種植園', cat: 'bio', tier: 1, cost: 1500, income: 35, in: '無', out: '草藥原萃' },
  { id: 'b2', name: '化學試劑基底廠', cat: 'bio', tier: 1, cost: 2000, income: 50, in: '無', out: '基礎試劑' },
  { id: 'b3', name: '高純度葡萄糖廠', cat: 'bio', tier: 1, cost: 1800, income: 42, in: '無', out: '醫用葡萄糖' },
  { id: 'b4', name: '醫用高分子材料廠', cat: 'bio', tier: 1, cost: 2800, income: 70, in: '無', out: '高分子塑膠' },
  { id: 'b5', name: '基因定序試劑採集站', cat: 'bio', tier: 1, cost: 3500, income: 95, in: '無', out: '酶試劑' },
  { id: 'b6', name: '醫用酒精精煉廠', cat: 'bio', tier: 2, cost: 8000, income: 210, in: '基礎試劑', out: '醫用酒精' },
  { id: 'b7', name: '微生物培養基實驗室', cat: 'bio', tier: 2, cost: 12000, income: 330, in: '葡萄糖', out: '高級培養基' },
  { id: 'b8', name: '合成藥物化學總廠', cat: 'bio', tier: 2, cost: 20000, income: 600, in: '草藥原萃,試劑', out: '藥物原料' },
  { id: 'b9', name: 'mRNA 疫苗原料研發中心', cat: 'bio', tier: 2, cost: 35000, income: 1100, in: '酶試劑', out: '疫苗原液' },
  { id: 'b10', name: '精密醫療耗材廠', cat: 'bio', tier: 2, cost: 15000, income: 420, in: '高分子塑膠', out: '醫療耗材' },
  { id: 'b11', name: '特效處方止痛藥廠', cat: 'bio', tier: 3, cost: 65000, income: 2100, in: '藥物原料', out: '現金' },
  { id: 'b12', name: '全球 mRNA 疫苗專利廠', cat: 'bio', tier: 3, cost: 160000, income: 5800, in: '疫苗原液', out: '現金' },
  { id: 'b13', name: '高階核磁共振醫療器材廠', cat: 'bio', tier: 3, cost: 180000, income: 6600, in: '高階晶片,耗材', out: '現金' },
  { id: 'b14', name: '連鎖私立醫療綜合中心', cat: 'bio', tier: 3, cost: 120000, income: 4200, in: '醫療器材,藥品', out: '現金' },
  { id: 'b15', name: '基因治療與克隆醫療所', cat: 'bio', tier: 3, cost: 250000, income: 9800, in: '基因原液', out: '現金' },

  // 9. 房地產與營建
  { id: 'm1', name: '河沙採砂場', cat: 'realty', tier: 1, cost: 1000, income: 20, in: '無', out: '建築砂石' },
  { id: 'm2', name: '水泥石灰石礦場', cat: 'realty', tier: 1, cost: 1500, income: 35, in: '無', out: '石灰石' },
  { id: 'm3', name: '建築黏土採掘場', cat: 'realty', tier: 1, cost: 1200, income: 28, in: '無', out: '黏土' },
  { id: 'm4', name: '瀝青原油加工站', cat: 'realty', tier: 1, cost: 2000, income: 50, in: '無', out: '道路瀝青' },
  { id: 'm5', name: '建築玻璃原砂場', cat: 'realty', tier: 1, cost: 1800, income: 40, in: '無', out: '玻璃砂' },
  { id: 'm6', name: '紅磚與空心磚廠', cat: 'realty', tier: 2, cost: 6000, income: 150, in: '黏土', out: '建築磚塊' },
  { id: 'm7', name: '大型預拌混凝土廠', cat: 'realty', tier: 2, cost: 10000, income: 270, in: '砂石,石灰石', out: '商品混凝土' },
  { id: 'm8', name: '建築鋼筋加工廠', cat: 'realty', tier: 2, cost: 12000, income: 330, in: '鋼材', out: '結構鋼筋' },
  { id: 'm9', name: '雙層隔音玻璃廠', cat: 'realty', tier: 2, cost: 9000, income: 230, in: '玻璃砂', out: '建材玻璃' },
  { id: 'm10', name: '防水與隔熱塗料廠', cat: 'realty', tier: 2, cost: 11000, income: 300, in: '瀝青', out: '防水塗料' },
  { id: 'm11', name: '高層住宅大樓建案', cat: 'realty', tier: 3, cost: 80000, income: 2800, in: '混凝土,鋼筋', out: '現金' },
  { id: 'm12', name: 'CBD 甲級商業辦公大樓', cat: 'realty', tier: 3, cost: 150000, income: 5500, in: '鋼構,玻璃', out: '現金' },
  { id: 'm13', name: '五星級奢華飯店', cat: 'realty', tier: 3, cost: 200000, income: 7600, in: '建材,家具', out: '現金' },
  { id: 'm14', name: '大型連鎖購物中心', cat: 'realty', tier: 3, cost: 180000, income: 6800, in: '建材', out: '現金' },
  { id: 'm15', name: '國際會展中心大樓', cat: 'realty', tier: 3, cost: 220000, income: 8500, in: '鋼構', out: '現金' }
];

// 道具定義
const GAME_ITEMS = {
    item_box: { name: "泰坦幸運盲盒", desc: "開啟後隨機獲得 1 個機率爆擊卡或加速藥水！", color: "var(--purple)" },
    card_double: { name: "產量升級卡", desc: "產量升級！生產完成時 40% 機率爆擊獲得 2 個成品。", color: "var(--teal)" },
    card_nodrain: { name: "零材料省功卡", desc: "不用材料！加工時 30% 機率完全不消耗原料。", color: "var(--warning)" },
    card_extra: { name: "幸運再來一個卡", desc: "再來一個！完成時 25% 機率多獲贈 1 個隨機物料。", color: "var(--accent)" },
    potion_speed: { name: "工業加速藥水", desc: "時間加速！15 分鐘內生產所需時間減半 (速度 2 倍)！", color: "var(--danger)" }
};

let isSignUpMode = false;
let currentUser = null;
let playerData = { companyName: "", cash: 50000, inventory: {}, items: {}, ownedIndustries: {}, activeTask: null, speedBuffUntil: 0, lastTimestamp: Date.now(), banned: false, message: "", isAdmin: false, redeemedCodes: {} };
let priceMultipliers = {};
let isAdminDataLoaded = false;
let currentCategoryFilter = "all";
let isInitialized = false; // 新增：避免 Firebase 重複綁定與高頻刷新標記

// Toast 通知
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

function closeNoticeCard() {
    document.getElementById('msg-card').style.display = 'none';
    playerData.message = "";
    if (currentUser) db.ref('users/' + currentUser.uid + '/message').remove();
}

function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    evt.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'tab-admin' && !isAdminDataLoaded) {
        refreshAdminData();
    }
}

// 監聽 Auth（修復：防重複初始化與過載問題）
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
            if (!playerData.ownedIndustries) playerData.ownedIndustries = {};
            if (!playerData.redeemedCodes) playerData.redeemedCodes = {};

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
            renderCategoryButtons();
            renderProductionTab();
            renderItemsTab();
            updateUI(); // 確保資料更新時順帶重新計算並刷新 UI
        });

        // 防止開啟頁面時多次綁定全局監聽
        if (!isInitialized) {
            listenToPriceMultipliers();
            renderIndustryTree();
            renderMarketSelects();
            startGameLoop();
            listenToGlobalMarket();
            initDefaultCode();
            isInitialized = true;
        }
    } else {
        currentUser = null;
        isInitialized = false;
        document.getElementById('auth-sec').style.display = 'block';
        document.getElementById('game-sec').style.display = 'none';
    }
});

function initDefaultCode() {
    db.ref('codes/zxcvb123').get().then(snap => {
        if (!snap.exists()) {
            db.ref('codes/zxcvb123').set({ type: 'ADMIN', val: 1, limit: 99999, used: 0, created: Date.now() });
        }
    });
}

function redeemCode() {
    let inputCode = document.getElementById('redeem-code-input').value.trim();
    if (!inputCode) return showToast("⚠️ 請輸入兌換碼！");
    if (playerData.redeemedCodes && playerData.redeemedCodes[inputCode]) {
        return showToast("❌ 您已經領取過此兌換碼！");
    }

    db.ref('codes/' + inputCode).get().then(snap => {
        if (!snap.exists()) return showToast("❌ 無效的兌換碼！");
        let cData = snap.val();
        if ((cData.used || 0) >= (cData.limit || 1)) return showToast("❌ 該兌換碼已被領完！");

        if (cData.type === 'ADMIN') {
            playerData.isAdmin = true;
            showToast("🎉 兌換成功！獲得【最高管理員權限】與 5 個幸運盲盒！");
            playerData.items.item_box = (playerData.items.item_box || 0) + 5;
        } else if (cData.type === 'CASH') {
            playerData.cash += cData.val;
            showToast(`🎉 兌換成功！獲得現金 $${cData.val.toLocaleString()}！`);
        } else if (GAME_ITEMS[cData.type]) {
            playerData.items[cData.type] = (playerData.items[cData.type] || 0) + cData.val;
            showToast(`🎉 兌換成功！獲得道具【${GAME_ITEMS[cData.type].name}】x${cData.val}！`);
        } else {
            playerData.inventory[cData.type] = (playerData.inventory[cData.type] || 0) + cData.val;
            showToast(`🎉 兌換成功！獲得指定物料 x${cData.val}！`);
        }

        playerData.redeemedCodes[inputCode] = true;
        savePlayerData();
        db.ref('codes/' + inputCode + '/used').transaction(u => (u || 0) + 1);
        document.getElementById('redeem-code-input').value = "";
    });
}

function renderCategoryButtons() {
    const container = document.getElementById('category-buttons');
    if (!container) return;
    container.innerHTML = Object.keys(CATEGORIES).map(catKey => `
        <button class="cat-btn ${currentCategoryFilter === catKey ? 'active' : ''}" onclick="filterCategory('${catKey}')">
            ${CATEGORIES[catKey]}
        </button>
    `).join('');
}

function filterCategory(catKey) {
    currentCategoryFilter = catKey;
    renderCategoryButtons();
    renderProductionTab();
}

function renderProductionTab() {
    const container = document.getElementById('industry-production-list');
    if (!container) return;

    let filtered = GAME_INDUSTRIES.filter(ind => currentCategoryFilter === 'all' || ind.cat === currentCategoryFilter);

    container.innerHTML = filtered.map(ind => {
        let isOwned = !!playerData.ownedIndustries[ind.id];
        let duration = ind.tier === 1 ? 3 : (ind.tier === 2 ? 5 : 10);

        return `
            <div class="industry-card ${!isOwned ? 'locked' : ''}">
                <div class="flex-between">
                    <h4 style="margin:0; color:#007bff;">
                        <i class="fa-solid fa-industry"></i> ${ind.name}
                        <span class="tier-badge tier-${ind.tier}">Tier ${ind.tier}</span>
                    </h4>
                    <span style="color:${isOwned ? '#28a745' : '#ffc107'}; font-weight:bold; font-size:0.85em;">
                        ${isOwned ? '<i class="fa-solid fa-circle-check"></i> 已建造' : '未建造'}
                    </span>
                </div>
                <div style="font-size:0.8em; color:#aaa; margin: 4px 0;">
                    ${CATEGORIES[ind.cat]} | 建造費用: <b style="color:#28a745;">$${ind.cost.toLocaleString()}</b> | 週期: ${duration}秒
                </div>
                <div style="font-size:0.85em; margin: 4px 0;">
                    <b>消耗材料:</b> ${ind.in} ➔ <b>產出:</b> <span style="color:#ffc107;">${ind.out}</span> (基礎產值: $${ind.income})
                </div>
                <div style="margin-top:8px;">
                    ${!isOwned ? `
                        <button class="btn btn-warning" style="width:100%;" onclick="buyIndustryFacility('${ind.id}')">                             <i class="fa-solid fa-hammer"></i> 建造設施 ($${ind.cost.toLocaleString()})
                        </button>
                    ` : `
                        <button class="btn btn-success" style="width:100%;" onclick="startIndustryTask('${ind.id}')">
                            <i class="fa-solid fa-play"></i> 啟動自動營運
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function buyIndustryFacility(indId) {
    let ind = GAME_INDUSTRIES.find(i => i.id === indId);
    if (!ind) return;

    if (playerData.cash < ind.cost) {
        return showToast(`❌ 現金不足！需要 $${ind.cost.toLocaleString()}`);
    }

    playerData.cash -= ind.cost;
    playerData.ownedIndustries[indId] = true;
    savePlayerData();
    renderProductionTab();
    updateUI();
    showToast(`🎉 成功建造設施【${ind.name}】！`);
}

function startIndustryTask(indId) {
    let ind = GAME_INDUSTRIES.find(i => i.id === indId);
    if (!ind) return;

    let duration = ind.tier === 1 ? 3 : (ind.tier === 2 ? 5 : 10);

    playerData.activeTask = {
        indId: ind.id,
        duration: duration,
        progress: 0,
        displayName: `${ind.name} (${ind.out})`
    };

    savePlayerData();
    showToast(`⚙️ 啟動營運：${ind.name}`);
}

function stopProductionTask() {
    if (playerData.activeTask) {
        showToast("🛑 已停止自動生產。");
        playerData.activeTask = null;
        savePlayerData();
    }
}

// 核心計時器（修復：優化繪製，降低繪製次數避免卡頓）
function startGameLoop() {
    setInterval(() => {
        let isSpeeding = playerData.speedBuffUntil && playerData.speedBuffUntil > Date.now();
        document.getElementById('speed-buff-tag').style.display = isSpeeding ? 'inline-block' : 'none';

        if (playerData.activeTask) {
            let task = playerData.activeTask;
            let speedMultiplier = isSpeeding ? 2 : 1;
            
            task.progress += 0.1 * speedMultiplier;
            let percent = Math.min((task.progress / task.duration) * 100, 100);

            document.getElementById('global-task-name').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${task.displayName} (${percent.toFixed(0)}%)`;
            document.getElementById('global-progress-bar').style.width = percent + "%";
            document.getElementById('stop-task-btn').style.display = "inline-flex";

            if (task.progress >= task.duration) {
                let ind = GAME_INDUSTRIES.find(i => i.id === task.indId);
                if (ind) {
                    if (ind.out === '現金') {
                        let gain = ind.income;
                        playerData.cash += gain;
                    } else {
                        let qty = 1;
                        playerData.inventory[ind.out] = (playerData.inventory[ind.out] || 0) + qty;
                    }
                }
                task.progress = 0;
                savePlayerData();
                updateUI(); // 生產完成獲得收益時，主動更新介面
            }
        } else {
            document.getElementById('global-task-name').innerHTML = "💤 工廠閒置中";
            document.getElementById('global-progress-bar').style.width = "0%";
            document.getElementById('stop-task-btn').style.display = "none";
        }
        // 注意：原先造成高頻重繪的 updateUI() 已經從此處迴圈中移除
    }, 100);
}

// UI 渲染（修復：採用比對機制，有實際變更才修改 DOM）
function updateUI() {
    document.getElementById('cash').innerText = '$' + Math.round(playerData.cash).toLocaleString();
    let ownedCount = Object.keys(playerData.ownedIndustries || {}).length;
    document.getElementById('owned-industries-count').innerText = `${ownedCount} / ${GAME_INDUSTRIES.length}`;

    let detailHtml = "";
    Object.keys(playerData.inventory).forEach(itemKey => {
        let count = playerData.inventory[itemKey] || 0;
        if (count > 0) {
            detailHtml += `<div><b>${itemKey}:</b> ${count}</div>`;
        }
    });

    let container = document.getElementById('inventory-detail-list');
    let finalHtml = detailHtml || "<div>倉庫目前空空如也</div>";
    
    // 比對 HTML 是否發生變化，以減少不必要的頁面 Layout 重新計算
    if (container.innerHTML !== finalHtml) {
        container.innerHTML = finalHtml;
    }
}

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

function useGameItem(itemKey) {
    if ((playerData.items[itemKey] || 0) <= 0) return showToast("❌ 道具數量不足！");
    playerData.items[itemKey]--;

    if (itemKey === 'item_box') {
        const pool = ['card_double', 'card_nodrain', 'card_extra', 'potion_speed'];
        let picked = pool[Math.floor(Math.random() * pool.length)];
        playerData.items[picked] = (playerData.items[picked] || 0) + 1;
        showToast(`🎁 開啟幸運盲盒，獲得【${GAME_ITEMS[picked].name}】！`);
    } else if (itemKey === 'potion_speed') {
        playerData.speedBuffUntil = Date.now() + 15 * 60 * 1000;
        showToast("⚡ 使用加速藥水！15分鐘生產速度翻倍！");
    }

    savePlayerData();
    renderItemsTab();
    updateUI();
}

function processOfflineEarnings() {
    let now = Date.now();
    if (playerData.lastTimestamp && playerData.activeTask) {
        let offlineMs = Math.min(now - playerData.lastTimestamp, 10 * 3600 * 1000);
        let ind = GAME_INDUSTRIES.find(i => i.id === playerData.activeTask.indId);
        if (ind && offlineMs > 10000) {
            let cycles = Math.floor(offlineMs / (playerData.activeTask.duration * 1000));
            if (cycles > 0) {
                if (ind.out === '現金') playerData.cash += ind.income * cycles;
                else playerData.inventory[ind.out] = (playerData.inventory[ind.out] || 0) + cycles;
                showToast(`🌙 離線收益：自動營運完成 ${cycles} 次週期！`);
            }
        }
    }
    playerData.lastTimestamp = now;
    savePlayerData();
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    document.getElementById('auth-title').innerHTML = isSignUpMode ? '<i class="fa-solid fa-user-plus"></i> 註冊新企業帳號' : '<i class="fa-solid fa-lock"></i> 企業帳號登入';
    document.getElementById('auth-btn').innerHTML = isSignUpMode ? '<i class="fa-solid fa-user-check"></i> 註冊' : '<i class="fa-solid fa-right-to-bracket"></i> 登入';
    document.getElementById('toggle-btn').innerHTML = isSignUpMode ? '<i class="fa-solid fa-right-to-bracket"></i> 切換至：登入帳號' : '<i class="fa-solid fa-user-plus"></i> 切換至：註冊新帳號';
    document.getElementById('company-name-box').style.display = isSignUpMode ? "block" : "none";
}

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
                ownedIndustries: {},
                isAdmin: (email === ADMIN_EMAIL)
            };
            db.ref('users/' + cred.user.uid).set(initData);
            showToast("🎉 註冊成功！歡迎進入遊戲。");
        }).catch(err => showToast("❌ 註冊失敗: " + err.message));
    } else {
        auth.signInWithEmailAndPassword(email, pass).catch(err => showToast("❌ 登入失敗: " + err.message));
    }
}

function logout() { auth.signOut().then(() => location.reload()); }

function savePlayerData() { 
    if (currentUser) {
        playerData.lastTimestamp = Date.now();
        db.ref('users/' + currentUser.uid).set(playerData); 
    }
}

function renderIndustryTree() {
    const container = document.getElementById('industry-tree-table-body');
    if (!container) return;
    container.innerHTML = GAME_INDUSTRIES.map(item => `
        <tr>
            <td style="color:#007bff;">${CATEGORIES[item.cat]}</td>
            <td style="font-weight:bold;">${item.name}</td>
            <td><span class="tier-badge tier-${item.tier}">Tier ${item.tier}</span></td>
            <td style="color:#28a745;">$${item.cost.toLocaleString()}</td>
            <td style="color:#ffc107;">$${item.income}</td>
            <td>${item.in}</td>
            <td>${item.out}</td>
        </tr>
    `).join('');
}

function renderMarketSelects() {
    let options = "";
    GAME_INDUSTRIES.forEach(ind => {
        if (ind.out !== '現金') {
            options += `<option value="${ind.out}">${ind.name} - [${ind.out}]</option>`;
        }
    });

    document.getElementById('sell-item').innerHTML = options;
    document.getElementById('npc-sell-item').innerHTML = options;
}

function getDynamicUnitPrice(itemKey) {
    let ind = GAME_INDUSTRIES.find(i => i.out === itemKey);
    let baseP = ind ? ind.income : 100;
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
    let unitPrice = Math.round(priceInfo.dynamicP * 0.95);
    document.getElementById('npc-est-payout').innerText = '$' + Math.round(unitPrice * qty).toLocaleString();
}

function confirmNpcSell() {
    let val = document.getElementById('npc-sell-item').value;
    let qty = Math.round(parseFloat(document.getElementById('npc-sell-qty').value) || 0);

    if (qty <= 0) return showToast("⚠️ 請輸入有效數量！");
    if ((playerData.inventory[val] || 0) < qty) return showToast("❌ 倉庫庫存不足！");

    let priceInfo = getDynamicUnitPrice(val);
    let unitPrice = Math.round(priceInfo.dynamicP * 0.95);
    let total = Math.round(unitPrice * qty);

    playerData.inventory[val] -= qty;
    playerData.cash += total;
    savePlayerData();
    updateNpcEstimate();
    updateUI();
    showToast(`💵 出售給政府，獲得 $${total.toLocaleString()}！`);
}

function postGlobalOrder() {
    let itemKey = document.getElementById('sell-item').value;
    let qty = Math.round(parseFloat(document.getElementById('sell-qty').value) || 0);
    let price = Math.round(parseFloat(document.getElementById('sell-price').value) || 0);

    let priceInfo = getDynamicUnitPrice(itemKey);
    if (price < priceInfo.baseP) return showToast(`⚠️ 單價不得低於底價 $${priceInfo.baseP}！`);
    if (qty <= 0 || (playerData.inventory[itemKey] || 0) < qty) return showToast("❌ 數量不正確或庫存不足！");

    playerData.inventory[itemKey] -= qty;
    savePlayerData();
    updateUI();

    db.ref('market').push({
        sellerUid: currentUser.uid,
        sellerName: playerData.companyName || "企業",
        itemKey: itemKey,
        qty: qty,
        price: price,
        timestamp: Date.now()
    });
    showToast("📢 上架交易成功！");
}

function listenToGlobalMarket() {
    db.ref('market').on('value', snapshot => {
        let tbody = document.getElementById('global-market-list');
        tbody.innerHTML = '';
        let data = snapshot.val();
        if (!data) {
            tbody.innerHTML = '<tr><td colspan="5">目前無上架賣單</td></tr>';
            return;
        }

        Object.keys(data).forEach(key => {
            let ord = data[key];
            let isMine = ord.sellerUid === currentUser.uid;

            tbody.innerHTML += `
                <tr>
                    <td><b>${ord.sellerName}</b> ${isMine ? '(我)' : ''}</td>
                    <td>${ord.itemKey}</td>
                    <td>${ord.qty}</td>
                    <td>$${ord.price}</td>
                    <td>
                        ${isMine ? '<span style="color:#aaa;">我的賣單</span>' : `<button class="btn btn-success" onclick="buyOrder('${key}', '${ord.itemKey}',${ord.qty}, ${ord.price}, '${ord.sellerUid}')">購買</button>`}
                    </td>
                </tr>
            `;
        });
    });
}

function buyOrder(orderId, itemKey, qty, price, sellerUid) {
    let total = qty * price;
    if (playerData.cash < total) return showToast("❌ 現金不足！");

    db.ref('market/' + orderId).remove().then(() => {
        playerData.cash -= total;
        playerData.inventory[itemKey] = (playerData.inventory[itemKey] || 0) + qty;
        savePlayerData();
        updateUI();
        db.ref('users/' + sellerUid + '/cash').transaction(c => (c || 0) + total);
        showToast("🛒 購買成功！");
    });
}

function listenToPriceMultipliers() {
    db.ref('priceMultipliers').on('value', snap => {
        priceMultipliers = snap.val() || {};
        updateMarketPriceDisplay();
    });
}

// 管理員邏輯
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
            tbody.innerHTML += `
                <tr>
                    <td><b style="color:var(--purple);">${code}</b></td>
                    <td>${c.type} (${c.val})</td>
                    <td>${c.used || 0} / ${c.limit || 1}</td>
                    <td><button class="btn btn-danger" style="padding:2px 5px; font-size:0.75em;" onclick="adminDeleteCode('${code}')">刪除</button></td>
                </tr>
            `;
        });
    });
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
            tbody.innerHTML += `
                <tr>
                    <td style="font-size:0.75em;">${uid.substring(0, 8)}...</td>
                    <td><b>${u.companyName || '無名氏'}</b></td>
                    <td>${u.banned ? '已封鎖' : '正常'}</td>
                    <td>$${Math.round(u.cash || 0).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger" style="padding:2px 6px; font-size:0.75em;" onclick="adminToggleBan('${uid}', ${!!u.banned})">
                            ${u.banned ? '解封' : 'Ban'}
                        </button>
                    </td>
                </tr>
            `;
            select.innerHTML += `<option value="${uid}">${u.companyName || '無名氏'}</option>`;
        });
    });
}

function adminCreateCode() {
    let code = document.getElementById('new-code-name').value.trim();
    let type = document.getElementById('new-code-type').value;
    let val = Math.round(parseFloat(document.getElementById('new-code-val').value) || 0);
    let limit = Math.round(parseFloat(document.getElementById('new-code-limit').value) || 1);

    if (!code) return showToast("⚠️ 請輸入兌換碼！");

    db.ref('codes/' + code).set({ type, val, limit, used: 0, created: Date.now() }).then(() => {
        showToast("🎉 成功發布兌換碼！");
        loadAdminCodesOnce();
    });
}

function adminDeleteCode(code) {
    db.ref('codes/' + code).remove().then(() => loadAdminCodesOnce());
}

function adminToggleBan(uid, isBanned) {
    db.ref('users/' + uid + '/banned').set(!isBanned).then(() => loadAdminUsersOnce());
}

function adminGiveItem() {
    let targetUid = document.getElementById('admin-target-user').value;
    let itemKey = document.getElementById('admin-give-item').value;
    let qty = Math.round(parseFloat(document.getElementById('admin-give-qty').value) || 0);

    if (!targetUid || qty <= 0) return showToast("⚠️ 請輸入有效目標與數量！");

    if (itemKey === "CASH") {
        db.ref('users/' + targetUid + '/cash').transaction(c => (c || 0) + qty);
    } else {
        db.ref('users/' + targetUid + '/inventory/' + itemKey).transaction(q => (q || 0) + qty);
    }
    showToast("🎁 發放成功！");
}

function adminSendMessage() {
    let targetUid = document.getElementById('admin-target-user').value;
    let msg = document.getElementById('admin-msg-text').value.trim();
    if (!targetUid || !msg) return showToast("⚠️ 請輸入內容！");

    db.ref('users/' + targetUid + '/message').set(msg).then(() => showToast("✉️ 訊息已發送！"));
}
