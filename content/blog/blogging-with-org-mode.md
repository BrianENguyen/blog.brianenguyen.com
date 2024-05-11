---
title: (LEGACY) Writing My BLogs with Org Mode
description: 
date: 2022-06-30T15:00:00
edited: 2024-05-11T11:12:00
---

# (LEGACY) Writing My Blogs with Org Mode

> 12 Jun, 2023 · 6 min

_Edit:_ As don't use this method anymore as I have switched to Nuxt Content,
but I will leave this here if anyone wants to refer to this blog to help
with content management and org mode!

I used JSX to write my blogs, which helped me get the job done, but it
was a huge hassle. I had to worry about JSX syntax, bugs, CSS classes,
etc. These problems distracted me from the actual content creation.
After my blog files were done, they ended up being a messy compilation
filled with JSX syntax that distracts the user from the actual text
content. This honestly demotivated me from writing blogs

I knew I had to find a solution to this problem. Instead of using JSX, I
had to turn to my favorite markup language to do the work: Org Mode

## What is Org Mode?

Org Mode (also _org-mode_) is a type of markup language used in Emacs. I
love org-mode because it\'s very versatile in what it can do. I use it
to take notes, write documents, make an agenda, and develop websites.
It\'s my preferred markup language over Markdown (which I will explain
more in a future blog)

## Setup / Methods

Since there isn\'t a dedicated package specifically for converting
org-mode to JSX, I had to adopt a two-step process. First, I wrote my
documents in org-mode and then exported them to Markdown.

There are several packages that can help parse Markdown into JSX, like
`react-markdown`{.verbatim} and `markdown-to-jsx`{.verbatim}. Since I am
using the Vite engine to build this React app, I use the
[vite-plugin-react-markdown](https://github.com/geekris1/vite-plugin-react-markdown)
package for this website

Once this package is installed, I had to configure my
`vite.config.js`{.verbatim} file to utilize the package and allow the
app to include Markdown files

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-react-markdown';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    Markdown(),
    react({
      include: [/\.tsx$/, /\.md$/],
    }),
  ],
});

```

Inside of my `Routes.js`{.verbatim} file, I set it up so that each blog
post has a prop that has the name of the Markdown file

```javascript
// Routes.js
  {
    path: '/blog/volunteering-with-tzu-chi',
    key: 'Volunteering with Tzu Chi',
    component: BlogPostView,
    props: {
      title: `Volunteering with the Tzu Chi Foundation ${suffix}`,
      markdownFile: 'volunteering-tzu-chi',
    },
  },
```

When rendering my routes, I ensure that these props are passed into the
components

```javascript
import ROUTES from './Routes';
const RenderRoutes = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      {ROUTES.map((route) => (
        <Route
          path={route.path}
          key={route.key}
          exact={true}
          render={(props) => {
            <route.component {...props} {...route.props} />}
          }
      ))}
    </Switch>
  );
};

export default RenderRoutes;

```

For my blog posts, I set up a component called `BlogPostView`{.verbatim}
that retrieves a Markdown file and parses it to JSX.

```javascript
import React, { useEffect, useState } from 'react';
import './BlogPostView.css';

const BlogPostView = ({ markdownFile, title }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    import(`../../../pages/blog/${markdownFile}.md`)
      .then((res) => {
        setContent(res.default);
      })
      .catch((err) => {
        console.log(`Failed to import Markdown: ${err}`);
      });
  }, [markdownFile]);

  return (
    {content && <>{content}</>}
  );
};

export default BlogPostView;
```

In my implementation, I established a state variable called
`content`{.verbatim}. When the component is loaded, it retrieves the
Markdown file from the prop that was passed in. After successfully
fetching the data, the component updates the state variable \'content\'
with that data.

```javascript
const BlogPostView = ({ markdownFile, title }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    import(`../../../pages/blog/${markdownFile}.md`)
      .then((res) => {
        setContent(res.default);
      })
      .catch((err) => {
        console.log(`Failed to import Markdown: ${err}`);
      });
  }, [markdownFile]);

...
```

## CSS

When exporting Markdown to HTML, several HTML elements are commonly used
to represent different Markdown constructs. For example:

1.  Headings
    - Markdown: `# Heading 1`{.verbatim}
    - HTML: `<h1>Heading 1</h1>`{.verbatim}
2.  Paragraphs:
    - Markdown: `This is a paragraph.`{.verbatim}
    - HTML: `<p>This is a paragraph.</p>`{.verbatim}

org-mode lacks a built-in mechanism to apply CSS classes for exporting
to Markdown. Instead, I utilize element selectors to apply styles in
such scenarios. Below is a snippet from my `BlogPostView.css`{.verbatim}
file, showcasing the styles I apply. Please note that I leverage the
`vite-plugin-react-markdown`{.verbatim} class from the package to apply
these styles effectively.

```css
/* BlogPostView.css */
.vite-plugin-react-markdown h1 {
  text-align: center;
  margin-top: 200px;
}

.vite-plugin-react-markdown h2 {
  margin-top: 4rem;
  font-size: 2.4rem;
  text-transform: capitalize;
}

.vite-plugin-react-markdown pre {
  background-color: #363636;
}

.vite-plugin-react-markdown pre code {
  font-size: 1rem;
  overflow-x: auto;
  white-space: pre-wrap;
}
```

## Issues I\'ve Encountered (and Solutions to Them)

Below are some problems that I\'ve encountered when trying to convert
org-mode to JSX. This section serves as a reference in case you are
using this blog as a guide for your set-up

### Images

org-mode doesn\'t have a way to export alt tags on images to Markdown

```markdown
// org-mode
[[example.png][an example alt]]

// exported md file
![img](example.png)
```

To get around this, I just had to include the exclamation symbol at the
beginning of the org image line

```markdown
// org-mode
![[example.png][an example alt]]

// exported md file
![an example alt](example.png)
```

### The `import`{.verbatim} statement

This problem is specific if you\'re using Vite and
`vite-plugin-react-markdown`{.verbatim}. If you\'re using a different
method to rendering Markdown, ignore this section

When using dynamic imports, they must end with a file extension. From
the `rollup`{.verbatim} docs, to avoid unintended imports of files
within a folder, it is necessary for imports to conclude with a file
extension within the static portions of the import. This ensures that
only the intended files are included in the import process.

```javascript
// Not allowed
import(`./foo/${bar}`);

// allowed
import(`./foo/${bar}.js`);
```

I had my import similar to the one below, which caused errors:

```javascript
import(`./path/to/markdownFile/${markdownFile}`)
```

Therefore, I had to change my import to this:

```javascript
import(`./path/to/markdownFile/${markdownFile}.md`)
```

## Conclusion

In conclusion, by transitioning to org-mode and leveraging Markdown with
JSX, I was able to overcome the hassles of JSX and streamline their blog
writing process, leading to a more efficient and enjoyable experience.

I hope you take your blogging experience to the next level by embracing
the power of structured and efficient writing. Whichever language you
prefer, incorporating org-mode or Markdown into your blogging workflow
will enhance your productivity and streamline content creation. Say
goodbye to distractions and messy files, and hello to a seamless and
enjoyable writing experience!
