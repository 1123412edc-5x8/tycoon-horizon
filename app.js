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
