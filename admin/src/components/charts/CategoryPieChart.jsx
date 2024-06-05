import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useGetCategories from "../../hooks/useGetCategories";

const CategoryPieChart = () => {
  const { categories } = useGetCategories();
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088aa",
    "#615EFC",
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={categories}
          dataKey="productCount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, productCount }) => `${name}: ${productCount}`}
        >
          {categories.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
