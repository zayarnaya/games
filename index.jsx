"use strict";

// const { checkDel } = require("./utils");

// const menuLinks = [
//   {
//     name: 'Линия',
//     href: "",
//     onclick: "",
//     active: true, 
//   },
//   {
//     name: 'Квадрат',
//     href: "",
//     onclick: "", 
//   },
//   {
//     name: 'Начать заново',
//     href: "",
//     onclick: "", 
//   },

// ]

const rules = {
  line: {
    __html: '<strong>Правила игры в вычеркни число</strong> <br> Цель игры - полностью освободить от цифр игровое поле. Для этого нужно удалять цифры, сумма которых равна 10 либо которые равны друг другу и между которыми нет других цифр по горизонтали либо по вертикали (удаленные цифры не считаются). <br> Когда все возможности удаления исчерпаны, нажмите "Дальше" - на поле добавятся неудаленные цифры.' 
  },
  square: {
    __html: 'Правила игры в ход конем'
  },
}

const games = {
  line: 'Line',
  square: 'Square',
}

const Page = () => {
    const [game, setGame] = React.useState('Линия');
    const [gameName, setGameName] = React.useState('line');

    const menuLinks = [
      {
        name: 'Линия',
        href: "",
        onclick: setLine,
        active: true, 
      },
      {
        name: 'Ход конем',
        href: "",
        onclick: setSquare, 
        active: false, 
      },
      {
        name: 'Начать заново',
        href: "",
        onclick: "", 
      },
    
    ]

    // сделать им HOC

    const setSquare = React.useCallback((e) => {
      console.log('ну клик');
      e.preventDefault();
      if (gameName == 'Square') return;
      setGame('Ход конем');
      setGameName('Square');
      menuLinks[1].active = true; // лучше через стейт наверное
      menuLinks[0].active = false;
    }, [setGame, setGameName]);

    const setLine = React.useCallback((e) => {
      e.preventDefault();
      if (gameName == 'line') return;
      setGame('Линия');
      setGameName('Line');   
      menuLinks[0].active = true; // лучше через стейт наверное
      menuLinks[1].active = false;   
    }, [setGame, setGameName]);
    
    return (<div>
        <Header game={game}/>

        <main className="main">
          <div className="main__left-field">
            <nav className="nav_left_vertical">
              <LeftNav links={menuLinks} />
            </nav>
          </div>
          <GameField gameName={gameName} />
          {/* <div className="main__game-field">
            <div className="field__line"></div>
            <div className="field__square"></div>
          </div> */}
          <div className="main__right-field">
            <Rules gameName={gameName} />
            {/* <div className="rules">
            </div> */}
          </div>
    
        </main>
        <footer className="footer"></footer>
        </div>
    );
}

const Header = ({game}) => {
    return ( 
        <header className="header">
          <h1>Игра {game}</h1>
          </header>
    )
}

// передать функцию как-то не получается, надо вспоминать
const LeftNav = ({links}) => {
  return (
    <ul className="nav-list">
          {links.map((item, index) => (
            <LeftNavItem active={item.active} name={item.name} href={item.href} key={index} />
          ))}
    </ul>
  )
}

const LeftNavItem = ({
  active,
  name,
  onclick,
  href,
}) => {
  return (
    <li className={`nav-list__item${!!active ? ` active` : ``}`} >
      {!!onclick && <span onClick={onclick}>{name}</span>}
      {(!!href && !onclick) && <a href={href}>{name}</a>}
      {(!href && !onclick) && <span>{name}</span>}
    </li>
  )

}

const GameField = ({gameName}) => {
  return (
    <div className="main__game-field">
      <Line gameName={gameName}/>
  </div>
  )
}

const GameCell = ({
  value,
  deleted,
  row,
  col,
  onClick,
}) => {
  const className = `game-cell game-cell_line${!!deleted ? ` del` : ''}`;
  return (
    <div className={className} onClick={onClick} data-del={deleted} data-row={row} data-col={col}>{value}</div>
  )
}

