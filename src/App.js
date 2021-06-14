import { useState, useEffect } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom';
import Modal from 'react-modal';

import { v4 as uuidv4 } from 'uuid';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


const App = () => {
  const [taskList, setTaskList] = useState([])
  const [addText, setText] = useState({
    id: uuidv4(),
    name: '',
    salary: '',
    recipet_no: ''
  })

  useEffect(() => {
    getTaskLIst()
  }, [])

  const getTaskLIst = () => {
    let tasks = localStorage.getItem("tasks")
    if (tasks) {
      let allTasks = JSON.parse(tasks)
      setTaskList([...allTasks])
    }
  }
  const handleChange = (e) => {
    let { name, value } = e.target
    addText[name] = value
    setText({ ...addText })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (addText.name !== '') {
      taskList.push(addText)
      // let newTask = [...taskList,addText]
      localStorage.setItem("tasks", JSON.stringify(taskList))
      setText({
        id: uuidv4(),
        name: '',
        salary: '',
        recipet_no: ''
      })
    } else {
      alert('please fill the required name')
    }
  }

  const handleUpdateTask = (e, id) => {
    if (addText.name !== '') {
      let updateTask = taskList.map((item, index) => item.id === id ? { ...addText } : { ...item })
      setTaskList([...updateTask])
      localStorage.setItem("tasks", JSON.stringify(updateTask))
      setIsOpen(false)
      setText({
        id: uuidv4(),
        name: '',
        salary: '',
        recipet_no: ''
      })
    } else {
      alert('please fill the required name')
    }
  }

  const handleDeleteTasks = (e, id) => {
    const removeTask = taskList.filter((item, index) => item.id !== id)
    setTaskList([...removeTask])
    localStorage.setItem("tasks", JSON.stringify(removeTask))
    setText({
      id: uuidv4(),
      name: '',
      salary: '',
      recipet_no: ''
    })
  }
  const handleSelectTask = (e, id) => {
    const task = taskList.find(t => t.id === id)
    setText({ ...task })
  }
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(e, id) {
    setIsOpen(true);
    const task = taskList.find(t => t.id === id)
    setText({ ...task })
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const popUp = () => <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>

    <form>
      <input
        type="text"
        className='name'
        name="name"
        value={addText.name}
        placeholder="name"
        onChange={(e) => handleChange(e)}
      />
      <div>
        <input
          type="text"
          className='salary'
          name="salary"
          value={addText.salary}
          placeholder="salary"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          className='recipet_no'
          name="recipet_no"
          value={addText.recipet_no}
          placeholder="recipet_no"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button className="update-btn-pop" onClick={(e) => handleUpdateTask(e, addText.id)}>update </button>
      <button className="update-btn-pop" onClick={closeModal}>Cancel</button>
    </form>
  </Modal >

  return (
    <div >
      <div >
        <header>
          <h1>Create update delete task app</h1>
          <div>

            <input
              type="text"
              className='name'
              name="name"
              value={addText.name}
              placeholder="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              className='salary'
              name="salary"
              value={addText.salary}
              placeholder="salary"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              className='recipet_no'
              name="recipet_no"
              value={addText.recipet_no}
              placeholder="recipet_no"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="create-taks" onClick={(e) => handleSubmit(e)}>Create</button>
        </header>
      </div>

      <ul>
        {taskList.map((item, index) => {
          return (
            <li key={index} >
              <div onClick={(e) => openModal(e, item.id)}>
                <p>name : {item.name}</p>
                <p>salary : {item.salary}</p>
                <p>recipet_no :  {item.recipet_no}</p>

                <button className="delete-btn" onClick={(e) => handleDeleteTasks(e, item.id)}>delete</button>
              </div>
            </li>
          )
        })}
        {popUp()}

      </ul>
    </div>
  )
}


export default App;
