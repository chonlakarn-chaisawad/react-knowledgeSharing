import { useState } from 'react'

import './App.css'

const SelfIntroduction = ({ name, dateOfBirth, foods = [] }) => {
  return (<div className='output-container'>
    {name ? <h1>ฉันชื่อ <span style={{ color: "coral" }}>{name}</span> </h1> : null}
    {dateOfBirth ? <h2>ฉันเกิดวันที่ {dateOfBirth}</h2> : null}
    {foods.length == 0 ? null :
      <div>
        <h2>ฉันชอบกิน</h2>
        {foods.map((item, index) => (
          <h2 key={item}>
            {index + 1}. {item}
          </h2>
        ))}
      </div>}
  </div>)
}

function App() {
  const [data, setData] = useState({ name: undefined, dob: undefined, foods: [] })
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [foods, setFoods] = useState([""])
  return (
    <div className='container'>
      <div className='input-container'>
        <div>
          <label htmlFor="name">คุณพรี่ชื่ออะไร </label>
          <input
            id="name"
            value={name}
            style={{ padding: "12px 16px", margin: "8px 0" }}
            onChange={event => {
              setName(event.target.value)
            }} />
        </div>

        <div style={{ padding: "12px" }}>
          <label htmlFor="dob">คุณพรี่เกิดวันที่เท่าไหร่ </label>
          <input
            id="dob"
            value={dob}
            style={{ padding: "12px 16px", margin: "8px 0" }}
            onChange={event => {
              setDob(event.target.value)
            }} />
        </div>

        <div style={{ padding: "12px 16px" }}>
          <div style={{ fontWeight: "bold", textDecoration: "underline" }}>อาหารที่ชื่นชอบ</div>
          {foods.map((item, index) => (
            <div key={index} style={{ padding: "12px" }}>
              <label htmlFor={`foods-${index}`} >อร่อยดีบอกต่อ </label>
              <input
                id={`foods-${index}`}
                value={item}
                style={{ padding: "12px 16px" }}
                onChange={event => {
                  const newValue = event.target.value
                  const newFood = foods.map((food, foodIndex) =>
                    foodIndex === index ? newValue : food
                  )
                  setFoods(newFood)
                }} />
              <button
                style={{ borderRadius: 100 , backgroundColor: 'rgb(255, 93, 93)' , margin : "12px",color:'white'}}
              
              onClick={() => {
                setFoods(foods.filter((food, foodIndex) => {
                  if (foodIndex === index) {
                    return false
                  }
                  return true
                }))
              }}>x</button>
            </div>
          ))}
          <button onClick={() => {
            setFoods([...foods, ""])
          }}
            style={{ backgroundColor: "#F99640" }}>เพิ่มอาหารเมนูอื่น</button>
        </div>

        <button style={{ backgroundColor: "#CE96FF" }} onClick={() => {
          if (name === "" || dob === "") {
            alert("กรุณากรอกชื่อและวันเกิด");
          } else if (foods.every(food => food === "")) {
            alert("กรุณากรอกอาหาร");
          } else {
            setData({ name, dob, foods });
            setName("");
            setDob("");
            setFoods([""]);
          }
        }}>บันทึก</button>
      </div>
      <div style={{ width: "50%" }}>
        <SelfIntroduction
          name={data.name}
          dateOfBirth={data.dob}
          foods={data.foods} />
      </div>
    </div>
  )
}

export default App
