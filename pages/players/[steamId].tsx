import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';

const PLAYER_DETAILS = gql`
  query PlayerHeader($steamId: Long!) {
    player(steamAccountId: $steamId) {
      steamAccountId
      isFollowed
      steamAccount {
        avatar
      }
    }
  }
`;

const PlayerProfile: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { loading, error, data } = useQuery(PLAYER_DETAILS, {
    variables: { steamId: 207736551 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error :(</p>;

  return <>{console.log(data)}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.params.steamId;

  return {
    props: {} // will be passed to the page component as props
  };
};

export default PlayerProfile;
