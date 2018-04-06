import React from 'react'
import Link from 'gatsby-link'
import axios from 'axios';
import Repo from '../components/Repo';
import TemplateWrapper from '../layouts/index';

export default class IndexPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/search/repositories?sort=stars&order=desc&q=language:java`)
      .then(res => {
        const repo = res.data.items;
        this.setState({repos: repo});
      });
  }

  render(){
    let rows = [];
    for(var i=0;i<this.state.repos.length;i++){
      rows.push(<Repo title={this.state.repos[i].full_name} link={this.state.repos[i].url} description={this.state.repos[i].description} key={i} />)
    }
    return(
         <div>
          {rows}
        </div>
    );
  }
}
