import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'elixir',
    label: 'elixir',
    value: 279,
    color: 'hsl(141, 70%, 50%)',
  },
  {
    id: 'php',
    label: 'php',
    value: 428,
    color: 'hsl(136, 70%, 50%)',
  },
  {
    id: 'python',
    label: 'python',
    value: 451,
    color: 'hsl(35, 70%, 50%)',
  },
  {
    id: 'javascript',
    label: 'javascript',
    value: 550,
    color: 'hsl(194, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 404,
    color: 'hsl(132, 70%, 50%)',
  },
];

const MyResponsivePie = ({
  /* see data tab */
  data,
}) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    sortByValue={true}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor='#333333'
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 2]],
    }}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsivePie;
