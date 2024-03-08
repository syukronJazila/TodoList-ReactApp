import { useState } from 'react';
import { Dropdown, Space } from 'antd';

function CustomDropdown({sortByDate, sortByTimeCreated}) {

    const [selectedItem, setSelectedItem] = useState('1')
    const items = [
      {
        label: <a onClick={() => {
          sortByDate()
          setSelectedItem('0')
        }}
        className="hover:text-white text-base text-cusOrange">Tanggal</a>,
        key: '0',
      },
      {
        label: <a onClick={() => {
          sortByTimeCreated()
          setSelectedItem('1')
        }} className='text-base text-cusGrey '>Dibuat</a>,
        key: '1',
      },
    ];
  
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [selectedItem],
      }}
      trigger={['click']}
      placement="bottomRight"
      className="btn bg-white text-cusGrey my-2"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
        Urutkan Berdasarkan 🔻
        </Space>
      </a>
    </Dropdown>
  
  );
  }
  
  export default CustomDropdown