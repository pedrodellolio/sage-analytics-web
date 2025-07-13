import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Saúde",
    value: 500,
  },
  {
    name: "Mercado",
    value: 3000,
  },
  {
    name: "Alimentação",
    value: 4000,
  },
  {
    name: "Casa",
    value: 300,
  },
  {
    name: "Pets",
    value: 2000,
  },
];

const COLORS = ["#d46b20", "#396d27", "#2767ac", "#ac4627", "#aca427"];

export function CategoriesSummaryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          labelLine={false}
          label={renderLabel}
          stroke="var(--card)"
          animationDuration={0}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          <Legend iconType="square" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--muted-foreground)"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
