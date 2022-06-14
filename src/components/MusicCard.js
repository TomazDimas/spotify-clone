import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  }

  favoriteSong = async ({ target }) => {
    const { object } = this.props;
    console.log(target.checked);
    target.checked = false;
    this.setState((prev) => ({
      isLoading: true,
      isChecked: !prev.isChecked,
    }), async () => {
      await addSong(object);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;

    return (
      <div>
        { isLoading ? (
          <Loading />
        ) : (
          <div>

            <h3>{ trackName }</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favoriteButton">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id="favoriteButton"
                type="checkbox"
                onClick={ this.favoriteSong }
                checked={ isChecked }
              />
              Favorita
            </label>
          </div>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  object: PropTypes.string.isRequired,
};

export default MusicCard;
