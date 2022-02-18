import { ResponsivePie } from '@nivo/pie';

const MyResponsivePie = ({
  /* see data tab */
  data,
}) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 50, bottom: 120, left: 50 }}
    innerRadius={0.5}
    padAngle={2}
    colors={{ datum: 'data.color' }}
    cornerRadius={1}
    activeOuterRadiusOffset={8}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLinkLabelsTextColor={{ from: 'color' }}
    sortByValue={false}
    borderWidth={0}
    innerRadius={0.7}
    enableArcLinkLabels={false}
    theme={{
      tooltip: {
        container: {
          background: 'white',
          color: '#5046e5',
        },
      },
    }}
    arcLabelsSkipAngle={10}
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
