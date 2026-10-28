const palette = {
  sky: '#9edbd5',
  cloud: '#e8f1d3',
  horizon: '#83beab',
  farGrass: '#aac998',
  grass: '#a9c57e',
  grassLight: '#b9cf8c',
  grassDark: '#93af68',
  leaf: '#668957',
  leafLight: '#86a76a',
  leafDark: '#4f7150',
  ink: '#3d574b',
  cream: '#f0e4bb',
  creamShade: '#d6cc9f',
  gold: '#ebd598',
  goldShade: '#c7b57f',
  blue: '#80b5b0',
  blueDark: '#5b8585',
  coral: '#c47c5e',
  coralLight: '#dfa17a',
};

function PixelCloud({ x, y, wide = false }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'} fill={palette.cloud}>
      <rect x={12} y={0} width={24} height={6} />
      <rect x={6} y={6} width={wide ? 60 : 42} height={6} />
      <rect x={0} y={12} width={wide ? 78 : 60} height={6} />
      <rect x={6} y={18} width={wide ? 66 : 48} height={4} />
    </g>
  );
}

function PixelTree({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={4} y={44} width={36} height={4} fill={palette.grassDark} />
      <rect x={17} y={28} width={8} height={20} fill={palette.ink} />
      <rect x={17} y={29} width={4} height={13} fill="#72815a" />
      <g fill={palette.leafDark}>
        <rect x={12} y={0} width={20} height={4} />
        <rect x={4} y={4} width={36} height={8} />
        <rect x={0} y={12} width={44} height={20} />
        <rect x={4} y={32} width={36} height={4} />
      </g>
      <g fill={palette.leaf}>
        <rect x={8} y={8} width={28} height={4} />
        <rect x={4} y={12} width={36} height={16} />
      </g>
      <g fill={palette.leafLight}>
        <rect x={12} y={4} width={16} height={4} />
        <rect x={8} y={8} width={16} height={8} />
        <rect x={4} y={16} width={8} height={4} />
        <rect x={28} y={12} width={4} height={4} />
      </g>
    </g>
  );
}

function PixelShrub({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={4} y={0} width={12} height={4} fill={palette.leafLight} />
      <rect x={0} y={4} width={24} height={12} fill={palette.leaf} />
      <rect x={4} y={4} width={12} height={4} fill={palette.leafLight} />
      <rect x={4} y={16} width={20} height={4} fill={palette.leafDark} />
    </g>
  );
}

const flagDigits = {
  1: ['010', '110', '010', '010', '111'],
  2: ['111', '001', '111', '100', '111'],
  3: ['111', '001', '111', '001', '111'],
};

function PixelFlag({ x, y, number }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={0} y={0} width={4} height={58} fill={palette.ink} />
      <rect x={4} y={2} width={28} height={20} fill={palette.goldShade} />
      <rect x={4} y={0} width={24} height={18} fill={palette.gold} />
      <rect x={28} y={4} width={4} height={10} fill={palette.gold} />
      <rect x={-4} y={56} width={12} height={4} fill={palette.grassDark} />
      {flagDigits[number].flatMap((row, rowIndex) => row.split('').map((pixel, columnIndex) => (
        pixel === '1'
          ? <rect key={rowIndex + '-' + columnIndex} x={12 + columnIndex * 2} y={4 + rowIndex * 2} width={2} height={2} fill={palette.ink} />
          : null
      )))}
    </g>
  );
}