const Rules = ({gameName}) => {
  return (
    <div className="rules" dangerouslySetInnerHTML={rules[gameName]}>
      {}
    </div>
  )
}

const Button = ({
  text,
  disabled = false,
  onSubmit,
}) => {
  return (
    <button role='button' onClick={onSubmit} disabled={disabled}>{text}</button>
  )
}

//////////////////

const Line = ({gameName}) => {
// будет ли работать через стейт?
  const [arr, setArr] = React.useState([
    [1,1,1,2,1,3,1,4,1],
    [1,2,3,4,5,6,7,8,9]
  ]);

  const [arr2show, setArr2show] = React.useState(clone2DArr(arr, 9));

  const [start, setStart] = React.useState([0, 0]);

  const [end, setEnd] = React.useState([1, 8]);

  // const [coords1, setCoords1] = React.useState([0, 0]);
  // const [isCoords1Set, setCoords1Set] = React.useState(false);

  // const [coords2, setCoords2] = React.useState([0, 0]);
  // const [isCoords2Set, setCoords2Set] = React.useState(false);

  // let buff = addNums(arr, arr2show, start, end);

  // setStart([end[0], end[1]]);
  // setEnd([buff[0], buff[1]])


  // start[0] = end[0];
  // start[1] = end[1];

  // end[0] = buff[0];
  // end[1] = buff[1];

  let coords1 = [];
  let coords2 = [];
  let firstChosen = false;

  const setFirstCell = React.useCallback((row, col, target) => {
    coords1 = [row, col];
    // setCoords1([row, col]);
    target.classList.add('del');
    target.setAttribute('data-del', true);
    // setCoords1Set(true);
    firstChosen = true;
    console.log(coords1, 'coords1');
  }, [coords1, firstChosen]);

  const removeFirstCell = React.useCallback((target) => {
    target.classList.remove('del');
    target.setAttribute('data-del', false);
    firstChosen = false;
  }, [firstChosen]);

  const setSecondCell = React.useCallback((row, col, target) => {
    // setCoords2([row, col]);
    if (checkHor(arr, coords1, [row, col]) || checkVert(arr, coords1, [row, col])) {
      console.log('можно');
      target.classList.add('del');
      target.setAttribute('data-del', true);
      delNums(arr, coords1, [row, col]); //работает
      firstChosen = false;
    } else {
      target.classList.add('wrong');
      setTimeout(() => target.classList.remove('wrong'), 2000);
    }

    // setCoords2Set(true); // он не сетит вторые координаты, надо сразу проверять наверное

  }, [coords1, firstChosen]);

  // const changeStart = (end) => {
  //   let row = end[0];
  //   let col = end[1];

  //   col++;
  //   if (col == 9) row++;

  //   return [row, col];
  // }

  const victory = () => {
    alert('Вы победили! Молодец!!');
  }

  const onButtonSubmit = React.useCallback((e) => {
    e.preventDefault();
    console.log('BUTTON');
    // setStart(changeStart(end));
    let buff = addNums(arr, arr2show, start, end);
    if(buff == 'v') victory();
    setEnd([buff[0], buff[1]]);
    setTimeout(() => console.log(arr), 1000);
  }, []);

  const onCellClick = React.useCallback((e) => {
    e.preventDefault();
    let row = Number(e.target.getAttribute('data-row'));
    let col = Number(e.target.getAttribute('data-col'));

    // короче оно только одно может что ли?
    // где-то тут слетела проверка



    if (!firstChosen) {
      setFirstCell(row, col, e.target);
    } else if (firstChosen && coords1[0] == row && coords1[1] == col) {
      removeFirstCell(e.target);
    } else if (firstChosen) {
      setSecondCell(row, col, e.target);
    } 

  }, [coords1, firstChosen]);

  return (
    <div className={`field__${gameName}`}>
      {
        arr2show.map(
          (itemRow, indexRow) => 
            (<div className="game-row game-row_line">
            {itemRow.map((item, indexCol) => 
              (
                <GameCell  onClick={onCellClick} value={item} deleted={checkDel(arr, indexRow, indexCol) ? true : false}
                row={indexRow} col={indexCol} />
              )
            )}
          </div>)
          
        )
      }
      <div className="button"><Button text='Дальше' onSubmit={onButtonSubmit} /></div>
    </div>
  )

}

