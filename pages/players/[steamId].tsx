import { GetServerSideProps } from "next";
import { useQuery, gql } from "@apollo/client";

const PLAYER_DETAILS = gql`
  {
    player(steamAccountId: 207736551) {
      steamAccountId
      behaviorScore
      matchCount
      winCount
    }
  }
`;

function PlayerProfile({ playerData, playerMatches }) {
  const { loading, error, data } = useQuery(PLAYER_DETAILS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error :(</p>;

  return <>{console.log(data)}</>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.params.steamId;

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default PlayerProfile;
