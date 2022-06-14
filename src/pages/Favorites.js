import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favoriteList: favorites,
        isLoading: false,
      });
    });
  }

  isFavorite = (music = { trackid: '' }) => {
    const { favoriteList } = this.state;
    return favoriteList.some((favoriteMusic) => favoriteMusic.trackId === music.trackId);
  }

  removeFavorite = async (objeto) => {
    await removeSong(objeto);
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteList: favorites,
    });
  }

  render() {
    const { isLoading, favoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? (
          <Loading />
        ) : (
          favoriteList.length > 0 && favoriteList.map((music, index) => {
            console.log('oi');
            return index < 0 ? (
              <h2 key="título">Abaixo:</h2>
            ) : (<MusicCard
              key={ music.trackName }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              object={ music }
              checkedValue={ this.isFavorite(music) }
              removeFavorite={ this.removeFavorite }
            />);
          })
        )}
      </div>
    );
  }
}

export default Favorites;
