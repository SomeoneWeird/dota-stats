import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { uid } from "react-uid";

// Constants
import heroJson from "@constants/heroes.json";
import playerColoursJson from "@constants/playerColors.json";

const formatGraphTime = (minutes) => `${minutes}:00`;

const buildGraphData = (players, matchDuration) => {
  const graphData = [];

  players[0].stats.networth.map((player, index) => {
    if (index <= Math.floor(matchDuration / 60)) {
      const obj = { time: formatGraphTime(index) };

      players.map((player) => {
        const hero = heroJson[player.heroId];
        obj[hero.localized_name] = player.stats.networth[index];
      });
      graphData.push(obj);
    }
  });

  return graphData;
};

const GraphNetworth = ({ players, matchDuration }) => {
  const graphData = buildGraphData(players, matchDuration);

  return (
    <div className="bg-black bg-opacity-25 shadow rounded w-full p-2">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Tooltip />
          {players.map((player, index) => (
            <Line
              type="monotone"
              dataKey={heroJson[player.heroId].localized_name}
              stroke={playerColoursJson[player.playerSlot]}
              name={heroJson[player.heroId].localized_name}
              key={uid(player.steamAccountId)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphNetworth;
