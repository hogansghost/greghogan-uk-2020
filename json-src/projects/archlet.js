module.exports = {
  id: 'archlet',
  name: 'Archlet',
  role: 'Frontend Developer',
  timeframe: {
    start: 'Jun 2021',
    end: 'Present',
  },
  url: [
    {
      href: 'https://www.archlet.io/',
      label: 'https://www.archlet.io/',
    }
  ],
  thumbnail: {
    srcSet: {
      pl: {
        src: '/assets/images/projects/archlet/archlet_poster_pl.png',
        width: '100w',
      },
      xs: {
        src: '/assets/images/projects/archlet/archlet_poster_xs.png',
        width: '768w',
      },
      sm: {
        src: '/assets/images/projects/archlet/archlet_poster_sm.png',
        width: '992w',
      },
      md: {
        src: '/assets/images/projects/archlet/archlet_poster_md.png',
        width: '1100w',
      },
      lg: {
        src: '/assets/images/projects/archlet/archlet_poster_lg.png',
        width: '1400w',
      },
      xl: {
        src: '/assets/images/projects/archlet/archlet_poster_xl.png',
        width: '1660w',
      }
    },
    sizes: '(min-width: 700px) 768px, (min-width: 900px) 992px, (min-width: 1050px) 1100px, (min-width: 1300px) 1400px, (min-width: 1550px) 1660px, 100vw',
  },
  projectContents: {
    projectVideo: {
      thumbnailSrcSet: {
        pl: {
          src: '/assets/images/projects/archlet/archlet_poster_pl.png',
          width: '100w',
        },
        xs: {
          src: '/assets/images/projects/archlet/archlet_poster_xs.png',
          width: '768w',
        },
        sm: {
          src: '/assets/images/projects/archlet/archlet_poster_sm.png',
          width: '992w',
        },
        md: {
          src: '/assets/images/projects/archlet/archlet_poster_md.png',
          width: '1100w',
        },
        lg: {
          src: '/assets/images/projects/archlet/archlet_poster_lg.png',
          width: '1400w',
        },
        xl: {
          src: '/assets/images/projects/archlet/archlet_poster_xl.png',
          width: '1660w',
        }
      },
      sizes: '(min-width: 700px) 768px, (min-width: 900px) 992px, (min-width: 1050px) 1100px, (min-width: 1300px) 1400px, (min-width: 1550px) 1660px, 100vw',
    },
    body: [
      {
        type: 'p',
        content: `I have just started at Archlet as a frontend developer, working help create a component library as well as working within the web app team to create new user focused features for the Archlet app.`,
      }, {
        type: 'h2',
        content: `Tech and responsibilities overview`,
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
            iconSrc: 'fa-react',
            title: 'GraphQL',
          }, {
            iconSrc: 'fa-react',
            title: 'React testing library',
          }, {
            iconSrc: 'fa-styled-components',
            title: 'Styled Components',
          }, {
            iconSrc: 'fa-redux',
            title: 'Redux',
          }, {
            iconSrc: 'fa-yarn',
            title: 'Yarn',
          },
        ]
      }
    ],
  },
};
