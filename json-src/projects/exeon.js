module.exports = {
  id: 'exeon',
  name: 'Exeon Analytics',
  role: 'Lead frontend Developer',
  timeframe: {
    start: 'Feb 2021',
    end: 'Jun 2021',
  },
  thumbnail: {
    srcSet: {
      pl: {
        src: '/assets/images/projects/exeon/poster_pl.png',
        width: '100w',
      },
      xs: {
        src: '/assets/images/projects/exeon/poster_xs.png',
        width: '768w',
      },
      sm: {
        src: '/assets/images/projects/exeon/poster_sm.png',
        width: '992w',
      },
      md: {
        src: '/assets/images/projects/exeon/poster_md.png',
        width: '1100w',
      },
      lg: {
        src: '/assets/images/projects/exeon/poster_lg.png',
        width: '1400w',
      },
      xl: {
        src: '/assets/images/projects/exeon/poster_xl.png',
        width: '1660w',
      }
    },
    sizes: '(min-width: 700px) 768px, (min-width: 900px) 992px, (min-width: 1050px) 1100px, (min-width: 1300px) 1400px, (min-width: 1550px) 1660px, 100vw',
  },
  projectContents: {
    projectVideo: {
      thumbnailSrcSet: {
        pl: {
          src: '/assets/images/projects/exeon/poster_pl.png',
          width: '100w',
        },
        xs: {
          src: '/assets/images/projects/exeon/poster_xs.png',
          width: '768w',
        },
        sm: {
          src: '/assets/images/projects/exeon/poster_sm.png',
          width: '992w',
        },
        md: {
          src: '/assets/images/projects/exeon/poster_md.png',
          width: '1100w',
        },
        lg: {
          src: '/assets/images/projects/exeon/poster_lg.png',
          width: '1400w',
        },
        xl: {
          src: '/assets/images/projects/exeon/poster_xl.png',
          width: '1660w',
        }
      },
      sizes: '(min-width: 700px) 768px, (min-width: 900px) 992px, (min-width: 1050px) 1100px, (min-width: 1300px) 1400px, (min-width: 1550px) 1660px, 100vw',
    },
    body: [
      {
        type: 'h2',
        content: `About Exeon`,
      }, {
        type: 'p',
        content: `Exeon Analytics is a Swiss cyber security company, that produces the product "ExeonTrace Network Detection and Response" platform, which makes use of their algorythmic analysis of network traffic to highlight possible issues and weaknesses to network managers.`,
      }, {
        type: 'h2',
        content: `Tech and responsibilities overview`,
      }, {
        type: 'p',
        content: `I joined Exeon in February of 2021, working 60% as lead frontend developer to aid in building out the frontend for additional features to the platform, as well as working to improve the UI and UX to bring it to the next level.`,
      }, {
        type: 'p',
        content: `As Exeon is a security product, I will be unable to give more explicit details or screenshots of the product. The first project that I undertook was to overhaul the build and release process with improvements to the webpack configuration as well as create demonstrations for technologies we could implement within the application to speed the development process and bring the product more in line with modern practises, such as styled components, CSS variables, CSS grid layout, implementation of Redux, etc.`,
      }, {
        type: 'techGrid',
        content: [
          {
            iconSrc: 'fa-react',
            title: 'React',
          }, {
            iconSrc: 'fa-ts',
            title: 'TypeScript',
          }, {
            iconSrc: 'fa-styled-components',
            title: 'Styled Components',
          }, {
            iconSrc: 'fa-redux',
            title: 'Redux',
          }, {
            iconSrc: 'fa-yarn',
            title: 'Yarn',
          }, {
            iconSrc: 'fa-webpack',
            title: 'Webpack',
          },
        ]
      }
    ],
  },
};
