import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import ReactDom from 'react-dom';
import "./index.css";   //for css purpose only
import { BrowserRouter as Router, Link, Route, Switch, useParams } from 'react-router-dom';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';



let setlocal = () => {
  console.log("inside get items")
  let n = JSON.parse(localStorage.getItem("list"))
  console.log(n)
  if (n) {
    console.log("if function")
    return n
  }
  else {
    console.log("else function")
    return []
  }
}
let App = () => {
  let [name, setname] = useState("")
  let [value, setvalue] = useState(setlocal())
  let [toogle, settoogle] = useState(true)
  let [edit, setedit] = useState(null)

  console.log(name)

  let car = (e) => {
    console.log(e)
    e.preventDefault()
    if (!name) {
      console.log("enter something")
      alert("enter something")

    }
    else if (!toogle) {
      setvalue(value.map((item) => {
        if (item.id == edit) {
          return { ...item, name }
        }
        return item
      }))
      setname("")
      settoogle(true)
    }
    else {
      let x = { id: new Date().getTime(), name }
      setvalue([...value, x])
      setname("")
    }
  }
  console.log(value)

  let remove = (id) => {
    console.log("remove function")
    let n = value.filter((item) => item.id != id)
    console.log(n)
    setvalue(n)
    console.log("after set value")
  }
  let edit1 = (id) => {
    console.log("edit button")
    let m = value.find((item) => item.id == id)
    console.log(m)
    settoogle(false)
    setname(m.name)
    setedit(id)
  }
  let clear = () => {
    console.log("clear all")
    setvalue([])
  }
  useEffect(() => {
    console.log("inside useeffect")
    localStorage.setItem("list", JSON.stringify(value))
  }, [value])
  return (
    <>
      <div className='container'>
        <div className='container-two'>
          <h1 id="header">To Do List</h1>
          <form>
            <div className='searchbox'>
              <input type="text" id='inpt' value={name} onChange={(e) => setname(e.target.value)} required></input>
              {(toogle) ? <button onClick={car} id='btn1'>ADD</button> : <button onClick={car} id='btn1'>Edit</button>}
            </div>

          </form>
          <div className='data'>
            {value.map((item) => {
              return (
                <div key={item.id} className='data1'>
                  <h2>{item.name}</h2>
                  <div className='buttons'>
                    <button onClick={() => edit1(item.id)} id='edit1'><AiOutlineEdit /></button>
                    <button onClick={() => remove(item.id)} id='remove1'><AiFillDelete /></button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='remov'>
            {value.length > 0 && <button onClick={clear} id="remove">Remove All</button>}
          </div>
        </div>
      </div>
    </>
  )
}

ReactDom.render(<App />, document.getElementById('root'))






