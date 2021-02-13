import { useState, useEffect } from "react";
import Link from "next/link";
import { uid } from "react-uid";

// Components
import Loading from "@components/Loading";

// Lib
import { fetchStratz } from "@lib/api";

const MatchRowHero = ({ heroId }) => {
  return (
    <div className="h-full px-2">
      <img
        className="h-full rounded"
        src="https://cdn.stratz.com/images/dota2/heroes/nyx_assassin_horz.png"
      />
    </div>
  );
};

const MatchRow = ({ match }) => {
  return (
    <Link href={`/matches/${match.id}`}>
      <a className="rounded flex-grow h-14 mb-2 flex items-center py-2 bg-black bg-opacity-20">
        <MatchRowHero />
      </a>
    </Link>
  );
};

const MatchList = ({ matchData }) => {
  return (
    <div className="flex flex-col">
      {matchData.map((match) => (
        <MatchRow match={match} key={uid(match.id)} />
      ))}
    </div>
  );
};

const RecentMatches = ({ steamId }) => {
  const [matchData, setMatchData] = useState({ loading: false, data: [] });

  useEffect(() => {
    const fetchRecentMatches = async () => {
      setMatchData({ ...matchData, loading: true });
      const resRecentMatches = await fetchStratz(`Player/${steamId}/matches`);
      setMatchData({
        ...matchData,
        loading: false,
        data: resRecentMatches.data,
      });
    };
    fetchRecentMatches();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl mb-8 w-full">Recent Matches</h2>
      <div className="w-full">
        {!matchData.data.length || matchData.loading ? (
          <Loading />
        ) : (
          <MatchList matchData={matchData.data} />
        )}
      </div>
    </div>
  );
};

export default RecentMatches;
