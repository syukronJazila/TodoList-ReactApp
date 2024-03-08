import { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

function EditModal({text, setText, setSelectedDate, selectedDate, id, setId, action, task, taskIndex}){

    const [isText, setIsText] = useState(true)
  
    function handleClick(){
      if (text){
        setIsText(true)
      }else{
        setIsText(false)
      }
      action(text, selectedDate, id)
    }
  
    const onChange = (date, dateString) => {
      console.log(date, dateString);
      setSelectedDate(date);
    };
    return (
      <>
        <label 
        htmlFor={task.completed ? "" : "modal-2"} 
        onClick={() => {
          setText(task.text)
          setSelectedDate(dayjs(task.date))
          setIsText(true)
          setId(taskIndex)
        }}>
        <div className="w-6 h-6">
        <svg className={task.completed ? "text-gray-400" : "text-gray-800 hover:text-cusOrange cursor-pointer"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clipRule="evenodd"/>
        </svg>
        </div>
        </label>  
  
        <article>  
          <input className="modal-state" id="modal-2" type="checkbox" />
          <div className="modal w-screen p-0 m-0 flex flex-row">
            <label className="modal-overlay w-full" htmlFor="modal-2"></label>
            <div className="modal-content flex w-full gap-5 pr-10 mt-16">
              <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
              <div className="flex flex-col gap-2">
                <h2 className="text-center text-cusWhite text-2xl font-semibold">Edit Tugas</h2>
              </div>
  
              <section className='w-full'>
                <div className="form-group mr-24 ">
                  <div className="form-field w-full mr-auto">
                    <label className="form-label mr-auto">Tugas</label>
                    <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here" type="text" className="input max-w-full focus:border-cusOrange focus:ring-cusOrange" />
                    {!isText ? (<label className="form-label mr-auto">
                    <span className="form-label-alt text-red-600">Tugas tidak boleh kosong</span>
                  </label>) : (<></>)}
                  </div>
                  <label className="form-label mr-auto">Tanggal</label>
                  <DatePicker 
                    value={selectedDate}
                    onChange={ onChange }
                    defaultValue={selectedDate}
                    minDate={dayjs(new Date())}
                    className = 'w-full' language='ind-ID'
                    format={dateFormat}
                  />
                  <div className="form-field pt-5 mt-48 w-full">
                    <div className="form-control justify-between w-full">
                      <label onClick={handleClick} htmlFor={isText ? "modal-2" : ""} className="btn absolute bottom-1 bg-cusOrange hover:bg-white hover:text-cusOrange w-full">Edit</label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
      </article>    
      </>
    )
  }

  export default EditModal