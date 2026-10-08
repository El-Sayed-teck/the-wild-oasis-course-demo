import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
  
`;


const startDataLight = [
  {
    duration: "1 night", // this is the name key in the pie chart
    value: 0, // this is the data key in the pie chart
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    //value: 3, // to test
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    //value: 5, // to test
    color: "#eab308",
  },
  {
    duration: "4-5 nights", // this is the name key
    value: 0, // this is the data key
    //value: 4, // to test // this is the data key
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    //value: 7, // to test
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    //value: 2, // to test
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({confirmedStays}) {
  /*this compo will receive the confirmedStays,
  as an input */

  /*first let's get the info whether we are in a dark-mode or light-mode */
  const {isDarkMode} = useDarkMode()
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays)

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summery</Heading>
      <ResponsiveContainer width="100%" height={240}>
       
        <PieChart>
          
          <Pie data={data} 
            nameKey="duration"  
            dataKey="value"
            /*we can define some sizes like inner and outer radius */
            innerRadius='60%' // raggio della circonferenza interna
            outerRadius='80%' // raggio della circonferenza esterna
            cx="40%"    // defining the position of the center, cx for the x coord of the center 
            cy="50%" // cy for the y coord of center
            paddingAngle={3}  // defining somespace between the pie segments/cells, here it's 3 degs
            >
           
            {data.map(entry => <Cell fill={entry.color} 
                stroke={entry.color} key={entry.duration} />)}
            </Pie>
            <Tooltip />
            {/*we also want a legend so that we know
             what each of these colors represent,
             and use verticalAligh to change it's position */}
            <Legend 
              verticalAlign="middle"
              align="right"
              layout="vertical"
              width="40%"
              //iconSize='1.5rem'
              iconSize={15}
              iconType="circle"
             /> 
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default DurationChart
