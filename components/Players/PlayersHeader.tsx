import {
  Avatar,
  Container,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react';
import Wrapper from '@components/Layout/Wrapper';

import { Player_player } from '../../types/Player';

interface PlayersHeaderProps {
  steamId: string;
  player: Player_player;
}

const calculateWinPercentage = (winCount: number, matchCount: number) => {
  return ((winCount / matchCount) * 100).toFixed(0);
};

const PlayerStats = ({ winCount, matchCount }) => {
  return (
    <Flex>
      <Stat>
        <StatLabel>Matches</StatLabel>
        <StatNumber>{matchCount}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Win rate</StatLabel>
        <StatNumber>{calculateWinPercentage(winCount, matchCount)}%</StatNumber>
      </Stat>
    </Flex>
  );
};

const PlayersHeader: React.FC<PlayersHeaderProps> = ({ steamId, player }) => {
  const { steamAccount, winCount, matchCount } = player;
  const avatarPath: string = process.env.NEXT_PUBLIC_AVATAR_PATH + steamAccount.avatar;

  return (
    <Wrapper>
      <Flex>
        <Avatar src={avatarPath} name={`${steamAccount.name}'s avatar`} size="xl" mr="2" />
        <Flex direction="column" w="full">
          <Container>
            <Heading as="h2" size="xl">
              {steamAccount.name}
            </Heading>
            <Text></Text>
          </Container>
          <Spacer />
          <Container>
            <PlayerStats winCount={winCount} matchCount={matchCount} />
          </Container>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default PlayersHeader;
