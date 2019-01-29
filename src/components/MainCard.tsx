import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';
// import set = Reflect.set;

const PostCardStyles = css`
  font-family: system-ui;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  background: #fff center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease;

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }
  
  button {
    font-family: system-ui;
    display: inline-block;
    margin: 0 0 0 15px;
    // padding: 0 25px;
    height: 27px;
    outline: none;
    color: #444444;
    font-size: 1.7rem;
    // line-height: 37px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
    background: linear-gradient(
      color(var(--blue) whiteness(+7%)),
      color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
      color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
      color(var(--blue) lightness(-4%) saturation(-10%))
    );
    border-radius: 8px;
    box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.14);

    -webkit-font-smoothing: subpixel-antialiased;
  }
  .post-card-third {
    max-width: 320px;
  }
  .g-text {
    font-family: system-ui;
    margin: 5px;
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 25px 25px 0;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardTags = styled.span`
  display: block;
  margin-bottom: 4px;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  line-height: 1.15em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const PostCardTitle = styled.h2`
  margin-top: 0;
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;
`;

const PostCardMeta = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px 25px;
`;

const AuthorList = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AuthorListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :nth-of-type(1) {
    z-index: 10;
  }
  :nth-of-type(2) {
    z-index: 9;
  }
  :nth-of-type(3) {
    z-index: 8;
  }
  :nth-of-type(4) {
    z-index: 7;
  }
  :nth-of-type(5) {
    z-index: 6;
  }
  :nth-of-type(6) {
    z-index: 5;
  }
  :nth-of-type(7) {
    z-index: 4;
  }
  :nth-of-type(8) {
    z-index: 3;
  }
  :nth-of-type(9) {
    z-index: 2;
  }
  :nth-of-type(10) {
    z-index: 1;
  }
  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: block;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  background: ${colors.darkgrey};
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;

  @media (max-width: 650px) {
    display: none;
  }
`;

const StaticAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 -5px;
  width: 34px;
  height: 34px;
  border: #fff 2px solid;
  border-radius: 100%;
`;

const AuthorProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)}
  border-radius: 100%;
  object-fit: cover;
`;

const ReadingTime = styled.span`
  flex-shrink: 0;
  margin-left: 20px;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  line-height: 33px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export interface PostCardProps {
  post: PageContext;
}

const PostCard: React.FunctionComponent<PostCardProps> = () => {
  const [currentName, setCurrentName] = React.useState('');
  const [names, setNames] = React.useState([]);
  const [error, setError] = React.useState('');
  const [drawnNames, setDraw] = React.useState({});
  const addCurrentName = () => {
    if (!names.includes(currentName)) {
      setNames(names.concat(currentName));
      setError(false);
    } else {
      setError('Names must be unique!');
    }
  };
  const deleteName = name => {
    const index = names.indexOf(name);
    const nextNames = [...names];
    nextNames.splice(index, 1);
    setNames(nextNames);
  };
  const footballMoves = [
    'Throw In',
    'Goal Kick',
    'Shot',
    'Corner Kick',
    'Foul',
    'Free Kick',
    'Offside',
    'Yellow Card',
    'Goal',
    'Hand Ball',
    'Penalty',
    'Red Card',
    'Own Goal',
    'Dropped Ball'
  ];

  function getRandom (number) {
    return Math.floor(Math.random() * Math.floor(number));
  }

  function getRandomFootballMove (number) {
    const rand = getRandom(number);
    return footballMoves[rand];
  }

  function getNFootballMoves (players) {
    return players.map(() => getRandomFootballMove(players.length));
  }

  function isMappedUniquely (array, originArray) {
    return Array.from(new Set(array)).length === originArray.length;
  }

  function mapPlayersToFootballMoves (players, moves) {
    return players.reduce((result, player, i) => ({
      ...result,
      [player]: moves[i]
    }), {})
  }

  function drawNames (players = []) {
    if (players.length < 2) {
      throw new Error(`Requires at least 2 players, got: ${players.length}`);
    }

    if (players.length > footballMoves.length) {
      throw new Error(`Maximum player limit reached. Max players: ${footballMoves.length}, received: ${players.length}`);
    }

    let result = getNFootballMoves(players);

    while (!isMappedUniquely(result, players)) {
      result = getNFootballMoves(players);
    }

    return mapPlayersToFootballMoves(players, result);
  }
  return (
    <>
      <article
        className={`post-card no-image`}
        css={PostCardStyles}
        style={{ maxWidth: '50%' }}
      >
        <PostCardContent className="post-card-content post-card-third">
          <div className="post-card-content-link" css={PostCardContentLink}>
            <header className="post-card-header">
              {/*{post.frontmatter.tags && <PostCardTags>{post.frontmatter.tags[0]}</PostCardTags>}*/}
              <PostCardTitle>{'Add some names:'}</PostCardTitle>
            </header>
            <PostCardExcerpt>
              {!!error && (
                <p style={{ color: 'red' }}>
                  {error}
                </p>
              )}
              <input
                disabled={names.length >= 14}
                className="g-text"
                type="text"
                onChange={({ target: { value } }) => setCurrentName(value)}
                value={currentName}
                onKeyPress={({ key }) => {
                  if (key === 'Enter') {
                    addCurrentName();
                    setCurrentName('');
                  }
                }}
              />
              <button onClick={addCurrentName}>
                Add
              </button>
              {names.map((name, i) => (
                <div className="g-text" key={name}>
                  <span>{`${i + 1}. ${name}`}</span>
                  <button onClick={() => deleteName(name)}>
                    Delete
                  </button>
                </div>
              ))}
            </PostCardExcerpt>
          </div>
          <PostCardMeta className="post-card-meta">
            <AuthorList>
              <AuthorListItem>
                <AuthorNameTooltip className="author-name-tooltip">
                  {'Your mum'}
                </AuthorNameTooltip>
              </AuthorListItem>
            </AuthorList>
          </PostCardMeta>
        </PostCardContent>
      </article>
      <article
        className={`post-card no-image`}
        css={PostCardStyles}
        style={{ maxWidth: '50%' }}
      >
        <PostCardContent className="post-card-content post-card-third">
          <div className="post-card-content-link" css={PostCardContentLink}>
            <header className="post-card-header">
              {/*{post.frontmatter.tags && <PostCardTags>{post.frontmatter.tags[0]}</PostCardTags>}*/}
              <PostCardTitle>
                <button onClick={() => setDraw(drawNames(names))} style={{ margin: 0 }}>
                  Draw names
                </button>
              </PostCardTitle>
            </header>
            <PostCardExcerpt>
              {Object.entries(drawnNames).map(([name, move], i) => (
                <div className="g-text">
                  <span>{i + 1}. {name}</span> <span style={{ float: 'right' }}>{move}</span>
                </div>
              ))}
            </PostCardExcerpt>
          </div>
          <PostCardMeta className="post-card-meta">
            <AuthorList>
              <AuthorListItem>
                <AuthorNameTooltip className="author-name-tooltip">
                  {'Your mum'}
                </AuthorNameTooltip>
              </AuthorListItem>
            </AuthorList>
          </PostCardMeta>
        </PostCardContent>
      </article>
    </>
  );
};

export default PostCard;
