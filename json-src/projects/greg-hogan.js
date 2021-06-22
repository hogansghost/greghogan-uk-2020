module.exports = {
  id: 'greghogan',
  name: 'Greg Hogan UK',
  role: 'Frontend Developer / Designer',
  timeframe: {
    start: '2020',
  },
  thumbnail: {
    srcSet: {
      pl: {
        src: '/assets/images/projects/greghogan/greghogan_poster_pl.jpg',
        width: '100w',
      },
      xs: {
        src: '/assets/images/projects/greghogan/greghogan_poster_xs.jpg',
        width: '800w',
      },
      sm: {
        src: '/assets/images/projects/greghogan/greghogan_poster_sm.jpg',
        width: '1000w',
      },
      md: {
        src: '/assets/images/projects/greghogan/greghogan_poster_md.jpg',
        width: '1200w',
      },
      lg: {
        src: '/assets/images/projects/greghogan/greghogan_poster_lg.jpg',
        width: '1600w',
      },
      xl: {
        src: '/assets/images/projects/greghogan/greghogan_poster_xl.jpg',
        width: '1800w',
      }
    },
    sizes: '(min-width: 700px) 800px, (min-width: 900px) 1000px, (min-width: 1000px) 1200px, (min-width: 1200px) 1600px, (min-width: 1550px) 1800px, 100vw',
  },
  projectContents: {
    projectVideo: {
      thumbnailSrcSet: {
        pl: {
          src: '/assets/images/projects/greghogan/greghogan_poster_pl.jpg',
          width: '100w',
        },
        xs: {
          src: '/assets/images/projects/greghogan/greghogan_poster_xs.jpg',
          width: '768w',
        },
        sm: {
          src: '/assets/images/projects/greghogan/greghogan_poster_sm.jpg',
          width: '992w',
        },
        md: {
          src: '/assets/images/projects/greghogan/greghogan_poster_md.jpg',
          width: '1100w',
        },
        lg: {
          src: '/assets/images/projects/greghogan/greghogan_poster_lg.jpg',
          width: '1400w',
        },
        xl: {
          src: '/assets/images/projects/greghogan/greghogan_poster_xl.jpg',
          width: '1660w',
        }
      },
      sizes: '(min-width: 700px) 768px, (min-width: 900px) 992px, (min-width: 1050px) 1100px, (min-width: 1300px) 1400px, (min-width: 1550px) 1660px, 100vw',
    },
    body: [
      {
        type: 'p',
        content: `In the first half of 2020, through the need to update my current job position to that of Geeiq, I decided that I should review the state of my portfolio. I did some initial performance measurements through the lighthouse tool, noting some potential improvements in code execution and accessibility as well as numerous tweaks to the design and usability.`,
      }, {
        type: 'h2',
        content: `Code refactoring and updates`,
      }, {
        type: 'p',
        content: `Since my last update to my portfolio, around 2018, the Ember framework had a significant update moving to the Glimmer rendering engine. The newer Glimmer components changed from Ember Object to native classes which bought with it a significant performance boost in rendering and compiled app size, so initiating this update was an obvious benefit.`,
      }, {
        type: 'p',
        content: `I spent the first few days rewriting all of my components into the new Glimmer syntax, which also allowed me to take stock and break some of the more complex components into simpler ones, modelled loosely after the atomic component design principal as well as cleaning out some of the more complex legacy code. Due to the difference in how each component style (Ember Object vs native classes) works, there were some significant rewrites required, such as how component lifecycle methods work and even limitations in which lifecycle methods still exist in the new component style.`,
      }, {
        type: 'p',
        content: `This rewrite of the components alone doubled my performance score in lighthouse, which was only improved further by implementing lazy loading of images (through a custom component tracking intersection observer and hot swapping the src and srccset attributes on an image) as well as compressing and resizing each of the images.`,
      }, {
        type: 'p',
        content: `I made some other minor tweaks to improve load times as listed below:`,
      }, {
        type: 'ul',
        content: [
          'Preload external resources where applicable / appropriate (font faces, etc.)',
          'Enable GZIP and efficient caching methods through Cloudfront on AWS.',
          'Remove legacy code fallbacks for IE10 with graceful visual fallbacks (e.g. the scrolling title for the home page sections.)',
          'Rewriting the scroll listener that is used for the lazy loading of images',
          'General code clean-up, etc.',
        ]
      }, {
        type: 'techGrid',
        content: [
          {
            iconSrc: 'fa-sass',
            title: 'Sass',
          }, {
            iconSrc: 'fa-js',
            title: 'JavaScript',
          }, {
            iconSrc: 'fa-github',
            title: 'GitHub',
          }, {
            iconSrc: 'fa-ember',
            title: 'Ember.js',
          }, {
            iconSrc: 'fa-ember',
            title: 'Ember Data',
          }, {
            iconSrc: 'fa-photoshop',
            title: 'Photoshop',
          }, {
            iconSrc: 'fa-aws',
            title: 'AWS',
          }, {
            iconSrc: 'fa-node',
            title: 'Node',
          },
        ]
      }, {
        type: 'h2',
        content: `Design`,
      }, {
        type: 'p',
        content: `There were numerous small wins throughout the site that I could implement without too much trouble, various inconsistent design elements and small accessibility tweaks as are outlined below:`,
      }, {
        type: 'h3',
        content: `Inconsistent header design between the landing and project pages`,
      }, {
        type: 'p',
        content: `I decided to bring some visual consistency to the overall design, taking the slanted edges that I had included in my original design and expanding them into triangles that I would use throughout the different areas of the website, instead of just the header of the project pages. I also mixed in the branding colours I had chosen (the red and green hues) into these recurring elements to make the overall look consistent and recognisable. `,
      }, {
        type: 'p',
        content: `In relation to this, I also updated the home page header to look more like the project header component, reusing some of the more atomic components between the two of them.`,
      }, {
        type: 'h3',
        content: `Inconsistent spacing between content sections and use of “brand” colours.`,
      }, {
        type: 'p',
        content: `Whilst rewriting the components into Glimmer, I updated all references to colours and padding values to a mix of Sass and CSS variables as well as coming up with a consistent naming convention for them, some identifier such as "content", a description of its purpose such as "padding" and then a size modifier if applicable for example "content-gutter-md" with md being the default in most cases. This also made it much simpler to create a dark mode for my portfolio as well (which I later published as an NPM / Ember package <a href="https://www.npmjs.com/package/ember-dark-mode" target="blank" rel="noopener noreferrer">ember-dark-mode</a>).`
      }, {
        type: 'p',
        content: `I updated each of the links within the project to make use of a consistent colour, the “brand” green, to reinforce the leaned behaviour of users that anything of that colour would initiate a page transition of some form. I augmented this expected behaviour as well by adding an appropriate icon to highlight whether a link would take you to an external website. Hovering a standard link, the back button, etc. while not looking identical, hopefully have their intended action reinforced through the shared colour and transition behaviour on hover and focus.`,
      }, {
        type: 'h3',
        content: `Inconsistent usage of imagery between and content information hierarchy on projects.`,
      }, {
        type: 'p',
        content: `In the fitst incarnation of my portfolio, planning was further to the back of my mind then it should have been. I was designing each page as I was writing the copy for each of the projects that I had worked on, finding myself throwing in some new image grid or tech grid to break up the, far too long, copy.`,
      }, {
        type: 'p',
        content: `This led to each page looking exactly as it had been created, done on the fly with no clear hirarchy of information or layout. Information on the technologies involved were sometimes at the top of bottom of a page, images were prioritised over any form of description about a project and my involvement and even those image grids varied in type and position between each project. This, of course, was easily fixed by building a template for each of the pages - giving a brief description of the company, my responsibilities and then imagery to corroborate the claims in each passage in an ordered fashion - slanted image grid, tex grid and then box image grid. Giving a structure to each of the pages in this way gives the user a clear pattern to recognise and thus, what to expect from each page. It makes it much easier for the user to find the information they might be more interested in, e.g. if they're intersted in the technologies involved in a project, they know it will be within the 'Tech and responsibilities overview' section below the primary copy.`,
      }
    ]
  }
};