function BaseLaboratory({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={4} y={82} width={116} height={6} fill={palette.grassDark} />
      <rect x={8} y={30} width={96} height={50} fill={palette.ink} />
      <rect x={12} y={34} width={88} height={42} fill={palette.cream} />
      <rect x={12} y={70} width={88} height={6} fill={palette.creamShade} />
      <rect x={4} y={78} width={104} height={6} fill={palette.ink} />
      <rect x={8} y={78} width={96} height={2} fill={palette.creamShade} />
      <rect x={82} y={2} width={12} height={24} fill={palette.ink} />
      <rect x={82} y={2} width={16} height={6} fill={palette.ink} />
      <rect x={86} y={8} width={4} height={10} fill={palette.coralLight} />
      <g fill={palette.ink}>
        <rect x={0} y={26} width={112} height={8} />
        <rect x={8} y={18} width={96} height={8} />
        <rect x={20} y={10} width={72} height={8} />
        <rect x={32} y={2} width={48} height={8} />
      </g>
      <g fill={palette.coral}>
        <rect x={8} y={26} width={96} height={4} />
        <rect x={16} y={18} width={80} height={8} />
        <rect x={28} y={10} width={56} height={8} />
      </g>
      <rect x={36} y={6} width={40} height={4} fill={palette.coralLight} />
      <rect x={24} y={14} width={24} height={4} fill={palette.coralLight} />
      <rect x={46} y={50} width={22} height={28} fill={palette.ink} />
      <rect x={50} y={54} width={14} height={24} fill={palette.blue} />
      <rect x={60} y={66} width={3} height={3} fill={palette.gold} />
      {[20, 78].map(windowX => (
        <g key={windowX}>
          <rect x={windowX} y={42} width={16} height={18} fill={palette.ink} />
          <rect x={windowX + 4} y={46} width={8} height={10} fill={palette.blue} />
          <rect x={windowX + 4} y={46} width={4} height={4} fill="#c7e4d5" />
        </g>
      ))}
      <rect x={45} y={34} width={24} height={12} fill={palette.creamShade} />
      <g fill={palette.ink}>
        <rect x={54} y={36} width={6} height={4} />
        <rect x={52} y={40} width={10} height={4} />
      </g>
      <rect x={54} y={41} width={6} height={2} fill={palette.blue} />
    </g>
  );
}

function CalorimeterStation({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={0} y={92} width={128} height={6} fill={palette.grassDark} />
      <rect x={8} y={36} width={112} height={52} fill={palette.ink} />
      <rect x={12} y={40} width={104} height={44} fill={palette.cream} />
      <rect x={12} y={78} width={104} height={6} fill={palette.creamShade} />
      <rect x={4} y={28} width={120} height={12} fill={palette.ink} />
      <rect x={8} y={28} width={112} height={6} fill={palette.blueDark} />
      <rect x={12} y={28} width={104} height={2} fill={palette.blue} />
      <rect x={4} y={86} width={120} height={8} fill={palette.ink} />
      <rect x={8} y={86} width={112} height={4} fill={palette.creamShade} />
      <rect x={78} y={52} width={24} height={34} fill={palette.ink} />
      <rect x={82} y={56} width={16} height={30} fill={palette.blue} />
      <rect x={92} y={72} width={3} height={3} fill={palette.gold} />
      <rect x={20} y={12} width={48} height={64} fill={palette.ink} />
      <rect x={24} y={16} width={40} height={56} fill="#d9e5ca" />
      <rect x={28} y={20} width={6} height={44} fill="#eff0d4" />
      <rect x={24} y={54} width={40} height={18} fill={palette.blueDark} />
      <rect x={24} y={54} width={40} height={4} fill={palette.blue} />
      <rect x={16} y={8} width={56} height={8} fill={palette.ink} />
      <rect x={20} y={8} width={48} height={4} fill={palette.creamShade} />
      <rect x={42} y={0} width={8} height={44} fill={palette.ink} />
      <rect x={44} y={4} width={4} height={40} fill={palette.coralLight} />
      <rect x={38} y={40} width={16} height={12} fill={palette.ink} />
      <rect x={42} y={42} width={8} height={6} fill={palette.coral} />
      <g fill={palette.ink}>
        <rect x={54} y={24} width={6} height={2} />
        <rect x={56} y={32} width={4} height={2} />
        <rect x={54} y={40} width={6} height={2} />
      </g>
    </g>
  );
}

