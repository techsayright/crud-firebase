import React, { useEffect, useRef } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import useApi from '../Hooks/use-api';

export default function PostData({funTOinvoke , isClickOnUpdate , setIsClickOnUpdate, Adata ,setAData,id}) {
    const formRef = useRef();
    const {isLoading, Err, handleApi: postApi} = useApi()
    const {handleApi: putApi} = useApi()

    useEffect(()=>{
        formRef.current.todoUpdated ? formRef.current.todoUpdated.focus() : formRef.current.todo.focus()
    },[Adata])

    const submitHandler = e =>{
        e.preventDefault();
        if(formRef.current.todo.value.trim().length ===0){
            formRef.current.reset();
            formRef.current.todo.focus()
            return
        }
        // console.log(formRef.current.todo.value);

        const extraFun=()=>{
            // alert('TODO Added !!')
            formRef.current.reset();
            funTOinvoke()
        };

        const inputData ={
            todo: formRef.current.todo.value
        };

        const apiDataObj = {
            url: 'https://todo-e761c-default-rtdb.firebaseio.com/todos.json',
            method: 'POST',
            headers: 'application/json',
            body: inputData
        }
        postApi(apiDataObj , extraFun);
        
    };

    const updateTODO = ()=>{
        console.log(id);
        const apiDataObj = {
            url: `https://todo-e761c-default-rtdb.firebaseio.com/todos/${id}.json`,
            method: 'PUT',
            headers: 'application/json',
            body: {todo: Adata}
        }
        const extraFun = ()=>{
            funTOinvoke()
            setIsClickOnUpdate(false)
        }
        putApi(apiDataObj, extraFun)
    }

    return (
        <div className='text-center my-3'>
            <h1 className="my-4">Simple TODO</h1>
            <form onSubmit={submitHandler} ref={formRef}>
                <h4 style={{color: 'red'}}>{Err}</h4>
                
                {!isClickOnUpdate &&
                    <React.Fragment>
                        <input type="text" placeholder='Enter Todo' id='todo' className="px-3" style={{width:"400px" , height:"35px"}} />
                        <button type="submit" className='mx-1 btn btn-outline-success' style={{marginBottom:'3px'}}>{isLoading ? "Adding..." : "Add TODO"}</button>
                    </React.Fragment>
                }

                {isClickOnUpdate && 
                    <React.Fragment>
                        <input type="text" value={Adata} id='todoUpdated' className="px-3" style={{width:"400px" , height:"35px"}} onChange={(e)=>setAData(e.target.value)}/>
                        <button type="button" className='mx-1 btn btn-outline-primary' style={{marginBottom:'3px'}} onClick={updateTODO}>Update TODO</button>
                        <button type='button' className='mx-1 btn btn-outline-danger' style={{marginBottom:'3px'}} onClick={()=>setIsClickOnUpdate(false)}>Cancel</button>
                    </React.Fragment>
                }
            </form>
        </div>
    )
}


