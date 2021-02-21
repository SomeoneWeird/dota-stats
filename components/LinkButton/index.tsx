import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { ElementType } from 'react';
import { IconType } from 'recharts/types/component/DefaultLegendContent';

interface LinkButtonProps {
  href: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: IconType | any;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, text, icon }) => {
  return (
    <Link
      href={href}
      sx={{
        outline: 'none',
        borderWidth: '1px',
        borderColor: 'gray.200',
        borderRadius: 'md',
        paddingLeft: '4',
        paddingRight: '4',
        display: 'flex',
        alignItems: 'center',
        minH: '32px',
        color: 'gray.700',
        _hover: {
          background: 'gray.200'
        }
      }}>
      <Flex alignItems="center">
        {icon ? <Icon as={icon} /> : null}
        <Text ml="2">{text}</Text>
      </Flex>
    </Link>
  );
};

export default LinkButton;
