import { useEffect, useState } from 'react';
import axios from 'axios';
import NavInshorts from './components/NavInshorts';
import './App.css';
import NewsContent from './NewsContent/NewsContent';
import Footer from './components/Footer/Footer';

function App() {
  const [category, setCategory] = useState("general");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadmore, setLoadmore] = useState(20);

  console.log(process.env);

const newsApi = async () => {
  try {
   const proxyUrl = "https://cors-anywhere.herokuapp.com/"
   
    const news = await axios.get(
      `https://${proxyUrl}newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&category=${category}&pageSize=${loadmore}`
      );
    setNewsArray(news.data.articles);
    setNewsResults(news.data.totalResults);
  } catch (error) {
    console.log('Error fetching data');
  }
};

useEffect(()=> {
  newsApi();
  // eslint-disable-next-line
  }, [newsResults, category, loadmore]);

  return (
    <div className='app'>
      <NavInshorts setCategory={setCategory}/>

      <NewsContent 
      loadmore={loadmore}
      setLoadmore={setLoadmore}
      newsArray={newsArray}
      newsResults={newsResults}/>
      <Footer />
    </div>
  );
}

export default App;
