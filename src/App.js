import { useCallback, useEffect, useState } from "react";
import "./App.css";
import GetData from "./components/GetData";
import PostData from "./components/PostData";
import useApi from "./Hooks/use-api";

function App() {
  const [data, setData] = useState([]);
  const [Adata, setAData] = useState([]);
  const [ID, setID] = useState();
  const [isClickOnUpdate, setIsClickOnUpdate] = useState(false);
  const { isLoading, Err, handleApi: fetchData } = useApi();
  const { handleApi: fetchAData } = useApi();

  const funTOinvoke = useCallback(() => {
    const apiDataObj = {
      url: "https://todo-e761c-default-rtdb.firebaseio.com/todos.json",
    };
    const extraFun = (val) => {
      let tempData = [];
      for (const key in val) {
        tempData.push({
          id: key,
          todo: val[key].todo,
        });
      }
      setData(tempData);
    };
    fetchData(apiDataObj, extraFun);
  }, [fetchData]);

  useEffect(() => {
    funTOinvoke();
  }, [funTOinvoke]);

  const updateApi = (e) => {
    // console.log(e.target.id);
    setID(e.target.id)
    setIsClickOnUpdate(true);
    const apiDataObj = {
      url: `https://todo-e761c-default-rtdb.firebaseio.com/todos/${e.target.id}.json`,
    };
    const extraFun = (val) => {
      setAData(val.todo);
    };
    fetchAData(apiDataObj, extraFun);
  };
  return (
    <div>
      <PostData
        funTOinvoke={funTOinvoke}
        isClickOnUpdate={isClickOnUpdate}
        setIsClickOnUpdate={setIsClickOnUpdate}
        Adata={Adata}
        setAData={setAData}
        id={ID}
      />
      <GetData
        data={data}
        isLoading={isLoading}
        Err={Err}
        updateApi={updateApi}
        funTOinvoke={funTOinvoke}
      />
    </div>
  );
}

export default App;
