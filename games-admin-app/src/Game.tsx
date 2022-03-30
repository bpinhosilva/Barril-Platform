import React from 'react';

export default class Game extends React.Component {
  state = { games: [] };

  componentDidMount() {
    fetch('http://localhost:3000/v1/games')
      .then((res) => res.json())
      .then((result) => {
        this.setState({ games: result.listings });
      });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
            </tr>
          </thead>

          <tbody>
            {this.state.games.map((game: any, index: number) => (
              <tr key={game.id}>
                <td>
                  <span>{game.title}</span>
                </td>
                <td>
                  <span>{game.subtitle}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
