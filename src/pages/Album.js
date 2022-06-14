import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumList: {},
    artistName: '',
    albumName: '',
    areAlbunsLoaded: false,
    favoriteArray: [],
  }

  getAlbumList = async () => {
    const { match: { params: { id } } } = this.props;
    const albumArray = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      albumList: albumArray,
      artistName: albumArray[0].artistName,
      albumName: albumArray[0].collectionName,
      favoriteArray: favorites,
    }, () => {
      this.setState({
        areAlbunsLoaded: true,
      });
    });
  }

  isFavorite = (music) => {
    const { favoriteArray } = this.state;
    return favoriteArray.find((favoriteMusic) => favoriteMusic.trackId === music.trackId);
  }

  componentDidMount = () => {
    this.getAlbumList();
  }

  render() {
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
            checkedValue={ this.isFavorite(music) }
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
