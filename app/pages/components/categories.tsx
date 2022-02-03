import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { categoriesProps } from '../interfaces';

const Categories: NextPage<categoriesProps> = ({ cats, setCats }) => {
  const [any, setAny] = useState(false);
  const [activeBtns, setActiveBtns] = useState<string[]>([]);

  useEffect(() => {
    if (any) {
      setCats(['any']);
    } else {
      setCats(activeBtns);
    }
  }, [activeBtns, any]);

  function handleClickCat(btn:string) {
    setAny(false);
    if (activeBtns.includes(btn)) {
      const index = activeBtns.indexOf(btn);
      setActiveBtns([...activeBtns.slice(0, index), ...activeBtns.slice(index + 1)]);
    } else {
      setActiveBtns([...activeBtns, btn]);
    }
  }

  function handleClickAny() {
    setActiveBtns([]);
    setAny(!any);
  }
  return (
    <div className="pt-6 flex flex-col items-center w-full">
      <h1 className="fontSizeLarge">Categories</h1>
      <button className={`${any && 'activeBtn'} mainBtn my-4 fontSizeSmall`}onClick={() => { handleClickAny(); }} >Any</button>
      <div className="grid grid-cols-custom-3 gapSize py-2 w-[90%]">
        {cats.map((category) => <div className="flex justify-center w-full"><button key={category}
        className={` mainBtn ${activeBtns.includes(category) && 'activeBtn'} fontSizeSmall`}
        onClick={() => { handleClickCat(category); }} >{category}</button></div>)}
      </div>
    </div>
  );
};

export default Categories;
