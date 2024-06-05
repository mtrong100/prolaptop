import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useGetCategories from "../../hooks/useGetCategories";

const CategoryStatistic = () => {
  const { categories } = useGetCategories();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categories}>
        <XAxis dataKey="name" />
        <YAxis dataKey="productCount" />
        <Tooltip />
        <Bar dataKey="productCount" fill="#B3E2A7" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryStatistic;