const clone2DArr = (arr, rowLength) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push([]);
    for (let k = 0; k < rowLength; k++) {
      res[i][k] = arr[i][k];
    }
  }

  return res;
}

const checkHor = (arr, coords1, coords2) => {  

  const row1 = coords1[0] < coords2[0] ? coords1[0] : coords2[0];
  const col1 = row1 == coords1[0] ? coords1[1] : coords2[1];
  const row2 = row1 == coords1[0] ? coords2[0] : coords1[0];
  const col2 = row1 == coords1[0] ? coords2[1] : coords1[1];

  if (arr[row1][col1] != arr[row2][col2] && arr[row1][col1] + arr[row2][col2] != 10) return false;

  if (row1 == row2 && Math.abs(col1-col2) == 1) return true;

  for (let i = row1; i <= row2; i++) {
    for (let k = 0; k < 9; k++) {
      if (i == row1 && k <= col1) continue;
      if (i == row2 && k == col2) return true;
      if (arr[i][k] != null) return false;
    }
  }
  return true;

}

const checkVert = (arr, coords1, coords2) => {
  if (coords1[1] != coords2[1]) return false;
    
  const row1 = coords1[0] < coords2[0] ? coords1[0] : coords2[0];
  const row2 = row1 == coords1[0] ? coords2[0] : coords1[0];
  const col = coords1[1];

  console.log(row1, row2, col);


  if ((arr[row1][col] != arr[row2][col] && arr[row1][col] + arr[row2][col] != 10)) return false;
  if (Math.abs(row1-row2) == 1) return true;

  for (let i = row1; i <= row2; i++) {
    if (arr[i][col] != null) return false;
  }

  return true;
  
}

const delNum = (arr, row, col) => {
  arr[row][col] = null;
}

const delNums = (arr, coords1, coords2) => {
  delNum(arr, coords1[0], coords1[1]);
  delNum(arr, coords2[0], coords2[1]);
}

const addNums = (arr, arr2show, start) => { // возвращает координаты конца-ца-ца

  const startRow = start[0];
  const startCol = start[1];

  const endRow = arr.length - 1;
  const endCol = arr[endRow].length - 1;

  let currRow = endRow;
  let currCol = endCol;

  let counter = 0;


  for (let i = startRow; i <= endRow; i++) {
    for (let k = 0; k < 9; k++) {
      if ((i == startRow) && (k <= startCol)) { // пропускаем клетки ряда до стартовой позиции
        continue;
      } else if ((i == endRow) && (k == endCol + 1)) { // выходим по достижении конечной позиции
        return [currRow, currCol];
      } else {
        if (!checkDel(arr, i, k)) {
          counter++;
          currCol++;
          console.log(currRow, currCol);
          if (currCol == 9) {
            currCol = 0;
            currRow++;
            arr.push([]);
            arr2show.push([]);
          }
          arr[currRow][currCol] = arr[i][k];
          arr2show[currRow][currCol] = arr[i][k];
        }
      }
    }
  }

  if (counter == 0) return 'v';
  return [currRow, currCol];
  
}

// const renderNums = (arr, arr2show, start, end) => {
//   const firstRow = start[0];
//   const firstCell = start[1];
//   const endRow = end[0];
//   const endCell = end[1];

//   return (
//     <div>
//       {
//         arr2show.map(
//           (itemRow, indexRow) => {
//             (
//               <div className="game-row game-row_line">
//             {arr2show[itemRow].map((item, indexCol) => (
//               <GameCell   value={item} deleted={checkDel(arr, indexRow, indexCol) ? true : false}
//               row={indexRow} col={indexCol} />
//             ))}
//           </div>
//             )
//           }
//         )
//       }
//     </div>
//   )

