import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zhCN } from 'date-fns/locale'; // 중국어 간체 로케일 불러오기

function MyDatePicker() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale={zhCN}  // 중국어 간체 로케일 적용
        dateFormat="yyyy-MM-dd"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="时间"  // 시간 캡션도 중국어로
      />
    </div>
  );
}

export default MyDatePicker;
