// 繁體中文
export default {
  meta: { htmlLang: "zh-Hant", title: "SongYu (Charlie) Wang · 亞利桑那州立大學資工系" },
  ui: {
    nav: { about: "關於我", projects: "專案", experience: "經歷", contact: "聯絡", menu: "選單", language: "語言" },
    hero: { hi: (name) => `嗨，我是 ${name}。`, viewProjects: "看看我的專案", email: "寄信給我" },
    tiles: {
      gpa: "GPA", education: "學歷", status: "目前狀態", open: "正在找實習", focus: "軟體 · 嵌入式系統",
      connect: "聯繫我", pcbs: "自製電路板", pcbsSub: "從設計到實作", telemetry: "遙測", telemetrySub: "即時感測器通道",
      toolbox: "技能", leadership: "領導經歷", openSource: "開源", onGithub: "我的 GitHub",
      contact: "聯絡", contactTitle: "一起做點什麼吧。", contactText: "我正在尋找軟體或嵌入式系統相關的實習機會。",
      details: "詳細內容",
    },
    labels: { rocket: "精選 · 硬體", gcs: "資料視覺化", adder: "底層 · C 語言", food: "iOS App", java: "團隊專案" },
    fsm: {
      eyebrow: "飛行軟體 · C++", title: "自動偵測最高點",
      blurb: "飛行電腦會自己判斷什麼時候開傘。點任一個飛行階段，看看韌體裡實際使用的判斷條件。",
      inState: "這個階段", exitWhen: "切換條件", final: "— 最終階段", relay: "⚡ 繼電器觸發",
      chips: ["7 狀態四元數 EKF", "10 Hz 遙測", "LoRa 915 MHz · SF7", "約 5,000 行程式碼"],
      states: {
        GROUND: { rule: "在發射台上待命", next: "加速度 > 2 g 且高度 > 10 m" },
        BOOST: { rule: "引擎燃燒中（至少 500 ms）", next: "|垂直加速度| < 0.2 g" },
        COAST: { rule: "持續追蹤最大高度", next: "高度 > 20 m、速度 < −1 m/s、比最高點低 2 m，且持續 200 ms" },
        APOGEE: { rule: "觸發回收繼電器（開傘）", next: "比最高點低 4 m" },
        DESCENT: { rule: "降落傘下降中", next: null },
      },
    },
    pcb: { schematic: "查看電路圖（PDF）↗", enlarge: "放大 PCB 佈線圖", close: "點任意處關閉" },
    telemetry: { live: "即時 · 模擬資料" },
    food: { caption: "用網頁重現的 SwiftUI App，可以試試分類篩選、＋ 和 ×" },
    adder: { error: "請輸入兩個 32 位元整數（−2,147,483,648 到 2,147,483,647）。", overflow: "⚠ 發生溢位", toggle: "切換加減法" },
    footer: (name, y) => `© ${y} ${name}`,
  },
  content: {
    profile: {
      tagline: "我寫能和硬體對話的軟體。",
      summary:
        "亞利桑那州立大學資訊工程系學生，有 Java、SwiftUI、桌面應用程式和嵌入式系統的實作經驗。我喜歡做 GUI、除錯，以及軟硬體整合，從火箭飛行電腦到 iOS App 都做過。目前正在尋找實習機會。",
    },
    education: { degree: "資訊工程學士", school: "亞利桑那州立大學（ASU）", place: "美國亞利桑那州 Tempe", date: "預計 2028 年 5 月畢業" },
    skills: [
      { group: "程式語言", items: ["Java", "C++", "C", "Python", "Swift", "SQL"] },
      { group: "框架與工具", items: ["JavaFX", "SwiftUI", "Processing", "Git", "EasyEDA", "PlatformIO"] },
      { group: "概念與硬體", items: ["物件導向", "GUI 開發", "除錯", "資料結構", "卡爾曼濾波", "I2C", "SPI", "UART", "Teensy"] },
    ],
    pcbs: {
      main: {
        name: "主飛行電腦",
        parts: ["MPU6050 慣性感測器（I2C）", "BMP280 氣壓計（I2C）", "XTSD 快閃記憶體 / SD 卡記錄（SPI）", "SG90 伺服馬達 + 蜂鳴器", "TPS565201 降壓轉換器 → 5 V", "點火通道（JY2302 MOSFET）+ 電壓偵測"],
      },
      redundant: {
        name: "備援飛行電腦",
        parts: ["RFM95W LoRa 900 MHz 無線電（SPI）", "NEO-6M GPS（UART）", "MPU6050 慣性感測器 + BMP280 氣壓計（I2C）", "LMR33630 降壓轉換器，附電源正常指示燈", "自恢復保險絲 + TVS 突波保護", "點火通道 + 電池電壓偵測"],
      },
    },
    projects: {
      rocket: {
        title: "火箭飛行電腦與自製 PCB", date: "2025 春季",
        blurb: "兩塊自己設計的航電板，從電路圖、佈線到韌體一手包辦，在 Teensy 上整合慣性感測器、氣壓計、GPS 和 LoRa。",
        tags: ["C++", "PlatformIO", "Teensy", "EasyEDA", "卡爾曼濾波", "LoRa"],
        bullets: [
          "為火箭航電設計 2 塊客製 PCB，負責電路圖設計、PCB 佈線和韌體開發。",
          "透過 I2C、SPI 和 UART，把慣性感測器、氣壓計、GPS、LoRa 和電壓感測器整合進以 Teensy 為核心的系統。",
          "用 PlatformIO 撰寫模組化的 C++ 韌體，內含 5 階段自動飛行狀態機，能偵測最高點並觸發回收繼電器。",
          "以四元數擴展卡爾曼濾波（7 個狀態，含陀螺儀偏差估計）做感測器融合，另外用一維卡爾曼濾波處理高度和加速度。",
          "透過 915 MHz LoRa（SF7、125 kHz、17 dBm）傳送 10 Hz 遙測資料，附校驗碼和裝置 ID，可同時支援多枚火箭。",
          "與 4 人航電團隊合作，依照測試回饋除錯軟硬體，並透過地面測試驗證系統功能。",
        ],
      },
      gcs: {
        title: "地面控制系統", date: "2025 春季",
        blurb: "任務控制中心風格的儀表板（v3.0），把火箭傳回的原始遙測資料變成 9 張即時圖表和一枚用四元數驅動的 3D 火箭。",
        tags: ["Processing", "Java", "遙測", "資料視覺化"],
        bullets: [
          "用 Processing 打造任務控制儀表板：3×3 排列的 9 張即時圖表，處理 13 個遙測通道（IMU、高度、垂直速度、GPS、雙電池電壓、溫度）。",
          "依四元數資料即時顯示 3D 火箭姿態，並有用顏色標示狀態的原始資料面板。",
          "以 115200 baud 序列埠通訊，斷線會自動重連；也有模擬資料模式，沒有硬體也能測試。",
          "從 v1.0 迭代到 v3.0：改成模組化的物件導向架構，加上背景快取和動態座標軸縮放，目標 60 FPS。",
        ],
      },
      food: {
        title: "效期追蹤 App", date: "2024 秋季",
        blurb: "用 SwiftUI 開發的 App，依分類追蹤物品的有效期限，快過期前會用本地通知提醒你。",
        tags: ["Swift", "SwiftUI", "iOS", "本地通知"],
        bullets: [
          "以 SwiftUI 開發的效期追蹤 App，有 7 項核心功能：新增／讀取／修改／刪除、排序、分類、效期追蹤和通知。",
          "3 個互動畫面，資料存在本機，並在物品過期前用 iOS 通知提醒使用者。",
          "手動測試資料保存、紀錄管理和效期相關功能。",
        ],
      },
      java: {
        title: "Java GUI 團隊專案", date: "2026 秋季",
        blurb: "5 人團隊開發的 JavaFX 桌面應用程式，有登入驗證、權限控管和搜尋。我負責從頭到尾完成刪除使用者的流程。",
        tags: ["Java", "JavaFX", "SQL", "團隊合作"],
        bullets: [
          "5 人團隊開發 Java 桌面應用程式，包含 6 項核心功能：使用者管理、身分驗證、權限控管、搜尋和 Email 驗證。",
          "獨立完成刪除使用者的流程，包括 GUI、應用程式邏輯和 SQL 資料庫操作。",
          "每項功能用 2–3 個手動功能測試案例驗證。",
        ],
      },
      adder: {
        title: "32 位元二進位加減法器", date: "2023 秋季",
        blurb: "用 C 語言把 32 個位元運算全加器串成漣波進位加法器，用二補數做減法，並能偵測溢位。",
        tags: ["C", "位元運算", "計算機結構"],
        bullets: [
          "用 XOR／AND／OR 實作全加器，再把 32 個串成漣波進位加法器。",
          "同一個電路也能做減法：把 Y 取反並設定進位輸入（模式位元 M）。",
          "從最後兩個進位判斷有號數溢位，並把每個運算元以分組的二進位印出。",
        ],
      },
    },
    experience: [
      {
        role: "航電組組長", org: "JRI 火箭社（台灣）", date: "2024 年 7 月 – 2025 年 7 月",
        bullets: [
          "帶領 4 人航電團隊：分配工作、主持每週進度會議，並指導組員解決技術問題。",
          "與結構組協調，訂出符合火箭航電艙的 PCB 尺寸限制。",
          "撰寫工程報告，內容涵蓋系統運作、安全風險和測試流程。",
        ],
      },
    ],
    repos: {
      "Main-Rocket": "Teensy 4.1 航電：MPU6050 + BMP280，卡爾曼濾波感測器融合",
      Rocket_redunt: "飛行電腦：階段偵測、最高點開傘、LoRa 遙測、GPS",
      Ground_System: "地面控制系統 v3.0：9 張即時圖表 + 3D 火箭",
      "Binary-Adder-Subtractor": "32 位元漣波進位加減法器，含溢位偵測",
    },
  },
};
