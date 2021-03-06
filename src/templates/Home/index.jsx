import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../util/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';



export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  };
  async componentDidMount() {
    await this.loadPosts();
  }


  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});

  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className="container">
        {!!searchValue && (
          <div className="search-value">
            <h1>Search value: {searchValue}</h1>
            <br />
            <h2>Foram encontrados {filteredPosts.length} resultados</h2>
            <br /><br /><br />
          </div>
        )}
        <Input 
          searchValue = {searchValue}
          handleChange = {this.handleChange}
          filteredPosts = {filteredPosts}
        />
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>N??o existem posts</p>
        )}
        

        <div className="button-container">
          {!searchValue && (
            <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
          )}
        </div>
      </section>
    );
  }
}

