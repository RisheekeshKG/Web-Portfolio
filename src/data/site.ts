export const site = {
  name: 'Risheekesh KG',
  role: 'AI & Software Engineer',
  location: 'Coimbatore, India',
  tagline:
    'I build systems that turn a noisy signal into a number someone can act on: perception for a Mars rover, face recognition at event scale, and a 16-hour air-quality forecast.',
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
  { id: 'system', label: 'System Project' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'activity', label: 'Activity' },
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

/**
 * The headline number a piece of work produced. It hangs in the values gutter
 * beside the prose, so only include one where a real measurement exists —
 * an empty gutter is honest, an invented figure is not.
 */
export type Result = {
  value: string
  label: string
}

export type Role = {
  org: string
  /** Shorter form for the timeline pill, where the full legal name will not fit. */
  short?: string
  title: string
  /**
   * First and last month of the role, `YYYY-MM`. These drive the timeline's
   * proportions and the displayed period, so a role is placed by its real
   * dates rather than by the order it is listed in. Omit `end` while ongoing;
   * omit both for team work with no fixed term.
   */
  start?: string
  end?: string
  /** Fallback label for a role with no dates. */
  period?: string
  /** Official page for the organisation, when there is one to link to. */
  href?: string
  points: string[]
  result?: Result
}

export const experience: Role[] = [
  {
    org: 'Payoda Technology Inc.',
    short: 'Payoda',
    title: 'Requirement Gathering Agent Workflow',
    start: '2026-06',
    end: '2026-07',
    result: { value: '60%', label: 'less manual documentation' },
    points: [
      'Built an enterprise requirements-management platform using AI to generate backlog specifications, epics, and user stories automatically, reducing manual documentation effort by 60%.',
      'Created an executive dashboard with 4-level tracking across projects, backlogs, epics, and stories, monitoring budgets, completion rates, and team workload while integrating Jira, Slack, and GitHub for unified visibility.',
    ],
  },
  {
    org: 'Rhodnet AI Private Limited',
    short: 'Rhodnet AI',
    title: 'Face Recognition & Clustering',
    start: '2025-08',
    end: '2025-11',
    result: { value: '37%', label: 'faster over 2,000+ images' },
    points: [
      'Built a DeepFace recognition system for 2000+ event images, optimizing preprocessing to reduce processing time by 37%.',
      'Enabled CPU and GPU (CUDA) execution and secured client data through input validation and access controls.',
    ],
  },
]

/** Team/competition work. Its own section — not employment. */
export const systemProjects: Role[] = [
  {
    org: 'PSG Team Aurora',
    title: 'Mars Rover Project',
    result: { value: '96%', label: 'arrow-detection accuracy' },
    points: [
      'Trained a custom arrow-detection model on a self-collected, annotated dataset using YOLOv8, achieving 96% accuracy.',
      'Integrated YOLOv8, BLIP, and ArUco markers for scene understanding and robotic decision-making, and enhanced a ROS-based dashboard with live camera, depth visualization, and terminal logs.',
    ],
  },
]

export type Project = {
  title: string
  subtitle: string
  points: string[]
  tags: string[]
  /** The resume links these but omits the URLs — fill in to show a Source link. */
  repo?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: 'VigilAI',
    subtitle: 'Agentic RTL verification platform for Verilog design validation',
    points: [
      'Built a React and FastAPI studio that syntax-checks Verilog, picks its own simulator — Icarus for digital, Ngspice for Verilog-AMS — and returns a waveform image, generating a minimal testbench when a design file ships without one.',
      'Drove verification with a LangGraph agent on Gemini that reads the component datasheet alongside the code, then loops analyse, fix and recompile for up to five iterations before writing a final report.',
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'LangGraph', 'Gemini'],
    repo: 'https://github.com/RisheekeshKG/Vigil-AI',
  },
  {
    title: 'Lyf-O',
    subtitle: 'Productivity application with agent support',
    points: [
      'Built a cross-platform Electron and FastAPI desktop app — Gmail inbox, Kanban work tasks, habits and journals — where the React UI reads and writes its own JSON files over Electron IPC.',
      'Backed it with a LangChain agent on Gemini that creates and updates those files from chat, and a K-Prototypes model that recommends templates from user clusters. It ships as one installer with the backend compiled in, so nothing else needs installing.',
    ],
    tags: ['Electron', 'React', 'FastAPI', 'LangChain', 'Gemini'],
    repo: 'https://github.com/RisheekeshKG/Lyf-O',
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
  {
    title: 'DeFi Credit Scoring',
    subtitle: 'Wallet credit scores from raw Aave V2 transaction history',
    points: [
      'Turned 100K+ nested Aave V2 transaction records into wallet-level features — repayment, liquidations, deposit-to-borrow ratio, and activity span — scoring 3,497 wallets from 0 to 1000.',
      'Labelled the training set with an interpretable rule-based heuristic, then fit an XGBoost regressor on it that beat RandomForest on RMSE and score stability. One command takes raw JSON to scored CSV.',
    ],
    tags: ['Python', 'XGBoost', 'pandas', 'scikit-learn'],
    repo: 'https://github.com/RisheekeshKG/DeFi-Credit-Scoring-Aave-V2-Transactions-Data',
  },
  {
    title: 'Ei-Gen',
    subtitle: 'AI Discord bot for image, text, and speech generation',
    points: [
      'Built a Discord bot in Python whose generator commands cover image generation from a prompt, Gemini-backed question answering, and text-to-speech returned to the channel as an audio file.',
      'Wrapped the generators in the things a live server needs: VADER sentiment moderation loaded as an extension, a rock-paper-scissors game, Minecraft server status, and role assignment on member join.',
    ],
    tags: ['Python', 'discord.py', 'Gemini', 'NLTK'],
    repo: 'https://github.com/RisheekeshKG/Ei-Gen',
  },
  {
    title: 'Viz-ED',
    subtitle: 'Air-writing letter practice for dyslexic students',
    points: [
      'Built a Flask app that turns a webcam into a tracing surface: MediaPipe follows the index fingertip, and the stroke runs green inside the target letter and red outside it, so the correction arrives while the child is still drawing.',
      'Scored each attempt as the contour area actually covered minus the spill outside it, and gated the next level in MongoDB behind a pass, so a section unlocks in order rather than all at once.',
    ],
    tags: ['Python', 'Flask', 'OpenCV', 'MediaPipe', 'MongoDB'],
    repo: 'https://github.com/RisheekeshKG/Viz-ED',
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
