const path = require('path');
const fs = require('fs');

const projectSrcPath = path.join(__dirname, './json-src/projects');
const projectsOutputPath = path.join(__dirname, './public/json');
const projects = [];

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

  const order = sortOrder.indexOf(sortOrder.find((sortId) => (
    sortId === project.id
  )));

  project.order = order;

  projects.push(project);
});

const stringifiedProjects = JSON.stringify({ project: projects });

fs.writeFileSync(`${projectsOutputPath}/project.json`, stringifiedProjects);
