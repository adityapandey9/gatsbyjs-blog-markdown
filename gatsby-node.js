/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
return graphql(`{
  allFile(filter: {
    internal: {
      mediaType: {
        eq: "text/markdown"
      }
    }
    relativeDirectory: {
      regex: "/"
    }
    name: {eq: "index"}
  }) {
    group(field: dir){
      edges {
        node {
          childMarkdownRemark{
            frontmatter{
              path
            }
          }
        }
      }
    }
  }
}
`)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      // console.log("SS: ", JSON.stringify(result))
result.data.allFile.group
        .forEach(({ edges }) => {
          const node = edges[0].node
          // console.log("Node: ", JSON.stringify(node))
          createPage({
            path: node.childMarkdownRemark.frontmatter.path,
            component: blogPostTemplate,
            context: {} // additional data can be passed via context
          });
        });
    });
}