import { useState, useEffect } from "react";
import Link from "next/link";
import { uid } from "react-uid";

// Components
import Loading from "@components/Loading";

// Lib
import { fetchStratz } from "@lib/api";

// Constants
import heroJson from "@constants/heroes.json";

const HERO_IMAGE_PATH = "https://steamcdn-a.akamaihd.net";

const MatchRowHero = ({ heroId }) => {
  const heroData = heroJson[heroId];

  return (
    <div className="h-full px-2">
      <img
        className="h-full rounded"
        src={`${HERO_IMAGE_PATH}${heroData.img}`}
      />
    </div>
  );
};

const MatchRowWinLoss = ({ isVictory }) => {
  return (
    <div className="h-full px-2 flex items-center">
      {isVictory ? (
        <span className="bg-green-500 rounded py-1 block w-8 text-center font-bold">
          W
        </span>
      ) : (
        <span className="bg-red-500 rounded py-1 block w-8 text-center font-bold">
          L
        </span>
      )}
    </div>
  );
};

const MatchRowStats = ({ player }) => {
  return (
    <div className="h-full px-2 flex items-center">
      <span className="px-1 font-bold">{player.numKills}</span>
      <span className="px-1 font-bold">/</span>
      <span className="px-1 font-bold">{player.numDeaths}</span>
      <span className="px-1 font-bold">/</span>
      <span className="px-1 font-bold">{player.numAssists}</span>
    </div>
  );
};

const MatchRow = ({ match }) => {
  const player = match.players[0];
  return (
    <Link href={`/matches/${match.id}`}>
      <a className="rounded flex-grow h-14 mb-2 flex items-center py-2 bg-black bg-opacity-20 hover:bg-opacity-50">
        <MatchRowHero heroId={player.heroId} />
        <MatchRowWinLoss isVictory={player.isVictory} />
        <MatchRowStats player={player} />
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
