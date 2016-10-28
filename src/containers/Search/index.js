import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import Spinner from "react-spinner";
import {loadMoments} from "../../actions";
import MomentList from "../../components/MomentList";

export class Search extends Component {
  componentWillMount() {
      const {loadMoments} = this.props;

      loadMoments({momentId: ""});
  }
  render() {
    const renderSearchResults = () => {
        const {loading, moments} = this.props;

        if(loading) {
            return (
                <div className="text-center lead">
                    <p>Searching...</p>
                    <Spinner />
                </div>
            );
        } else {
            return (
                <MomentList moments={moments} />
            );
        }
    };

    return (
      <div className="container">
        <form>
            <div className="form-group">
                <label htmlFor="searchQuery">Search Query (transcripts, tags, astronauts, etc.)</label>
                <input type="text" className="form-control" id="searchQuery" />
            </div>

            <div className="form-group">
                <label htmlFor="missions">Missions</label>
                <select multiple className="form-control" id="missions" style={{color: "#000"}}>
                    <option>Apollo 11</option>
                    <option>Other Mission</option>
                </select>
            </div>

            <button type="submit" className="btn btn-default">Search</button>
        </form>

        <hr />
        <h2>Search Results</h2>
        <form>
            <div className="form-group">
                <label htmlFor="sortBy">Sort By</label>
                <select className="form-control" id="sortBy">
                    <option>Relevance</option>
                    <option>Rating</option>
                    <option>Popularity</option>
                    <option>Random</option>
                </select>
            </div>
        </form>

        {renderSearchResults()}

        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const moments = state.moments;

  return {
    loading: moments.loading,
    moments: moments.entities.moments
  };
}

export default connect(mapStateToProps, {
  loadMoments
})(Search);