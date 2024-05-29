import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryStatistic = ({ results = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Calculate product counts per category
    const categoryCounts = {};
    results.forEach((product) => {
      const categoryName = product.category;
      if (categoryCounts[categoryName]) {
        categoryCounts[categoryName] += 1;
      } else {
        categoryCounts[categoryName] = 1;
      }
    });

    // Format the data for the chart
    const formattedData = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        category,
        count,
      })
    );

    setData(formattedData);
  }, [results]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryStatistic;
