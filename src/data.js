// 不分語言的資料（連結、圖片、程式語言）放在這裡；
// 各語言的文字放在 src/i18n/en.js、zh-Hant.js、zh-Hans.js
const GH = "https://github.com/chalie32";

export const profile = {
  name: "SongYu (Charlie) Wang",
  shortName: "Charlie Wang",
  initials: "SW",
  email: "charlie32017@gmail.com",
  linkedin: "https://www.linkedin.com/in/song-yu-wang-02ab94311",
  github: GH,
  gpa: "3.88",
};

const pcbs = [
  { id: "main", mcu: "Teensy 4.1", image: "images/pcb-main.png", schematic: "docs/schematic-main.pdf" },
  { id: "redundant", mcu: "Teensy 4.0", image: "images/pcb-redundant.png", schematic: "docs/schematic-redundant.pdf" },
];

const projectLinks = {
  rocket: [{ label: "Main-Rocket", url: `${GH}/Main-Rocket` }, { label: "Rocket_redunt", url: `${GH}/Rocket_redunt` }],
  gcs: [{ label: "Ground_System", url: `${GH}/Ground_System` }],
  adder: [{ label: "Binary-Adder-Subtractor", url: `${GH}/Binary-Adder-Subtractor` }],
};

const repos = [
  { name: "Main-Rocket", lang: "C++" },
  { name: "Rocket_redunt", lang: "C++" },
  { name: "Ground_System", lang: "Processing" },
  { name: "Binary-Adder-Subtractor", lang: "C" },
];

// 把共用資料和某個語言的文字合併
export function buildContent(text) {
  const projects = Object.fromEntries(
    Object.entries(text.projects).map(([id, p]) => [id, { id, links: projectLinks[id], ...p }])
  );
  return {
    profile: { ...profile, ...text.profile },
    education: { ...text.education, gpa: profile.gpa },
    skills: text.skills,
    pcbs: pcbs.map((b) => ({ ...b, ...text.pcbs[b.id] })),
    projects,
    experience: text.experience,
    repos: repos.map((r) => ({ ...r, desc: text.repos[r.name] })),
  };
}
