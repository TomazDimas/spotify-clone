import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    albumList: {},
    artistName: '',
    albumName: '',
    areAlbunsLoaded: false,
  }

  getAlbumList = async () => {
    const { match: { params: { id } } } = this.props;
    const albumArray = await getMusics(id);
    console.log(albumArray);
    this.setState({
      albumList: albumArray,
      artistName: albumArray[0].artistName,
      albumName: albumArray[0].collectionName,
      // areAlbunsLoaded: true,
    }, () => {
      this.setState({
        areAlbunsLoaded: true,
      });
    });
  }

  componentDidMount = () => {
    this.getAlbumList();
  }

  render() {
    // const { match: { params } } = this.props;
    const { areAlbunsLoaded, albumList, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        { areAlbunsLoaded && albumList.map((music, index) => {
          console.log('');
          return index === 0 ? (
            <h2 key="título">Abaixo:</h2>
          ) : (<MusicCard
            key={ music.trackName }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            object={ music }
          />);
        })}
        )
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
