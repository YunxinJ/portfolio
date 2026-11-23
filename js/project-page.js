const projectKey = document.body.dataset.project;
const project = window.PROJECTS[projectKey];

const fileMap = {
  uvavatar: 'uvavatar.html',
  fstalker: 'fstalker.html',
  freeu: 'freeu.html',
  medical: 'medical.html',
  mentor: 'mentor.html'
};

const flowerMap = {
  uvavatar: 'flower-uvavatar.png',
  fstalker: 'flower-fstalker.png',
  freeu: 'flower-freeu.png',
  medical: 'flower-medical.png',
  mentor: 'flower-mentor.png'
};

function mediaElement(item) {
  if (item.type === 'video') {
    return `<video controls playsinline preload="metadata"${item.poster ? ` poster="${item.poster}"` : ''}>
      <source src="${item.src}" type="video/mp4" />
      Your browser does not support HTML video.
    </video>`;
  }
  return `<img src="${item.src}" alt="${item.alt || ''}" loading="lazy" />`;
}

function mediaGroup(items, layout = '') {
  if (!items || !items.length) return '';
  return `<div class="media-grid ${layout}">${items.map((item) => `
    <figure class="project-media">
      <div class="project-media-frame">${mediaElement(item)}</div>
      ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ''}
    </figure>`).join('')}</div>`;
}

function sectionMarkup(section) {
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('');
  const bullets = section.bullets?.length
    ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>`
    : '';
  const subsections = (section.subsections || []).map((item) => `
    <section class="project-subsection">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      ${mediaGroup(item.media, item.mediaLayout || '')}
    </section>
  `).join('');

  return `<section class="project-section">
    <h2>${section.title}</h2>
    ${mediaGroup(section.introMedia, section.introLayout || '')}
    ${paragraphs}
    ${bullets}
    ${subsections}
    ${mediaGroup(section.media, section.mediaLayout || '')}
  </section>`;
}

if (!project) {
  document.querySelector('#project-root').innerHTML = '<p>Project not found.</p>';
} else {
  document.title = `${project.title} — Yunxin Jiang`;
  document.querySelector('#project-root').innerHTML = `
    <div class="reading-progress" aria-hidden="true"></div>
    <a class="project-back" href="../index.html#gallery">Back to selected work</a>
    <header class="project-heading">
      <img class="project-flower" src="../assets/decor/${flowerMap[projectKey]}" alt="" aria-hidden="true" />
      <p class="project-kicker">Project ${project.number}</p>
      <h1>${project.title}</h1>
      <p class="project-subtitle">${project.subtitle}</p>
    </header>
    <article class="project-article">
      ${project.sections.map(sectionMarkup).join('')}
    </article>
    <section class="next-project">
      <div><span>Next project</span><strong>${project.next.title}</strong></div>
      <a href="${fileMap[project.next.key]}">View project</a>
    </section>
  `;
}

const progress = document.querySelector('.reading-progress');
const updateProgress = () => {
  if (!progress) return;
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const value = range > 0 ? Math.min(window.scrollY / range, 1) : 0;
  progress.style.transform = `scaleX(${value})`;
};

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.project-back, .project-heading, .project-section, .next-project');
revealItems.forEach((item) => { item.dataset.reveal = ''; });

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

  revealItems.forEach((item) => observer.observe(item));
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
