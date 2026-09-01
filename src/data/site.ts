export const site = {
  name: 'Risheekesh KG',
  role: 'AI & Software Engineer',
  location: 'Coimbatore, India',
  tagline:
    'AI and Data Science undergrad building agentic AI systems, computer-vision pipelines, and full-stack web applications.',
  email: 'risheekeshkg@gmail.com',
  phone: '+91 93847 62478',
  availability: 'Open to new opportunities',
  links: {
    github: 'https://github.com/RisheekeshKG',
    linkedin: 'https://www.linkedin.com/in/risheekeshkg/',
    leetcode: 'https://leetcode.com/u/RisheekeshKG/',
  },
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
] as const

export const sectionIds = sections.map((section) => section.id)

export const about = [
  'I am an AI and Data Science undergraduate at PSG iTech, concurrently pursuing a BS in Data Science at IIT Madras. Most of my work sits where machine learning meets a real interface — agent workflows, vision systems, and the applications that make them usable.',
  'Recently I have built an enterprise requirements-management platform driven by LLM agents, a DeepFace recognition pipeline for large event photo sets, and the perception stack for a competition Mars rover.',
]

export type Education = {
  degree: string
  institution: string
  period: string
  detail?: string
}

export const education: Education[] = [
  {
    degree: 'B.Tech, Artificial Intelligence and Data Science',
    institution: 'PSG Institute of Technology and Applied Research',
    period: 'Aug 2023 — Present',
    detail: 'CGPA 8.21',
  },
  {
    degree: 'B.S., Data Science and Applications',
    institution: 'Indian Institute of Technology Madras',
    period: 'Jan 2024 — Present',
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming', items: ['Python', 'C', 'JavaScript'] },
  { group: 'AI Core', items: ['ML & DL', 'Computer Vision', 'GenAI'] },
  {
    group: 'Web Development',
    items: ['React.js', 'Node.js', 'FastAPI', 'Flask'],
  },
  { group: 'Databases', items: ['MongoDB', 'PostgreSQL', 'Supabase'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Azure', 'Vite'] },
]

export type Role = {
  org: string
  title: string
  /** Omitted for ongoing team work with no fixed term. */
  period?: string
  points: string[]
}

export const experience: Role[] = [
  {
    org: 'Payoda Technology Inc.',
    title: 'Requirement Gathering Agent Workflow',
    period: 'Jun 2026 — Jul 2026',
    points: [
      'Built an enterprise requirements-management platform using AI to generate backlog specifications, epics, and user stories automatically, reducing manual documentation effort by 60%.',
      'Created an executive dashboard with 4-level tracking across projects, backlogs, epics, and stories, monitoring budgets, completion rates, and team workload while integrating Jira, Slack, and GitHub for unified visibility.',
    ],
  },
  {
    org: 'Rhodnet AI Private Limited',
    title: 'Face Recognition & Clustering',
    period: 'Aug 2025 — Nov 2025',
    points: [
      'Built a DeepFace recognition system for 2000+ event images, optimizing preprocessing to reduce processing time by 37%.',
      'Enabled CPU and GPU (CUDA) execution and secured client data through input validation and access controls.',
    ],
  },
]

export type Project = {
  title: string
  subtitle: string
  /** Set for team or competition work, shown as a badge on the card. */
  org?: string
  points: string[]
  tags: string[]
  /** The resume links these but omits the URLs — fill in to show a Source link. */
  repo?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: 'Mars Rover',
    org: 'PSG Team Aurora',
    subtitle: 'Perception and scene understanding for a competition rover',
    points: [
      'Trained a custom arrow-detection model on a self-collected, annotated dataset using YOLOv8, achieving 96% accuracy.',
      'Integrated YOLOv8, BLIP, and ArUco markers for scene understanding and robotic decision-making, and enhanced a ROS-based dashboard with live camera, depth visualization, and terminal logs.',
    ],
    tags: ['YOLOv8', 'BLIP', 'ArUco', 'ROS', 'Computer Vision'],
  },
  {
    title: 'VigilAI',
    subtitle: 'Agentic RTL verification platform for Verilog design validation',
    points: [
      'Built an agent-based automation framework for VLSI verification workflows using React (TypeScript), FastAPI, LangGraph, and Google Gemini.',
      'Automated log analysis with trained ML models and a human-in-the-loop feedback pipeline that flags high-risk tests and recommends RTL optimizations.',
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'LangGraph', 'Gemini'],
  },
  {
    title: 'Lyf-O',
    subtitle: 'Productivity application with agent support',
    points: [
      'Built a cross-platform productivity application with Gmail authentication, workspace management, and personalized templates for Kanban boards, habits, journals, and daily workflows.',
      'Developed an AI assistant and recommendation system that creates, updates, and suggests templates from user activity and natural-language commands.',
    ],
    tags: ['Cross-platform', 'AI Agents', 'Productivity'],
  },
  {
    title: 'The Atlas Protocol',
    subtitle: 'Educational AI robotics game',
    points: [
      'Built a guided, non-addictive educational game that teaches young students the purpose and functionality of robot components through interactive gameplay.',
      'Developed component-based progression using Pygame, LangChain, and OpenAI, where collected robot parts unlock AI-generated explanations of their roles.',
    ],
    tags: ['Pygame', 'LangChain', 'OpenAI'],
  },
]

export const research = {
  title: 'Deep Learning Framework for Spatiotemporal Air Quality Forecasting',
  venue: 'IEEE Conference',
  status: 'Under review',
  points: [
    'Developed a lightweight ConvLSTM2D encoder–decoder with episode-aware optimization and skip connections to forecast 16-hour PM2.5 maps from WRF-Chem atmospheric data.',
    'Achieved a 0.946 Pearson correlation, 18.24 µg/m³ RMSE, and 88% AQI classification accuracy with approximately 402K trainable parameters.',
  ],
  metrics: [
    { label: 'Pearson r', value: '0.946' },
    { label: 'RMSE', value: '18.24 µg/m³' },
    { label: 'AQI accuracy', value: '88%' },
    { label: 'Parameters', value: '~402K' },
  ],
}

export const competitions: { title: string; event: string; year: string }[] = [
  { title: 'First Runner-up', event: 'GreatLakesXSAP Hackfest', year: '2026' },
  { title: 'Second place', event: 'Market Minds, Yugam', year: '2024' },
  { title: 'Finalist', event: 'Hack the Future Hackathon', year: '2025' },
  { title: 'Finalist', event: 'SanDisk Hackathon', year: '2026' },
  { title: 'Finalist', event: 'AISE-Hack 1.0', year: '2026' },
  { title: '11th place', event: 'ERC Remote Challenge', year: '2025' },
  {
    title: '24th globally',
    event: 'International Rover Challenge (IRC)',
    year: '2025',
  },
]

export const certifications: { name: string; issuer: string }[] = [
  {
    name: 'Fundamentals of Accelerated Computing with CUDA Python',
    issuer: 'NVIDIA',
  },
  { name: 'Web Development Course', issuer: 'Udemy' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
]

