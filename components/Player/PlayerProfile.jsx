// Components
import { PillSingle, PillDouble } from "@components/Pills";

// Icons
import { SiSteam } from "react-icons/si";

const AVATAR_PATH =
  "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/";
const BEHAVIOUR_MAX = 10000;

const PlayerAvatar = ({ path }) => (
  <img className="rounded w-24" src={`${AVATAR_PATH}${path}`} />
);
const PlayerProfile = ({ playerData }) => {
  const { steamAccount, winCount, matchCount, behaviorScore } = playerData;
  const winRate = ((winCount / matchCount) * 100).toFixed(2);
  const behaviorScorePercent = (
    (behaviorScore / BEHAVIOUR_MAX) *
    100
  ).toFixed();
  return (
    <div className="py-8 flex flex-row">
      <div className="mr-4 flex-2">
        <PlayerAvatar path={steamAccount.avatar} />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex">
          <h1 className="font-bold text-3xl mr-4">{steamAccount.name}</h1>
          <a
            href={steamAccount.profileUri}
            className="text-base flex justify-end items-end pb-2"
          >
            <SiSteam />
          </a>
        </div>

        <div className="flex">
          <PillDouble left={`Total Matches: `} right={matchCount} />
          <PillDouble left={`Win rate: `} right={`${winRate}%`} />
          <PillDouble left={`Conduct: `} right={`${behaviorScorePercent}%`} />
        </div>
      </div>
      <div className="flex-2"></div>
    </div>
  );
};

export default PlayerProfile;