function EnergyLaboratory({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={0} y={100} width={128} height={6} fill={palette.grassDark} />
      <g fill={palette.ink}>
        <rect x={8} y={26} width={108} height={72} />
        <rect x={8} y={4} width={28} height={32} />
        <rect x={88} y={12} width={28} height={24} />
        <rect x={32} y={20} width={56} height={12} />
      </g>
      <rect x={12} y={30} width={100} height={64} fill={palette.cream} />
      <rect x={12} y={8} width={20} height={22} fill={palette.creamShade} />
      <rect x={92} y={16} width={20} height={16} fill={palette.creamShade} />
      <rect x={36} y={24} width={48} height={4} fill={palette.gold} />
      <rect x={12} y={88} width={100} height={6} fill={palette.creamShade} />
      <rect x={16} y={12} width={8} height={12} fill={palette.blueDark} />
      <rect x={96} y={20} width={8} height={8} fill={palette.blueDark} />
      {[22, 80].map(windowX => (
        <g key={windowX}>
          <rect x={windowX} y={44} width={20} height={18} fill={palette.ink} />
          <rect x={windowX + 4} y={48} width={12} height={10} fill={palette.blue} />
          <rect x={windowX + 4} y={48} width={4} height={4} fill="#c7e4d5" />
        </g>
      ))}
      <rect x={46} y={38} width={28} height={32} fill={palette.ink} />
      <g fill={palette.gold}>
        <rect x={58} y={42} width={10} height={4} />
        <rect x={54} y={46} width={10} height={4} />
        <rect x={50} y={50} width={16} height={4} />
        <rect x={58} y={54} width={6} height={4} />
        <rect x={54} y={58} width={6} height={4} />
        <rect x={50} y={62} width={6} height={4} />
      </g>
      <rect x={48} y={76} width={28} height={22} fill={palette.ink} />
      <rect x={52} y={80} width={20} height={18} fill={palette.blueDark} />
      <rect x={60} y={80} width={4} height={18} fill={palette.creamShade} />
      <rect x={4} y={96} width={116} height={6} fill={palette.ink} />
      <rect x={8} y={96} width={108} height={2} fill={palette.creamShade} />
    </g>
  );
}

function PixelScientist({ x, y }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <rect x={2} y={46} width={32} height={4} fill={palette.grassDark} />
      <g fill={palette.ink}>
        <rect x={8} y={0} width={16} height={4} />
        <rect x={4} y={4} width={24} height={16} />
        <rect x={8} y={20} width={16} height={4} />
        <rect x={4} y={24} width={24} height={16} />
        <rect x={8} y={40} width={6} height={8} />
        <rect x={18} y={40} width={6} height={8} />
        <rect x={4} y={46} width={10} height={4} />
        <rect x={18} y={46} width={12} height={4} />
      </g>
      <rect x={8} y={6} width={16} height={12} fill="#e6be91" />
      <rect x={6} y={8} width={20} height={6} fill={palette.ink} />
      <rect x={8} y={9} width={6} height={3} fill="#bddfd6" />
      <rect x={18} y={9} width={6} height={3} fill="#bddfd6" />
      <rect x={8} y={24} width={16} height={14} fill="#f4f0d7" />
      <rect x={14} y={24} width={4} height={12} fill={palette.blueDark} />
      <rect x={20} y={28} width={4} height={4} fill={palette.blue} />
      <rect x={0} y={28} width={4} height={8} fill="#e6be91" />
      <rect x={28} y={28} width={4} height={8} fill="#e6be91" />
    </g>
  );
}

const pathEdges = [
  [144, 166, 24, 48], [144, 190, 182, 24], [302, 190, 24, 42],
  [302, 208, 180, 24], [458, 168, 24, 64], [458, 196, 188, 24],
  [622, 178, 24, 42], [622, 178, 166, 24], [764, 160, 24, 42],
];
const pathCenters = [
  [148, 170, 16, 40], [148, 194, 174, 16], [306, 194, 16, 34],
  [306, 212, 172, 16], [462, 172, 16, 56], [462, 200, 180, 16],
  [626, 182, 16, 34], [626, 182, 158, 16], [768, 164, 16, 34],
];
const pathStones = [
  [152, 181], [190, 200], [222, 200], [254, 200], [286, 200],
  [312, 215], [344, 218], [376, 218], [408, 218], [440, 218],
  [468, 188], [504, 206], [538, 206], [572, 206], [606, 206],
  [632, 192], [666, 188], [700, 188], [734, 188], [772, 172],
];
const grassMarks = [
  [24, 163], [72, 185], [94, 228], [172, 243], [234, 136],
  [278, 174], [352, 132], [370, 250], [394, 186], [506, 242],
  [574, 156], [600, 242], [664, 230], [696, 147], [746, 236],
  [810, 214], [866, 181], [876, 238],
];

