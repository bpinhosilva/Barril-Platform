import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  let [tags, setTags] = React.useState<string[]>([]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      category: { value: string };
      title: { value: string };
      subtitle: { value: string };
      description: { value: string };
      type: { value: string };
      author: { value: string };
      replayBundleUrlJson: { value: string };
      imageFilename: { value: string };
      duration: { value: number };
      isDownloadable: any;
      isStreamable: any;
    };

    const newGame = {
      category: target.category.value,
      title: target.title.value,
      subtitle: target.subtitle.value,
      description: target.description.value,
      type: target.type.value,
      author: target.author.value,
      replayBundleUrlJson: target.replayBundleUrlJson.value,
      duration: target.duration.value,
      isDownloadable: target.isDownloadable.checked,
      isStreamable: target.isStreamable.checked,
      tags,
      images: [
        {
          filename: target.imageFilename.value,
          type: 1,
        },
      ],
    };

    console.log(newGame);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame),
    };
    fetch('http://localhost:3000/v1/games', requestOptions).then((res) => {
      console.log(res);

      if (res.status === 201) {
        window.location.reload();
      }
    });
  };

  return (
    <div className="App">
      <section>
        <h2>Game</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input type="text" name="category" />
          </label>

          <br />

          <label>
            Title:
            <input type="text" name="title" />
          </label>

          <br />

          <label>
            Subtitle:
            <input type="text" name="subtitle" />
          </label>

          <br />

          <label>
            Description:
            <input type="text" name="description" />
          </label>

          <br />

          <label>
            Type:
            <input type="text" name="type" />
          </label>

          <br />

          <label>
            Tags:
            <ReactTagInput
              placeholder="add tags"
              tags={tags}
              onChange={(newTags: string[]) => setTags(newTags)}
            />
          </label>

          <br />

          <label>
            Author:
            <input type="text" name="author" />
          </label>

          <br />

          <label>
            Replay Bundle Url:
            <input type="text" name="replayBundleUrlJson" />
          </label>

          <br />

          <label>
            Image filename:
            <input type="text" name="imageFilename" />
          </label>

          <br />

          <label>
            Duration:
            <input type="text" name="duration" />
          </label>

          <br />

          <label>
            IsDownloadable
            <input type="checkbox" name="isDownloadable" />
          </label>

          <br />

          <label>
            IsStreamable
            <input type="checkbox" name="isStreamable" />
          </label>

          <br />

          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        <Game />
      </section>
    </div>
  );
}

export default App;
