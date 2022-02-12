// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'japan',
    color: 'hsl(63, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 25,
      },
      {
        x: 'helicopter',
        y: 194,
      },
      {
        x: 'boat',
        y: 135,
      },
      {
        x: 'train',
        y: 63,
      },
      {
        x: 'subway',
        y: 106,
      },
      {
        x: 'bus',
        y: 205,
      },
      {
        x: 'car',
        y: 206,
      },
      {
        x: 'moto',
        y: 282,
      },
      {
        x: 'bicycle',
        y: 111,
      },
      {
        x: 'horse',
        y: 296,
      },
      {
        x: 'skateboard',
        y: 200,
      },
      {
        x: 'others',
        y: 152,
      },
    ],
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Chart = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=' >-.2f'
    axisTop={null}
    axisRight={null}
    height={300}
    enableGridX={false}
    enableGridY={false}
    curve='monotoneX'
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    enableArea={true}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    pointSize={10}
    borderColor='red'
    colors={['red']}
    strokeWidth={0}
    enablePoints={false}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
export default Chart;
