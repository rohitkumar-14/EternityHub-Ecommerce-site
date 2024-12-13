import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to <b className="text-gray-800">EternityHub</b>, where
            fashion meets timeless elegance. We are more than an e-commerce
            site; we are a hub for individuals who value style, quality, and
            sustainability. At EternityHub, we believe fashion should empower
            and inspire, offering a blend of classic and contemporary designs.
          </p>
          <p>
            Our journey began with a mission to redefine online fashion
            shopping. From curated collections to a seamless shopping
            experience, EternityHub caters to all your fashion needs with a
            touch of luxury and affordability. Step into a world where your
            wardrobe reflects your personality, effortlessly.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At EternityHub, our mission is simple yet profound: to make fashion
            accessible, sustainable, and innovative. We are committed to
            offering premium-quality apparel while ensuring ethical practices
            and minimizing environmental impact. Fashion is not just about what
            you wear; it's about the story behind it.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">
              We prioritize quality in every thread and detail. From premium
              fabrics to expert craftsmanship, each piece at EternityHub
              undergoes rigorous quality checks to ensure you receive nothing
              but the best.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className="text-gray-600">
              Shop with ease and confidence. Our user-friendly interface,
              detailed product descriptions, and efficient delivery services are
              designed to make your online shopping experience smooth and
              enjoyable.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              At EternityHub, you are at the heart of everything we do. Our
              dedicated customer service team is here to assist you every step
              of the way, ensuring a personalized and hassle-free experience.
            </p>
          </div>
        </div>
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
