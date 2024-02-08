'use client'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

// Custom colors for the pie slices
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const PieRechart = ({ users, works }) => {
  const data = [
    { name: 'Użytkownicy', value: users },
    { name: 'Posty', value: works },
    { name: 'Wyświetlenia', value: 50 },
  ]
  return (
    <div
      style={{ width: '100%', height: 300 }}
      className=" md:block scale-75 md:scale-100 -mt-14 md:-mt-0 pointer-events-none w-28"
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            fill="#8884d8"
            innerRadius={60}
            outerRadius={90}
            stroke="#020617"
            strokeOpacity={3}
            strokeWidth={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className=" flex justify-center flex-wrap gap-5 w-[90%] mx-auto my-auto md:-mt-6 ">
        {data.map((item, index) => (
          <div className="flex flex-col justify-center items-center">
            <div className={` border-b border-[${colors[index]}] `}>
              {item.name}
            </div>
            <div className="">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieRechart
