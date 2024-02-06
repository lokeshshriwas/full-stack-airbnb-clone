import { createContext, useState } from "react";


const Searchcontext = createContext({});

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([])

  return (
    <Searchcontext.Provider value={{ searchTerm, setSearchTerm, searchResult, setSearchResult}}>
      {children}
    </Searchcontext.Provider>
  );
};

export default Searchcontext;
