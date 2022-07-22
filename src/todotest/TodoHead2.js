import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { call } from "../service/ApiService";

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead(props) {
  const[done, setDone] = useState([])
  const[list, setList] = useState(props)
  console.log(props.props.items)


  // 부모 컴포넌트로부터 가져온 값을 통해서 할 일 체크 개수 카운트
  const itemcheck = props.props.items;
  let cnt = 0;

  itemcheck.map((item, idx) => {
    if(item.done === false){
      cnt++;
    }
  })
  ////////////////////////////////////////////
  useEffect(() => {
    call("/todo/done", "GET", null).then((response) =>
      setDone({ response })
    );
  }, []);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {cnt}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
