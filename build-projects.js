const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const environment = args[0];

const projectSrcPath = path.join(__dirname, './json-src/projects');
const projectsOutputPath = path.join(__dirname, './public/json');

let projects = [];
const projectsFinal = [];
const projectsBeta = [];

const sortOrder = [
  'resident-evil',
  'teads',
  'movidiam',
  'greghogan',
  'loveholidays',
  'geeiq',
  'exeon',
];

fs.readdirSync(projectSrcPath).forEach((file) => {
  const project = require(`${projectSrcPath}/${file}`);
  const projectIsBeta = file.split('.').includes('beta');

  const order = sortOrder.indexOf(sortOrder.find((sortId) => (
    sortId === project.id
  )));

  project.order = order;

  if (projectIsBeta) {
    projectsBeta.push(project);
  } else {
    projectsFinal.push(project);
  }
});

if (environment === 'production') {
  console.warn('Project files with ".beta" in the name are not included in production.');
  projects = projectsFinal;
} else {
  projects = [...projectsFinal, ...projectsBeta];
}

const stringifiedProjects = JSON.stringify({
  project: projects,
});

fs.writeFileSync(`${projectsOutputPath}/project.json`, stringifiedProjects);
