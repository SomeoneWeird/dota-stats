import { Guild, SteamAccount } from '../../types';

interface PlayersHeaderProps {
  steamAccount: SteamAccount;
  steamId: number;
  guild: Guild;
}

const PlayersHeader: React.FC<PlayersHeaderProps> = ({ steamAccount, steamId, guild }) => {
  const avatarPath: string = process.env.NEXT_PUBLIC_AVATAR_PATH + steamAccount.avatar;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img
          className="h-auto w-32 rounded"
          src={avatarPath}
          alt={`${steamAccount.name}'s avatar`}
        />
      </div>
      <div className="something">
        <h1 className="">
          {steamAccount.name} <span>[{guild.tag}]</span>
        </h1>
      </div>
    </div>
  );
};

export default PlayersHeader;
