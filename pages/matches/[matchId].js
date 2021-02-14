// Layout
import LayoutWrapper from "@components/Layout";
import PlayerDetails from "@components/Player/PlayerProfile";
import RecentMatches from "@components/Player/RecentMatches";

// API Calls
import { fetchStratz } from "@lib/api";

// Components
import GraphNetworth from "@components/Match/GraphNetwork";

function MatchPage({ matchData }) {
  const { players, durationSeconds } = matchData;
  return (
    <LayoutWrapper>
      <div className="py-8 flex flex-row">
        <h1 className="font-bold text-3xl mr-4">
          {matchData.didRadiantWin ? "Radiant Victory" : "Dire Victory"}
        </h1>
      </div>
      <GraphNetworth players={players} matchDuration={durationSeconds} />
    </LayoutWrapper>
  );
}

export async function getServerSideProps(context) {
  const matchId = context.params.matchId;
  const resMatchData = await fetchStratz(`match/${matchId}/breakdown`);

  return {
    props: {
      matchData: resMatchData.data,
    }, // will be passed to the page component as props
  };
}

export default MatchPage;
