import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    albumList: {},
    artistName: '',
    albumName: '',
  }

  getAlbumList = async () => {
    const { match: { params: { id } } } = this.props;
    const albumArray = await getMusics(id);
    this.setState({
      albumList: albumArray,
      artistName: albumArray[0].artistName,
      albumName: albumArray[0].collectionName,
    });
  }

  componentDidMount = () => {
    this.getAlbumList();
  }

  render() {
    // const { match: { params } } = this.props;
    const { albumList, artistName, albumName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        { albumList }
        {/* /* { albumList.map((music, index) => {
          const { trackName, previewUrl } = music;
          return (<MusicCard
            key={ index }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />);
        }) } */}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
