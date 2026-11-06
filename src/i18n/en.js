// English
export default {
  meta: { htmlLang: "en", title: "SongYu (Charlie) Wang · CS @ ASU" },
  ui: {
    nav: { about: "About", projects: "Projects", experience: "Experience", contact: "Contact", menu: "Menu", language: "Language" },
    hero: { hi: (name) => `Hi, I'm ${name}.`, viewProjects: "View projects", email: "Email me" },
    tiles: {
      gpa: "GPA", education: "Education", status: "Status", open: "Open to internships", focus: "Software · Embedded systems",
      connect: "Connect", pcbs: "Custom PCBs", pcbsSub: "designed & built", telemetry: "Telemetry", telemetrySub: "live sensor channels",
      toolbox: "Toolbox", leadership: "Leadership", openSource: "Open source", onGithub: "On GitHub",
      contact: "Contact", contactTitle: "Let's build something.", contactText: "I'm looking for software or embedded-systems internships.",
      details: "Details",
    },
    labels: { rocket: "Featured · Hardware", gcs: "Data visualization", adder: "Low-level · C", food: "iOS app", java: "Team project" },
    fsm: {
      eyebrow: "Flight software · C++", title: "Autonomous apogee detection",
      blurb: "The flight computer decides on its own when to deploy the parachute. Tap a phase to see the exact thresholds from the firmware.",
      inState: "In this state", exitWhen: "Exit when", final: "— final state", relay: "⚡ relay HIGH",
      chips: ["7-state quaternion EKF", "10 Hz telemetry", "LoRa 915 MHz · SF7", "~5,000 lines"],
      states: {
        GROUND: { rule: "Wait on the pad", next: "accel > 2 g AND altitude > 10 m" },
        BOOST: { rule: "Motor burning (≥ 500 ms)", next: "|vertical accel| < 0.2 g" },
        COAST: { rule: "Track max altitude", next: "alt > 20 m, v < −1 m/s, 2 m below max, held 200 ms" },
        APOGEE: { rule: "Fire recovery relay", next: "4 m below max altitude" },
        DESCENT: { rule: "Under parachute", next: null },
      },
    },
    pcb: { schematic: "View schematic (PDF) ↗", enlarge: "Enlarge PCB layout", close: "Click anywhere to close" },
    telemetry: { live: "LIVE · simulated" },
    food: { caption: "Interactive web recreation of the SwiftUI app — try the filters, ＋ and ×" },
    adder: { error: "Enter two 32-bit integers (−2,147,483,648 to 2,147,483,647).", overflow: "⚠ Overflow detected", toggle: "Toggle operator" },
    footer: (name, y) => `© ${y} ${name}`,
  },
  content: {
    profile: {
      tagline: "I build software that talks to hardware.",
      summary:
        "Computer Science student at Arizona State University with hands-on experience in Java, SwiftUI, desktop applications, and embedded systems. I enjoy GUI development, debugging, and hardware–software integration — from rocket flight computers to iOS apps. Currently seeking internship opportunities.",
    },
    education: { degree: "B.S. Computer Science", school: "Arizona State University", place: "Tempe, AZ", date: "Expected May 2028" },
    skills: [
      { group: "Languages", items: ["Java", "C++", "C", "Python", "Swift", "SQL"] },
      { group: "Frameworks & Tools", items: ["JavaFX", "SwiftUI", "Processing", "Git", "EasyEDA", "PlatformIO"] },
      { group: "Concepts & Hardware", items: ["OOP", "GUI Development", "Debugging", "Data Structures", "Kalman Filters", "I2C", "SPI", "UART", "Teensy"] },
    ],
    pcbs: {
      main: {
        name: "Main Flight Computer",
        parts: ["MPU6050 IMU (I2C)", "BMP280 barometer (I2C)", "XTSD flash / SD logging (SPI)", "SG90 servo + buzzer", "TPS565201 buck converter → 5 V", "Pyro channel (JY2302 MOSFET) + voltage sense"],
      },
      redundant: {
        name: "Redundant Flight Computer",
        parts: ["RFM95W LoRa 900 MHz radio (SPI)", "NEO-6M GPS (UART)", "MPU6050 IMU + BMP280 barometer (I2C)", "LMR33630 buck converter w/ power-good LED", "Resettable fuse + TVS protection", "Pyro channel + battery voltage sense"],
      },
    },
    projects: {
      rocket: {
        title: "Rocket Flight Computer & Custom PCB", date: "Spring 2025",
        blurb: "Two custom avionics boards — schematic, layout, and firmware — fusing IMU, barometer, GPS, and LoRa on Teensy.",
        tags: ["C++", "PlatformIO", "Teensy", "EasyEDA", "Kalman filter", "LoRa"],
        bullets: [
          "Designed 2 custom PCBs for rocket avionics — schematic design, PCB layout, and firmware development.",
          "Integrated IMU, barometer, GPS, LoRa, and voltage sensors into a Teensy-based system over I2C, SPI, and UART.",
          "Wrote modular C++ firmware (PlatformIO) with an autonomous 5-phase flight state machine that detects apogee and fires the recovery relay.",
          "Fused sensors with a quaternion Extended Kalman Filter (7 states incl. gyro bias) plus 1-D Kalman filters for altitude and acceleration.",
          "Streamed 10 Hz telemetry over 915 MHz LoRa (SF7, 125 kHz, 17 dBm) with checksums and device IDs for multi-rocket support.",
          "Worked with a 4-member avionics team, using test feedback to debug hardware and firmware and verify the system through ground testing.",
        ],
      },
      gcs: {
        title: "Ground Control System", date: "Spring 2025",
        blurb: "Mission-control dashboard (v3.0) that turns raw rocket telemetry into 9 live graphs and a quaternion-driven 3D rocket.",
        tags: ["Processing", "Java", "Telemetry", "Data viz"],
        bullets: [
          "Built a Processing-based mission-control dashboard: 9 live graphs in a 3×3 grid processing 13 telemetry channels (IMU, altitude, vertical speed, GPS, dual battery voltage, temperature).",
          "3D rocket orientation rendered from quaternion data, plus a raw-data panel with color-coded status indicators.",
          "Serial link at 115200 baud with auto-reconnect, and a mock-data mode for testing without hardware.",
          "Iterated from v1.0 to v3.0: modular OOP architecture, background caching and dynamic axis scaling for a 60 FPS target.",
        ],
      },
      food: {
        title: "Food Recorder (效期追蹤)", date: "Fall 2024",
        blurb: "SwiftUI app that tracks expiration dates by category and nudges you with local notifications before things go bad.",
        tags: ["Swift", "SwiftUI", "iOS", "Local notifications"],
        bullets: [
          "SwiftUI expiration-tracking app with 7 core features: CRUD, sorting, categories, expiry tracking, and notifications.",
          "3 interactive screens with local persistence and iOS notifications that remind users before items expire.",
          "Manually tested persistence, record management, and expiration features across the app.",
        ],
      },
      java: {
        title: "Java GUI Team Project", date: "Fall 2026",
        blurb: "5-person JavaFX desktop app with auth, access control, and search. I built the user-deletion workflow end to end.",
        tags: ["Java", "JavaFX", "SQL", "Teamwork"],
        bullets: [
          "5-person team building a Java desktop app with 6 core features: user management, authentication, access control, search, and email validation.",
          "Independently implemented the user-deletion workflow — GUI, application logic, and SQL database operations.",
          "Validated each feature with 2–3 manual functional test cases.",
        ],
      },
      adder: {
        title: "32-bit Binary Adder–Subtractor", date: "Fall 2023",
        blurb: "A ripple-carry adder built from 32 bitwise full adders in C — subtraction via two's complement, with overflow detection.",
        tags: ["C", "Bitwise ops", "Computer architecture"],
        bullets: [
          "Implemented a full adder with XOR/AND/OR and chained 32 of them into a ripple-carry adder.",
          "Reused the same circuit for subtraction by inverting Y and setting carry-in (mode bit M).",
          "Detected signed overflow from the last two carries and printed each operand in grouped binary.",
        ],
      },
    },
    experience: [
      {
        role: "Avionics Team Lead", org: "JRI Rocket Club, Taiwan", date: "Jul 2024 – Jul 2025",
        bullets: [
          "Led a 4-member avionics team: assigned tasks, ran weekly progress meetings, and mentored members on technical challenges.",
          "Coordinated with the structures team to define PCB size constraints for the rocket's avionics bay.",
          "Wrote engineering reports covering system operation, safety risks, and testing procedures.",
        ],
      },
    ],
    repos: {
      "Main-Rocket": "Teensy 4.1 avionics — MPU6050 + BMP280 with Kalman sensor fusion",
      Rocket_redunt: "Flight computer: phase detection, apogee deploy, LoRa telemetry, GPS",
      Ground_System: "Ground Control System v3.0 — 9 live graphs + 3D rocket",
      "Binary-Adder-Subtractor": "32-bit ripple-carry adder/subtractor with overflow detection",
    },
  },
};
