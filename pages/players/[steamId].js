// Components
import LayoutWrapper from "@components/Layout";

// API Calls
import { fetchStratz } from "@lib/api";

function PlayerProfile({ playerData }) {
  const { steamAccount } = playerData;
  return (
    <LayoutWrapper>
      <p>Player Profile: {steamAccount.name}</p>
    </LayoutWrapper>
  );
}

export async function getServerSideProps(context) {
  const steamId = context.params.steamId;
  const res = await fetchStratz("Player/", steamId);

  return {
    props: {
      playerData: res.data,
    }, // will be passed to the page component as props
  };
}

export default PlayerProfile;
