import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <div className="footer__line bg-primary footer__line--1"></div>
        <div className="footer__line bg-secondary footer__line--2"></div>
        <span id="logo">
          Best<h1> Eats</h1>
        </span>
      </div>

      <div className="footer__links flex flex-col gap-12 md:gap-6 md:flex-row items-center md:items-start">
        <div className="footer__links--col w-full md:w-[16rem]">
          <ul className="footer__ul text-center md:text-left">
            <p>About</p>
            <li>COVID-19 Updates</li>
            <li>Catering</li>
            <li>Impact Report</li>
            <li>Newsroom</li>
            <li>Support Local Restaurants</li>
            <li>Our Mission</li>
          </ul>
        </div>
        <div className="footer__links--col w-full md:w-[16rem]">
          <ul className="footer__ul text-center md:text-left">
            <p>More</p>
            <li>Free Stuff</li>
            <li>Gift Cards</li>
            <li>Coupons</li>
            <li>Rewards</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer__links--col w-full md:w-[16rem]">
          <ul className="footer__ul text-center md:text-left">
            <p>Contact</p>
            <li>Email</li>
            <li>Careers</li>
            <li>Our Benefits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
