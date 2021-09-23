import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import useApi from "../Hooks/use-api";

export default function GetData({data , isLoading , Err , updateApi,funTOinvoke}) {
    const {handleApi:deleteApi} =useApi()
    
    const deleteApiHandler=(e)=>{
        const apiDataObj = {
            url: `https://todo-e761c-default-rtdb.firebaseio.com/todos/${e.target.id}.json`,
            method: 'DELETE'
        }
        const extraFun = ()=>{
            funTOinvoke()
        }
        deleteApi(apiDataObj , extraFun)
    }
  const mapData = data.map((value , index) => {
    return (
      <tr key={value.id}>
        <th scope="row">{index + 1}</th>
        <td>{value.todo}</td>
        <td>
          <button className="btn btn-warning" id={value.id} onClick={updateApi}>
            Change TODO
          </button>
        </td>
        <td>
          <button className="btn btn-danger" id={value.id} onClick={deleteApiHandler}>
            Delete TODO
          </button>
        </td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <hr />
      {!Err && !isLoading && !data.length && <h4 className="text-center my-4">There's no Data available !</h4>}
      {isLoading && <h4 className="text-center my-2">Please Wait...</h4>}
      <h4 className="text-center my-2" style={{color:'red'}}>{Err}</h4>
      {data.length && <div align="center">
        <div>
          <table className="table text-center" style={{ width: "60vw" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TODO</th>
                <th scope="col">UPDATE</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>{mapData}</tbody>
          </table>
        </div>
      </div>}
    </React.Fragment>
  );
}
