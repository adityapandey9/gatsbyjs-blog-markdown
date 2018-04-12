import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Media from 'react-media'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header'
import './index.css'
import "../styles/layout-overide.css";

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 980,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%"
      }}
    >
      <Media query={{ maxWidth: 848 }}>
        {matches =>
          matches ? (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 1 }}>{children()}</div>
            </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 2.5, paddingRight: "30px" }}>
                {children()}
              </div>
              <div style={{ flex: 1 }}>
              {
                data.allMarkdownRemark.edges.map((val,i)=> {
                return <Sidebar
                  title={val.node.frontmatter.title}
                  description={val.node.excerpt}
                  link={val.node.frontmatter.path}
                  key={i}
                />;
              })}
              </div>
            </div>
          )
        }
      </Media>
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const layoutQuery = graphql`
query getBlogPost($last: Int = 3){
  allMarkdownRemark(limit: $last, filter: {fileAbsolutePath: {regex: "/\/index.md/g"}}){
   edges {
     node {
       excerpt(pruneLength: 140)
       frontmatter {
         title
         path
       }
     }
   }
 }
}
`;

export default TemplateWrapper
