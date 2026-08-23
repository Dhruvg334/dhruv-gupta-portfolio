# Dhruv Gupta — Personal Portfolio & Systems Showcase

> **Live Deployment:** [https://dhruvg334.github.io/dhruv-gupta-portfolio/](https://dhruvg334.github.io/dhruv-gupta-portfolio/)

This repository is the active, multi-page portfolio representing my software engineering and AI systems work.

> **Note on Roadmap:**  
> This site serves as my current production portfolio during my final year at KIIT (B.Tech CSE '27) while actively managing placements, applications, and system builds. A larger, more sophisticated next-generation portfolio repository is planned on my roadmap to introduce richer interactive visualizations, live telemetry embeds, and broader writing on agentic architectures.

---

## Site Architecture & Structure

The site is built as a clean, decoupled multi-page single-page application (SPA) using React Router with Hash routing for reliable static hosting:

1. **Landing Overview (`/#/`)**  
   A clear, human-readable introduction focused on who I am and what I build (intelligent search, AI safety guardrails, automated testing, and full-stack software products) without overwhelming technical jargon.

2. **Systems & Projects Directory (`/#/projects`)**  
   Central directory categorizing production builds across GraphRAG, AI Agent Safety, RAG Evaluation, Controlled Planning, and Enterprise NGO Workflows. Includes the interactive architecture workspace and engineering archive.

3. **In-Depth Architectural Case Studies (`/#/projects/:id`)**  
   Dedicated deep-dive case studies for each major system featuring:
   - **Interactive Mermaid Flowcharts** rendered dynamically in dark mode.
   - Real-world problem statements and operational context.
   - Step-by-step pipeline nodes and output contract signatures.
   - Safety guardrails and evaluation benchmarks.
   - Architectural tradeoffs and design decisions.

4. **Digital Resume & Print Viewer (`/#/resume`)**  
   An ATS-friendly digital resume sheet matching verified academic credentials (KIIT CSE '27, 9.45 CGPA, GATE DA 2026 AIR 1109), internship experience, project impact bullets, competitive achievements, and technical skill taxonomy. Includes a one-click `Print / Save as PDF` action with clean black-and-white print styles.

5. **Contact Hub (`/#/contact`)**  
   Direct communication portal with intent-based inquiry routing (roles, collaboration, architecture discussion, general inquiries) and one-click email copy tools.

---

## Built With

- **Framework & Runtime:** React 19, TypeScript, Vite
- **Routing:** React Router DOM (HashRouter for seamless GitHub Pages compatibility)
- **Diagrams & Visualizations:** Mermaid.js (SVG runtime rendering)
- **Animations:** Motion (`motion/react`)
- **Icons:** Lucide React (flat SVG icons)
- **Forms & Email Delivery:** Formspree
- **Typography:** Plus Jakarta Sans & DM Mono
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Dhruvg334/dhruv-gupta-portfolio.git
cd dhruv-gupta-portfolio

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Contact & Links

- **Email:** [dhruvg3304@gmail.com](mailto:dhruvg3304@gmail.com)
- **LinkedIn:** [linkedin.com/in/dhruv-gupta-7a7500287](https://www.linkedin.com/in/dhruv-gupta-7a7500287/)
- **GitHub:** [github.com/Dhruvg334](https://github.com/Dhruvg334)
- **Live Portfolio:** [dhruvg334.github.io/dhruv-gupta-portfolio](https://dhruvg334.github.io/dhruv-gupta-portfolio/)