export default function PixelJourneyScene({ className = 'journey-scene' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 270"
      width={900}
      height={270}
      className={className}
      shapeRendering="crispEdges"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <rect width={900} height={270} fill={palette.sky} />
      <PixelCloud x={70} y={28} wide />
      <PixelCloud x={352} y={18} />
      <PixelCloud x={606} y={38} wide />
      <PixelCloud x={808} y={20} />

      <g fill={palette.horizon}>
        <rect x={0} y={96} width={40} height={34} />
        <rect x={40} y={78} width={32} height={52} />
        <rect x={72} y={66} width={28} height={64} />
        <rect x={100} y={86} width={58} height={44} />
        <rect x={158} y={104} width={46} height={26} />
        <rect x={204} y={86} width={58} height={44} />
        <rect x={262} y={72} width={38} height={58} />
        <rect x={300} y={94} width={46} height={36} />
        <rect x={346} y={78} width={28} height={52} />
        <rect x={374} y={56} width={38} height={74} />
        <rect x={412} y={82} width={36} height={48} />
        <rect x={448} y={102} width={72} height={28} />
        <rect x={520} y={86} width={46} height={44} />
        <rect x={566} y={70} width={34} height={60} />
        <rect x={600} y={94} width={54} height={36} />
        <rect x={654} y={80} width={48} height={50} />
        <rect x={702} y={96} width={66} height={34} />
        <rect x={768} y={86} width={48} height={44} />
        <rect x={816} y={68} width={38} height={62} />
        <rect x={854} y={96} width={46} height={34} />
      </g>
      <g fill={palette.farGrass}>
        <rect x={0} y={124} width={900} height={30} />
        <rect x={44} y={114} width={148} height={16} />
        <rect x={244} y={120} width={108} height={18} />
        <rect x={474} y={112} width={138} height={20} />
        <rect x={678} y={118} width={178} height={20} />
      </g>
      <rect x={0} y={140} width={900} height={130} fill={palette.grass} />
      <g fill={palette.grassLight}>
        <rect x={0} y={140} width={280} height={12} />
        <rect x={0} y={152} width={108} height={8} />
        <rect x={360} y={140} width={252} height={12} />
        <rect x={536} y={152} width={76} height={8} />
        <rect x={716} y={140} width={184} height={16} />
      </g>
      <g fill={palette.grassDark}>
        {grassMarks.map(([x, y]) => (
          <g key={x + '-' + y}>
            <rect x={x} y={y} width={8} height={3} />
            <rect x={x + 10} y={y - 4} width={4} height={3} />
          </g>
        ))}
      </g>

      <PixelTree x={28} y={100} />
      <PixelTree x={264} y={104} />
      <PixelTree x={566} y={94} />
      <PixelTree x={850} y={112} />
      <PixelShrub x={354} y={160} />
      <PixelShrub x={666} y={134} />

      <g fill={palette.grassDark}>
        {pathEdges.map(([x, y, width, height]) => <rect key={[x, y, width, height].join('-')} x={x} y={y} width={width} height={height} />)}
      </g>
      <g fill={palette.gold}>
        {pathCenters.map(([x, y, width, height]) => <rect key={[x, y, width, height].join('-')} x={x} y={y} width={width} height={height} />)}
      </g>
      <g fill={palette.goldShade}>
        {pathStones.map(([x, y]) => <rect key={x + '-' + y} x={x} y={y} width={4} height={3} />)}
      </g>

      <BaseLaboratory x={102} y={90} />
      <CalorimeterStation x={380} y={82} />
      <EnergyLaboratory x={714} y={72} />
      <PixelFlag x={224} y={96} number={1} />
      <PixelFlag x={530} y={98} number={2} />
      <PixelFlag x={842} y={62} number={3} />
      <PixelScientist x={208} y={153} />

      <PixelTree x={22} y={208} />
      <PixelTree x={244} y={214} />
      <PixelTree x={544} y={220} />
      <PixelTree x={830} y={210} />
      <PixelShrub x={104} y={240} />
      <PixelShrub x={688} y={238} />
      <g fill={palette.gold}>
        <rect x={82} y={212} width={4} height={4} />
        <rect x={80} y={216} width={8} height={4} />
        <rect x={366} y={188} width={4} height={4} />
        <rect x={364} y={192} width={8} height={4} />
        <rect x={602} y={170} width={4} height={4} />
        <rect x={600} y={174} width={8} height={4} />
        <rect x={738} y={244} width={4} height={4} />
        <rect x={736} y={248} width={8} height={4} />
      </g>
      <g fill={palette.leaf}>
        <rect x={84} y={220} width={2} height={6} />
        <rect x={368} y={196} width={2} height={6} />
        <rect x={604} y={178} width={2} height={6} />
        <rect x={740} y={252} width={2} height={6} />
      </g>
      <rect x={0} y={266} width={900} height={4} fill={palette.leafDark} />
    </svg>
  );
}