// }



const checkDel = (arr, row, col) => {
  if (arr[row][col] == null) return true;
  return false;
}

// const Page = () => {
//     const [info, setInfo] = React.useState();
  
//     // это будет отображаться на странице
//     const today = info ? info.today : 0;
//     const yesterday = info ? info.counter[info.counter.length - 1].count : 0;
//     const total = info ? info.total : 0;
//     const messages = info ? info.messages : [];
//     const finalMessage = info ? info.shutdown_message : "";
//     const isServerShut = info ? info.shutdown : false;
  
//     // получение данных с сервера
//     const handleGetData = React.useCallback(() => {
//       try {
//         getAll().then((resp) => {
//           setInfo(JSON.parse(resp));
//           setLoaded(true);
//         });
//       } catch (error) {
//         console.log(error.message, "ОШИБКА");
//       }
//     }, []);
  
//     // для селекта
//     const messageHeader = "Сообщение";
//     const finalMessageHeader = "Финальное сообщение";
//     const selectRef = React.createRef();
  
//     // для прокрутки
//     const endRef = React.createRef();
//     const [isLoaded, setLoaded] = React.useState(false);
  
//     // отправка сообщения по нажатию на кнопку
//     const handleNewMessage = React.useCallback(({ text, isMessage }) => {
//       if (isMessage) {
//         addMessage(text);
//         handleGetData();
//       } else {
//         updateShutdownMessage(text);
//         handleGetData();
//       }
//     }, []);
  
//     // для окна подтверждения отключения сервера
//     const [isPopupOpen, setPopupOpen] = React.useState(false);
//     const askAllowShutdown = React.useCallback((e) => {
//       e.preventDefault();
//       setPopupOpen(true);
//     }, []);
  
//     // отключение сервера
//     const handleDisableServer = React.useCallback((e) => {
//       e.preventDefault();
//       shutDown();
//       handleGetData();
//       setPopupOpen(false);
//     }, []);
  
//     // получение информации с сервера при загрузке страницы
//     React.useEffect(() => {
//       handleGetData();
//       if (!!isLoaded) {
//         endRef.current.scrollIntoView();
//       }
//     }, [isLoaded]);
  
//     return (
//       <div>
//         <TableOutgoing
//           messages={messages}
//           finalMessage={finalMessage}
//           handleGetData={handleGetData}
//         />
//         <InputMessage
//           ref={selectRef}
//           messageHeader={messageHeader}
//           finalMessageHeader={finalMessageHeader}
//           handleNewMessage={handleNewMessage}
//           isServerShut={isServerShut}
//         />
//         <TableIncoming
//           today={today}
//           yesterday={yesterday}
//           total={total}
//           handleGetData={handleGetData}
//         />
  
//         {!isServerShut && (
//           <div className="server-disable-button">
//             <button
//               className="button button_shutdown"
//               ref={endRef}
//               onClick={askAllowShutdown}
//             >
//               FensysLite STOP
//             </button>{" "}
//           </div>
//         )}
//         {!!isServerShut && (
//           <div className="server-disable-button">
//             <div className="server-is-shut_message">FensysLite остановлен</div>
//             <button className="button button_shutdown" ref={endRef} disabled>
//               FensysLite STOP
//             </button>{" "}
//           </div>
//         )}
  
//         {isPopupOpen && (
//           <div className="popup_back" onClick={() => setPopupOpen(false)}></div>
//         )}
//         {isPopupOpen && (
//           <div className="popup">
//             <div>
//               <h3>Остановить FensysLite?</h3>
//               <p>Это необратимая операция!</p>
//             </div>
//             <button
//               type="button"
//               className="button button_primary button_color-red"
//               onClick={handleDisableServer}
//             >
//               Подтверждаю действие
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
