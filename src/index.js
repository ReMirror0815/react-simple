import data from './data.json'
import './index.css'
import './index.less'
import React from '../react'
import ReactDOM  from '../react-dom'

const element = (
  <div 
    className="ele" 
    title="111" 
    onClick={()=>alert('Hello,World')}
  >
    Hello,<span>World</span>
    <Element />
  </div>
)

function Element(params) {
  return (
    <div 
      className="ele2" 
      title="bbb" 
      onClick={()=>alert('Hello,Function')}
    >
      Hello,<span>Function</span>
    </div>
  )
  
}

const ROOT = document.getElementById('root')

// console.log(3222, data)
// babel检测到jsx语法则调用React.createElement转成js对象
// console.log(element)

// ReactDOM.render(element, ROOT)
ReactDOM.render(element, ROOT)

