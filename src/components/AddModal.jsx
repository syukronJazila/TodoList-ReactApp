import { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

function AddModal({text, setText, setSelectedDate, selectedDate, action, sortItem}){

    const [isText, setIsText] = useState(true)
  
    function handleClick(){
      if (text){
        setIsText(true)
      }else{
        setIsText(false)
      }
      action(text, selectedDate)
    }
  
    const onChange = (date, dateString) => {
      setSelectedDate(date);
    };
    return (
      <>
        <label className="btn bg-cusOrange hover:bg-white hover:text-cusOrange" onClick={() => {
          setText('')
          setSelectedDate(dayjs(new Date()))
          setIsText(true)
        }} htmlFor="modal-1">Tambah</label>
  
        <article>  
          <input className="modal-state" id="modal-1" type="checkbox" />
          <div className="modal ">
            <label className="modal-overlay" htmlFor="modal-1"></label>
            <div className="modal-content flex w-full flex-col gap-5 p-7 ">
              <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
              <div className="flex flex-col gap-2">
                <h2 className="text-center text-2xl font-semibold">Tambah Tugas</h2>
              </div>
  
              <section>
                <div className="form-group">
                  <div className="form-field">
                    <label className="form-label">Tugas</label>
                    <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here" type="text" className="input max-w-full focus:border-cusOrange focus:ring-cusOrange" />
                  {!isText ? (<label className="form-label">
                    <span className="form-label-alt text-red-600">Tugas tidak boleh kosong</span>
                  </label>) : (<></>)}
                  </div>
                  <label className="form-label">Tanggal</label>
                  <DatePicker 
                    value={selectedDate}
                    onChange={ onChange }
                    defaultValue={dayjs(new Date())}
                    minDate={dayjs(new Date())}
                    className = 'h-full' language='ind-ID'
                    format={dateFormat}
                  />
                  <div className="form-field pt-5 mt-48">
                    <div className="form-control justify-between">
                      <label onClick={() => handleClick()} htmlFor={isText ? "modal-1" : ""} className="btn absolute bottom-1 bg-cusOrange hover:bg-white hover:text-cusOrange w-full">Tambah</label>
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

  export default AddModal