// 简体中文
export default {
  meta: { htmlLang: "zh-Hans", title: "SongYu (Charlie) Wang · 亚利桑那州立大学计算机系" },
  ui: {
    nav: { about: "关于我", projects: "项目", experience: "经历", contact: "联系", menu: "菜单", language: "语言" },
    hero: { hi: (name) => `你好，我是 ${name}。`, viewProjects: "查看我的项目", email: "给我发邮件" },
    tiles: {
      gpa: "GPA", education: "教育背景", status: "当前状态", open: "正在找实习", focus: "软件 · 嵌入式系统",
      connect: "联系我", pcbs: "自制电路板", pcbsSub: "从设计到实现", telemetry: "遥测", telemetrySub: "实时传感器通道",
      toolbox: "技能", leadership: "领导经历", openSource: "开源", onGithub: "我的 GitHub",
      contact: "联系", contactTitle: "一起做点什么吧。", contactText: "我正在寻找软件或嵌入式系统方向的实习机会。",
      details: "详细内容",
    },
    labels: { rocket: "精选 · 硬件", gcs: "数据可视化", adder: "底层 · C 语言", food: "iOS 应用", java: "团队项目" },
    fsm: {
      eyebrow: "飞行软件 · C++", title: "自动检测最高点",
      blurb: "飞行计算机会自己判断什么时候开伞。点击任一飞行阶段，查看固件里实际使用的判断条件。",
      inState: "当前阶段", exitWhen: "切换条件", final: "— 最终阶段", relay: "⚡ 继电器触发",
      chips: ["7 状态四元数 EKF", "10 Hz 遥测", "LoRa 915 MHz · SF7", "约 5,000 行代码"],
      states: {
        GROUND: { rule: "在发射台上待命", next: "加速度 > 2 g 且高度 > 10 m" },
        BOOST: { rule: "发动机燃烧中（至少 500 ms）", next: "|垂直加速度| < 0.2 g" },
        COAST: { rule: "持续跟踪最大高度", next: "高度 > 20 m、速度 < −1 m/s、比最高点低 2 m，且持续 200 ms" },
        APOGEE: { rule: "触发回收继电器（开伞）", next: "比最高点低 4 m" },
        DESCENT: { rule: "降落伞下降中", next: null },
      },
    },
    pcb: { schematic: "查看原理图（PDF）↗", enlarge: "放大 PCB 布线图", close: "点击任意处关闭" },
    telemetry: { live: "实时 · 模拟数据" },
    food: { caption: "用网页重现的 SwiftUI 应用，可以试试分类筛选、＋ 和 ×" },
    adder: { error: "请输入两个 32 位整数（−2,147,483,648 到 2,147,483,647）。", overflow: "⚠ 发生溢出", toggle: "切换加减法" },
    footer: (name, y) => `© ${y} ${name}`,
  },
  content: {
    profile: {
      tagline: "我写能和硬件对话的软件。",
      summary:
        "亚利桑那州立大学计算机科学专业学生，有 Java、SwiftUI、桌面应用和嵌入式系统的实践经验。我喜欢做 GUI、调试，以及软硬件集成，从火箭飞行计算机到 iOS 应用都做过。目前正在寻找实习机会。",
    },
    education: { degree: "计算机科学学士", school: "亚利桑那州立大学（ASU）", place: "美国亚利桑那州 Tempe", date: "预计 2028 年 5 月毕业" },
    skills: [
      { group: "编程语言", items: ["Java", "C++", "C", "Python", "Swift", "SQL"] },
      { group: "框架与工具", items: ["JavaFX", "SwiftUI", "Processing", "Git", "EasyEDA", "PlatformIO"] },
      { group: "概念与硬件", items: ["面向对象", "GUI 开发", "调试", "数据结构", "卡尔曼滤波", "I2C", "SPI", "UART", "Teensy"] },
    ],
    pcbs: {
      main: {
        name: "主飞行计算机",
        parts: ["MPU6050 惯性传感器（I2C）", "BMP280 气压计（I2C）", "XTSD 闪存 / SD 卡记录（SPI）", "SG90 舵机 + 蜂鸣器", "TPS565201 降压转换器 → 5 V", "点火通道（JY2302 MOSFET）+ 电压检测"],
      },
      redundant: {
        name: "备份飞行计算机",
        parts: ["RFM95W LoRa 900 MHz 无线电（SPI）", "NEO-6M GPS（UART）", "MPU6050 惯性传感器 + BMP280 气压计（I2C）", "LMR33630 降压转换器，带电源正常指示灯", "自恢复保险丝 + TVS 浪涌保护", "点火通道 + 电池电压检测"],
      },
    },
    projects: {
      rocket: {
        title: "火箭飞行计算机与自制 PCB", date: "2025 春季",
        blurb: "两块自己设计的航电板，从原理图、布线到固件全部亲手完成，在 Teensy 上集成惯性传感器、气压计、GPS 和 LoRa。",
        tags: ["C++", "PlatformIO", "Teensy", "EasyEDA", "卡尔曼滤波", "LoRa"],
        bullets: [
          "为火箭航电设计 2 块定制 PCB，负责原理图设计、PCB 布线和固件开发。",
          "通过 I2C、SPI 和 UART，把惯性传感器、气压计、GPS、LoRa 和电压传感器集成到以 Teensy 为核心的系统。",
          "用 PlatformIO 编写模块化的 C++ 固件，内含 5 阶段自动飞行状态机，能检测最高点并触发回收继电器。",
          "采用四元数扩展卡尔曼滤波（7 个状态，含陀螺仪零偏估计）做传感器融合，另外用一维卡尔曼滤波处理高度和加速度。",
          "通过 915 MHz LoRa（SF7、125 kHz、17 dBm）发送 10 Hz 遥测数据，附校验和与设备 ID，可同时支持多枚火箭。",
          "与 4 人航电团队合作，根据测试反馈调试软硬件，并通过地面测试验证系统功能。",
        ],
      },
      gcs: {
        title: "地面控制系统", date: "2025 春季",
        blurb: "任务控制中心风格的仪表盘（v3.0），把火箭传回的原始遥测数据变成 9 张实时图表和一枚由四元数驱动的 3D 火箭。",
        tags: ["Processing", "Java", "遥测", "数据可视化"],
        bullets: [
          "用 Processing 打造任务控制仪表盘：3×3 排列的 9 张实时图表，处理 13 个遥测通道（IMU、高度、垂直速度、GPS、双电池电压、温度）。",
          "根据四元数数据实时显示 3D 火箭姿态，并有用颜色标示状态的原始数据面板。",
          "以 115200 波特率串口通信，断线自动重连；也有模拟数据模式，没有硬件也能测试。",
          "从 v1.0 迭代到 v3.0：改为模块化的面向对象架构，加入背景缓存和动态坐标轴缩放，目标 60 FPS。",
        ],
      },
      food: {
        title: "效期追踪 App", date: "2024 秋季",
        blurb: "用 SwiftUI 开发的应用，按分类追踪物品的保质期，快过期前会用本地通知提醒你。",
        tags: ["Swift", "SwiftUI", "iOS", "本地通知"],
        bullets: [
          "以 SwiftUI 开发的保质期追踪应用，有 7 项核心功能：增删改查、排序、分类、保质期追踪和通知。",
          "3 个交互页面，数据保存在本地，并在物品过期前用 iOS 通知提醒用户。",
          "手动测试数据持久化、记录管理和保质期相关功能。",
        ],
      },
      java: {
        title: "Java GUI 团队项目", date: "2026 秋季",
        blurb: "5 人团队开发的 JavaFX 桌面应用，有登录验证、权限控制和搜索。我负责从头到尾完成删除用户的流程。",
        tags: ["Java", "JavaFX", "SQL", "团队合作"],
        bullets: [
          "5 人团队开发 Java 桌面应用，包含 6 项核心功能：用户管理、身份验证、权限控制、搜索和邮箱验证。",
          "独立完成删除用户的流程，包括 GUI、应用逻辑和 SQL 数据库操作。",
          "每项功能用 2–3 个手动功能测试用例验证。",
        ],
      },
      adder: {
        title: "32 位二进制加减法器", date: "2023 秋季",
        blurb: "用 C 语言把 32 个位运算全加器串成行波进位加法器，用补码做减法，并能检测溢出。",
        tags: ["C", "位运算", "计算机组成"],
        bullets: [
          "用 XOR／AND／OR 实现全加器，再把 32 个串成行波进位加法器。",
          "同一个电路也能做减法：把 Y 取反并设置进位输入（模式位 M）。",
          "根据最后两个进位判断有符号数溢出，并把每个操作数以分组二进制打印出来。",
        ],
      },
    },
    experience: [
      {
        role: "航电组组长", org: "JRI 火箭社（台湾）", date: "2024 年 7 月 – 2025 年 7 月",
        bullets: [
          "带领 4 人航电团队：分配任务、主持每周进度会议，并指导组员解决技术问题。",
          "与结构组协调，确定符合火箭航电舱的 PCB 尺寸限制。",
          "撰写工程报告，内容涵盖系统运行、安全风险和测试流程。",
        ],
      },
    ],
    repos: {
      "Main-Rocket": "Teensy 4.1 航电：MPU6050 + BMP280，卡尔曼滤波传感器融合",
      Rocket_redunt: "飞行计算机：阶段检测、最高点开伞、LoRa 遥测、GPS",
      Ground_System: "地面控制系统 v3.0：9 张实时图表 + 3D 火箭",
      "Binary-Adder-Subtractor": "32 位行波进位加减法器，含溢出检测",
    },
  },
};
