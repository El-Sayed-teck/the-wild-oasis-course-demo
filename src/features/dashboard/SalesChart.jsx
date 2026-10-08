import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({bookings, numDays}) {

  const {isDarkMode} = useDarkMode()
  
  const allDates = eachDayOfInterval({
   
    start: subDays(new Date(), numDays - 1), // we made -1 to correctly calculate and get 7 days exaclty
    end: new Date(), // this gonna be today
  }) 
  
  const data = allDates.map(date => {
    return {
     
      label: format(date, "MMM dd"),
    
      totalSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))
        )
      
      .reduce((acc, cur) => acc + cur.totalPrice, 0), // this is the totalSales for this day

      /*and this the extraSales for thsi day which is gonna be the same at totalPrice */
      extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))
        ).reduce((acc, cur) => acc + cur.estraPrice, 0),
    };
  })
  //console.log(data)

  const colors = isDarkMode 
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };


  return (
    <StyledSalesChart>
      <Heading as="h2">Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash; {format(allDates.at(-1), "MMM dd yyyy")}</Heading>
      <ResponsiveContainer height={300} width="100%">        

       
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{fill: colors.text}} tickLine={colors.text}/>
          <YAxis unit="$" tick={{fill: colors.text}} tickLine={colors.text}/>

          
          <CartesianGrid strokeDasharray="4"/>
            <Tooltip contentStyle={{backgroundColor: colors.background}} />

       
        <Area
          dataKey="totalSales" 
          type="monotone" 
          //stroke="red" 
          stroke={colors.totalSales.stroke} // colors for darkmode
          //fill="orange" 
          fill={colors.totalSales.fill}
          strokeWidth={2} // we can change the stroke width
          name="Total sales" // adding the name that is gonna appear on the tooltip 
          unit="$" // unit symbol to style the numbers
          /> 
          {/*we can specify some props, like type""monotone" so just one color,
          stroke for stroke coloe and fill for fill color */}

          {/*another area chart for extras sales,
          and also the second position for the tooltip */}
        <Area
          dataKey="extrasSales" 
          type="monotone" 
          stroke={colors.extrasSales.stroke}
          fill={colors.extrasSales.fill}
          strokeWidth={2} 
          name="Extras sales" 
          unit="$"
          /> 
        
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
