import type { NextPage } from 'next';
import Navbar from './navbar';

const Rules: NextPage = () => (
    <div className="bg min-h-screen h-full w-screen flex flex-col items-center">
      <Navbar />
      <div className="py-20 wrapper text-center h-screen">
        <br/>
        <p className="px-4 fontSizeMedium">These are the rules: <br/> <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem similique ducimus amet sapiente natus nihil necessitatibus repellendus. <br/> <br/> porro expedita error tempora perspiciatis velit ullam officiis, architecto cupiditate reprehenderit recusandae illum aliquid odio inventore hic. Nostrum adipisci earum itaque odio magni. <br/> <br/> Iusto incidunt sapiente minima illum ratione voluptatem, quis voluptatibus natus nihil tempore tempora consectetur harum voluptates officiis similique! Odio, sunt.</p>
      </div>
    </div>
);

export default Rules;
