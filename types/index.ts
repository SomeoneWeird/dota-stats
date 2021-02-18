export interface SteamAccount {
  avatar?: string;
  // battlepass: [SteamAccountBattlePassType]
  cityId?: number;
  communityVisibleState?: number;
  countryCode?: string;
  id: number;
  isAnonymous?: number;
  isDotaPlusSubscriber?: number;
  isStratzAnonymous?: number;
  lastLogOff?: number;
  lastMatchDateTime?: number;
  lastMatchRegionId?: number;
  name?: string;
  primaryClanId?: number;
  profileUri?: string;
  // proSteamAccount: ProSteamAccountType
  realName?: string;
  seasonLeaderboardDivisionId?: number;
  seasonLeaderboardRank?: number;
  seasonRank?: number;
  smurfFlag?: number;
  stateCode?: string;
  timeCreated?: number;
}

export interface Guild {
  createdDateTime?: number;
  currentPercentile?: number;
  description?: string;
  flags?: number;
  id: number;
  language?: number;
  lastUpdateDateTime?: number;
  logo?: string;
  //matches(skip: number;take: number;): [MatchType]
  memberCount?: number;
  members?: GuildMember[];
  motd?: string;
  name?: string;
  pastWeeklyPercentile?: number;
  pastWeeklyRank?: number;
  pattern?: number;
  points?: number;
  primaryColor?: number;
  rank?: number;
  region?: number;
  requiredRank?: number;
  secondaryColor?: number;
  tag?: string;
  totalBattlePassLevels?: number;
}

export interface GuildMember {
  guildId: number;
  imp: number;
  joinDateTime: number;
  matchCount: number;
  steamAccountId: number;
  winCount: number;
}
