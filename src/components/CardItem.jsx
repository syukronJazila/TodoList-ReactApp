import { Checkbox } from 'flowbite-react';
import EditModal from './EditModal';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function CardItem({ task, deleteTask, toggleCompleted, text, setText, setSelectedDate, selectedDate, editTask,tasks, id, setId, sortByCompeleted}){
  
    let indexTask = tasks.findIndex(el => el.id == task.id)
    function handleChange() {
      toggleCompleted(task.id)
    }
  
    return (
      <div className="cardItem bg-cusWhite w-11/12 h-max rounded-lg shadow-lg mt-3 text-cusGrey flex flex-row p-1.5 ">
        <div className='flex flex-row justify-center w-min'>
            <Checkbox 
             type="checkbox"
             checked={task.completed}
             onChange={handleChange}
             onClick={() => {sortByCompeleted()}}
             className='text-orange-500 rounded focus:ring-offset-transparent focus:ring-transparent ml-2 size-7'
            />
        </div>
        <div className='flex flex-col w-11/12 place-content-start ml-4'>
            <p className='text-base font-medium tracking-tight mr-auto leading-tight'><span className={task.completed ? 'line-through' : ''}>{task.text}</span></p>
            <time className='text-sm mr-auto'>{dayjs(task.date).format("DD/MM/YYYY")}</time>
        </div>
        <div>
          <EditModal
            text = {text}
            setText = {setText}
            setSelectedDate = {setSelectedDate}
            selectedDate = {selectedDate}
            id = {id}
            setId = {setId}
            action = {editTask}
            task = {task}
            taskIndex={indexTask}
          />
          <svg onClick={() => deleteTask(task.id)} className="w-6 h-6 text-gray-800 dark:text-white hover:text-cusOrange cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    )
  }

  export default CardItem