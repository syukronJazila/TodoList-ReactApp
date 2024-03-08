import { useState, useEffect } from 'react';
import AddModal from './components/AddModal'
import CardItem from './components/CardItem'
import CustomDropdown from './components/CustomDropdown'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (storedTasks){
      setTasks([...storedTasks])
    }else{
      setTasks([])
    }
  }, [])

  function addTask(text, selectedDate) {
    setSelectedDate(dayjs());
    if (!text){
      return 0
    }
    const newTask = {
      id: Date.now(),
      text,
      date: selectedDate,
      completed: false
    };
    tasks.push(newTask)
    setTasks([...tasks])
    sortByCompeleted()
  }

  function editTask(text, selectedDate, index) {
    if (!text){
      return 0
    }
    tasks[index].text = text
    if (selectedDate){
      tasks[index].date = selectedDate
    }
    setTasks([...tasks]);
    setText('');
    setSelectedDate('');
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify([...tasks]))
  }

  function toggleCompleted(id) {

    tasks.map(task => {
      if(task.id == id){
        task.completed = !task.completed
      }
    })
    tasks.sort((a, b) => a.completed - b.completed)
    setTasks([...tasks])
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  function sortByDate(){
    tasks.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    setTasks([...tasks])
    sortByCompeleted()
  }

  function sortByTimeCreated(){
    tasks.sort((a, b) => a.id - b.id)
    setTasks([...tasks])
    sortByCompeleted()
  }

  function sortByCompeleted(){
    tasks.sort((a, b) => a.completed - b.completed)
    setTasks([...tasks])
    localStorage.setItem("tasks", JSON.stringify([...tasks]))
  }

   return (
   <>
    <h1 className="text-3xl font-bold mt-6 z-0">
      Todo-List App
    </h1>
    <div className='Menu'>
      <AddModal
        text = {text}
        setText = {setText}
        setSelectedDate = {setSelectedDate}
        selectedDate = {selectedDate}
        action = {addTask}
        sortItem = {sortByCompeleted}
      />
      <CustomDropdown
       sortByDate={sortByDate}
       sortByTimeCreated={sortByTimeCreated}
      />
    </div>
    <div className="card">
    {tasks.length > 0 ? tasks.map(task => (
      <CardItem
         key={task.id} task={task}
         deleteTask={deleteTask} toggleCompleted={toggleCompleted} 
         text={text} setText={setText} 
         setSelectedDate={setSelectedDate} selectedDate={selectedDate} 
         editTask={editTask} tasks={tasks}
         id={id} setId={setId} sortByCompeleted={sortByCompeleted}
       />
    )) : (<h1 className='text-lg text-center mt-6'> Belum ada tugas yang ditambahkan</h1>)}
    </div>
  </>
  );
}

export default App


