import React from "react";
import Helmet from "react-helmet";


export default function Template({
  data 
}) {
  const post = data.markdownRemark; 
  console.log("Data: ",data)
  return (
    <div className="blog-post-container">
    <Helmet title={`CodeStack - ${post.frontmatter.title}`} />
     <div className="blog-post">
       <h1>{post.frontmatter.title}</h1>
       <img src={post.frontmatter.featuredImage.childImageSharp.original.src} alt="Logo" />
       <div
         className="blog-post-content"
         dangerouslySetInnerHTML={{ __html: post.html }}
       />
     </div>
   </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImage{
          childImageSharp{
            original{
              src
            }
          }
        }
      }
    }
  }
`;