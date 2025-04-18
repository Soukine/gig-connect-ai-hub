
export type Skill = {
  id: string;
  name: string;
};

export type CategorySkills = {
  [key: string]: Skill[];
};

export const categorySkills: CategorySkills = {
  dev: [
    { id: "html", name: "HTML/CSS" },
    { id: "js", name: "JavaScript" },
    { id: "react", name: "React" },
    { id: "vue", name: "Vue.js" },
    { id: "node", name: "Node.js" },
    { id: "python", name: "Python" },
  ],
  design: [
    { id: "ui", name: "UI Design" },
    { id: "ux", name: "UX Design" },
    { id: "figma", name: "Figma" },
    { id: "photoshop", name: "Photoshop" },
    { id: "illustrator", name: "Illustrator" },
  ],
  marketing: [
    { id: "seo", name: "SEO" },
    { id: "social", name: "Social Media" },
    { id: "ads", name: "Google Ads" },
    { id: "analytics", name: "Analytics" },
    { id: "content", name: "Content Marketing" },
  ],
  writing: [
    { id: "copywriting", name: "Copywriting" },
    { id: "blog", name: "Blog Writing" },
    { id: "translation", name: "Translation" },
    { id: "editing", name: "Editing" },
  ],
  video: [
    { id: "editing", name: "Video Editing" },
    { id: "animation", name: "Animation 2D/3D" },
    { id: "motion", name: "Motion Design" },
    { id: "filming", name: "Filming" },
  ],
  audio: [
    { id: "mixing", name: "Audio Mixing" },
    { id: "recording", name: "Recording" },
    { id: "production", name: "Music Production" },
    { id: "voice", name: "Voice Over" },
  ],
  business: [
    { id: "strategy", name: "Business Strategy" },
    { id: "consulting", name: "Consulting" },
    { id: "finance", name: "Finance" },
    { id: "legal", name: "Legal" },
  ],
  data: [
    { id: "analysis", name: "Data Analysis" },
    { id: "visualization", name: "Data Visualization" },
    { id: "ml", name: "Machine Learning" },
    { id: "bi", name: "Business Intelligence" },
  ],
};
