import { gql } from '@apollo/client';
import Wrapper from '@components/Layout/Wrapper';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

const StyleDiv = tw.div`
  bg-indigo-500
`;

const PlayerProfile: React.FC<PlayerProps> = ({ player }) => {
  const { steamAccount, steamId } = player;
  const avatarPath: string = process.env.NEXT_PUBLIC_AVATAR_PATH + steamAccount.avatar;

  return (
    <StyleDiv>
      <Wrapper>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              className="h-auto w-32 rounded"
              src={avatarPath}
              alt={`${steamAccount.name}'s avatar`}
            />
          </div>
          <div className="">
            <h1 className="">{steamAccount.name}</h1>
          </div>
        </div>
      </Wrapper>
    </StyleDiv>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.params.steamId;

  const { data } = await client.query({
    query: gql`
      query GetPlayer($steamId: Long!) {
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
