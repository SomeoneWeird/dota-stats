// Components
import LayoutWrapper from "@components/Layout";
import PlayerDetails from "@components/Player/PlayerProfile";

// API Calls
import { fetchStratz } from "@lib/api";

function PlayerProfile({ playerData, playerMatches }) {
  const { steamAccount, winCount, matchCount } = playerData;
  return (
    <LayoutWrapper>
      <PlayerDetails playerData={playerData} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(context) {
  const steamId = context.params.steamId;
  const resPlayerData = await fetchStratz(`Player/${steamId}`);

  return {
    props: {
      playerData: resPlayerData.data,
    }, // will be passed to the page component as props
  };
}

export default PlayerProfile;
