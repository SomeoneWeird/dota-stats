import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';

import client from '../../apolloConfig';

interface PlayerProps {
  player: {
    steamId: number;
    steamAccount: {
      avatar: string;
      name: string;
      seasonRank: number;
    };
  };
}

const PlayerProfile: React.FC<PlayerProps> = ({ player }) => {
  const { steamAccount, steamId } = player;
  console.log(player);
  return (
    <>
      <h1>{steamAccount.name}</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.params.steamId;

  const { data } = await client.query({
    query: gql`
      query PlayerHeader($steamId: Long!) {
        player(steamAccountId: $steamId) {
          steamAccountId
          steamAccount {
            avatar
            name
            seasonRank
          }
        }
      }
    `,
    variables: { steamId: steamId }
  });

  return {
    props: { player: data.player } // will be passed to the page component as props
  };
};

export default PlayerProfile;
