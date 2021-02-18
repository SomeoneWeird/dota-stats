import { gql } from '@apollo/client';
import Wrapper from '@components/Layout/Wrapper';
import { PlayersHeader } from '@components/Players';
import { GetServerSideProps } from 'next';

import client from '../../apolloConfig';

interface PlayerProps {
  player: {
    steamAccountId: number;
    guildMember: {
      guild: {
        name: string;
        id: number;
        tag: string;
      };
    };
    steamAccount: {
      avatar: string;
      name: string;
      seasonRank: number;
    };
  };
}

const PlayerProfile: React.FC<PlayerProps> = ({ player }) => {
  const { steamAccount, steamAccountId, guildMember } = player;

  return (
    <Wrapper>
      <PlayersHeader
        steamAccount={steamAccount}
        steamId={steamAccountId}
        guild={guildMember.guild}
      />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.params.steamId[0];
  const path = context.params.steamId;

  const { data } = await client.query({
    query: gql`
      query PlayerHeader($steamId: Long!) {
        player(steamAccountId: $steamId) {
          steamAccountId
          guildMember {
            guild {
              name
              id
              tag
            }
          }
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
    props: { player: data.player, path } // will be passed to the page component as props
  };
};

export default PlayerProfile;
