import { useState, useEffect } from "react";
import Link from "next/link";
import { uid } from "react-uid";
import { formatDistanceToNow } from "date-fns";

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
    <div className="h-full px-2 flex items-center justify-center w-28">
      <span className="px-1 font-bold">{player.numKills}</span>
      <span className="px-1 font-bold">/</span>
      <span className="px-1 font-bold">{player.numDeaths}</span>
      <span className="px-1 font-bold">/</span>
      <span className="px-1 font-bold">{player.numAssists}</span>
    </div>
  );
};

const MatchRowTime = ({ match }) => {
  const { durationSeconds, endDateTime } = match;
  const durationFormatted = new Date(durationSeconds * 1000)
    .toISOString()
    .substr(14, 5);
  const timeAgo = formatDistanceToNow(new Date(endDateTime * 1000), {
    addSuffix: true,
  });
  return (
    <div className="h-full px-2 flex flex-col items-end">
      <span className="px-1 font-bold">{durationFormatted}</span>
      <span className="text-xs">{timeAgo.replace("about", "").trim()}</span>
    </div>
  );
};

const MatchRowImpact = ({ impact }) => {
  return (
    <div className="h-full px-2 flex items-center w-40">
      <span className="px-1 font-bold mr-1 text-right" style={{width: '4ch'}}>
        {impact > 0 ? `+${impact}` : impact}
      </span>
      <div className="w-24">
        <div className="h-2 relative bg-gray-300 bg-opacity-25 w-full rounded">
          {impact > 0 ? (
            <div
              style={{ width: `${impact}%` }}
              className="absolute left-1/2 translate-x-px bg-green-500 rounded-r h-full"
            ></div>
          ) : (
            <div
              style={{ width: `${Math.abs(impact)}%` }}
              className="absolute right-1/2 translate-x-px bg-red-500 rounded-l h-full"
            ></div>
          )}
          <div className="w-2px absolute left-1/2 translate-x-px bg-white h-full"></div>
        </div>
      </div>
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
        <MatchRowImpact impact={player.imp} />
        <MatchRowTime match={match} />
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
