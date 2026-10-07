# Rohan Mandal Portfolio

A responsive personal portfolio for Rohan Mandal, highlighting cloud, DevOps, systems administration, networking, and cybersecurity experience.

![Portfolio architecture](docs/architecture_diagram.png)


![Portfolio architecture](image-1.png)

## Features

- Responsive single-page portfolio with profile, skills, experience, projects, certifications, and contact sections
- Smooth scrolling and motion effects that respect reduced-motion preferences
- Accessible keyboard navigation, skip link, mobile navigation, and project dialogs
- Contact form that opens the visitor's email application or copies a message to the clipboard
- Container-ready production build served by Nginx

## Technologies Used

### Front end

- React 19
- TypeScript
- Vite
- Motion and GSAP ScrollTrigger for interface animations
- Lenis for smooth scrolling
- Lucide React for icons
- CSS for responsive styling and layout

### Deployment

- Docker and Docker Compose
- Nginx
- Kubernetes
- GitHub Container Registry
- argocd

## Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg
│   └── images/                   # Portfolio images
├── src/
│   ├── App.tsx                   # Main portfolio page
│   ├── CinemaHero.tsx             # Hero section
│   ├── Cursor.tsx                 # Custom cursor component
│   ├── content.ts                 # Portfolio content and data
│   ├── usePageMotion.ts           # Page-animation hook
│   ├── style.css                  # Main styles
│   ├── cinema.css                 # Hero styles
│   ├── refinements.css            # Responsive refinements
│   └── main.tsx                   # Application entry point
├── kubernetes/
│   ├── deployment.yaml            # Kubernetes deployment
│   ├── service.yaml               # Kubernetes service
│   └── ingress.yaml               # Kubernetes ingress
├── docs/
│   └── architecture_diagram.png   # Deployment architecture diagram
├── Dockerfile                     # Production container image
├── docker-compose.yaml            # Local container setup
├── package.json                   # Scripts and dependencies
└── vite.config.ts                 # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rohanmandal798/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open <http://127.0.0.1:5173/> in your browser.

## Production Build

Create an optimized build in the `dist/` directory:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Docker

Build the Docker image:

```bash
docker build -t rohanmandal798/portfolio:v1 .
```

Run the container:

```bash
docker run -d --name portfolio -p 3000:80 rohanmandal798/portfolio:v1
```

The portfolio is then available at <http://localhost:3000>.

## Container Registry

Sign in to GitHub Container Registry:

```bash
docker login ghcr.io -u rohanmandal798
```

Create a Kubernetes image-pull secret before deploying a private image:

```bash
kubectl create secret docker-registry github-container-registry \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=YOUR_EMAIL
```

## Argo CD Credentials

Retrieve the initial Argo CD administrator password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
