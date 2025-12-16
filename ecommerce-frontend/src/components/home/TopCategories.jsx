"use client";

import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import axios from "axios";

const TopCategories = () => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/category/allcategory`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="py-24 bg-secondery">
      <Container>
        <SectionTitle title={"Top Categories"} />
        <div className="mt-9 flex justify-between">
          {categories.map((item) => {
            return (
              <div className="text-center">
                <div className="bg-white w-[150px] h-[150px] mx-auto rounded-full overflow-hidden">
                  <img src={item.image} alt="category" className="w-full h-full"/>
                </div>
                <h4 className="text-base mt-4 font-medium text-dark text-wrap">
                  {item.name}
                </h4>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
