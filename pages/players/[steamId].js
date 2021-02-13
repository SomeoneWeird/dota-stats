// Layout
import LayoutWrapper from "@components/Layout";
import PlayerDetails from "@components/Player/PlayerProfile";
import RecentMatches from "@components/Player/RecentMatches";

// API Calls
import { fetchStratz } from "@lib/api";

function PlayerProfile({ playerData, playerMatches }) {
  const { steamAccount, winCount, matchCount } = playerData;
  return (
    <LayoutWrapper>
      <PlayerDetails playerData={playerData} />
      <hr className="border-black border-2 border-opacity-20"/>
      <RecentMatches steamId={steamAccount.steamId}/>
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
