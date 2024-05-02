import React, { useEffect, useRef, useState } from 'react';
import BoardExchange, { BoardRequest, BoardResponse } from '../service/BoardExchange';
import AccessExchange, { TokenResponse } from '../service/AccessExchange';

const GuestBook = () => {
  const initialBoardRequest = {
    'author': '',
    'contents': '',
    'password': ''
  };

  const [boards, setBoards] = useState<Array<BoardResponse>>([]);
  const [boardVisibleCount, setBoardVisibleCount] = useState(0);
  const [accessTokenCache, setAccessTokenCache] = useState('');
  const [boardRequest, setBoardRequest] = useState<BoardRequest>(initialBoardRequest);

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    init();
  }, []);

  function init() {
    getBoards();
  }

  function proceedWithAccessToken(callback: (_: string) => void) {
    AccessExchange.post(
        {
            requestBody: undefined,
            accessToken: '',
            doOnSuccess: (tokenResponse: TokenResponse) => {
                callback(tokenResponse.accessToken);
            },
            doOnError: () => {}
        }
    );
  }

  function getBoards() {
    proceedWithAccessToken(accessToken => 
        {
            BoardExchange.get({ 
                requestBody: undefined,
                accessToken: accessToken, 
                doOnSuccess: (list: Array<BoardResponse>) => {
                    setBoards(list);
                    if (list.length > 5) {
                        setBoardVisibleCount(5);
                    } else {
                        setBoardVisibleCount(list.length);
                    }
                },
                doOnError: () => {
                    
                }
            })
        }
    );
  }

  function handlePost() {
    if (!validate()) {
        alert('양식을 모두 채워주세요.');
        return;
    }

    proceedWithAccessToken(accessToken =>
        { 
            BoardExchange.post(
                {
                    requestBody: {
                        ...boardRequest,
                        contents: boardRequest.contents.trim()
                    },
                    accessToken: accessToken,
                    doOnSuccess: (response: BoardResponse) => {
                        setBoards((prev) => {
                            const newList = [...prev, response];
                            if (newList.length > 5) {
                                setBoardVisibleCount(5);
                            } else {
                                setBoardVisibleCount(newList.length);
                            }
                            return newList;
                        });
                        setBoardRequest(initialBoardRequest);
                    },
                    doOnError: () => {
                        alert('일시적으로 이용이 불가합니다.\n잠시 후 시도해주세요.');
                    }
                }
            );
        }
    );
  }

  function handleEdit(board: BoardResponse) {
    
  }

  function handleDelete(board: BoardResponse) {
    const requestBody = {
        'id': board.boardId,
        'password': prompt('비밀번호를 입력해주세요.') ?? '',
        'author': '',
        'contents': ''
    };

    if (requestBody.password.length === 0) {
        return;
    }
    proceedWithAccessToken(accessToken =>
        { 
            BoardExchange.delete(
                {
                    requestBody: requestBody,
                    accessToken: accessToken, 
                    doOnSuccess: (_: void) => {
                        setBoards((prev) => {
                            const newList = prev.filter(it => it.boardId !== board.boardId);
                            if (newList.length > 5) {
                                setBoardVisibleCount(5);
                            } else {
                                setBoardVisibleCount(newList.length);
                            }
                            return newList;
                        });
                    },
                    doOnError: () => {
                        alert('비밀번호가 맞지 않습니다.');
                    }
                }
            );
        }
    );
  }

  function handleExpand() {
    if (boards.length > boardVisibleCount) {
    let newCount;
    if (boards.length > boardVisibleCount + 5) {
      newCount = boardVisibleCount + 5;
    } else {
      newCount = boards.length;
    }
    setBoardVisibleCount(newCount);
    }
  }

  function validate() {
    return !(boardRequest.author.trim().length === 0 ||
        boardRequest.password.length === 0 ||
        boardRequest.contents.trim().length === 0);
  }

  return <div className="guest-book">
    <p className="category font-script">
      Guest book
    </p>
    <p className="guide">
      석모 ♥︎ 지율에게 축하하는 글을 남겨주세요.
    </p>
    <div className="contents">
      <div className="board form">
        <div className="upper">
          <div className="label" onClick={(_) => {nameRef.current?.focus();}}>
            이름
          </div>
          <div className="input">
            <input ref={nameRef} type="text" className="textbox" placeholder='이름을 입력해주세요.' value={boardRequest.author} onChange={(e) => {setBoardRequest((prev) => ({...prev, author: e.target.value.trim()}))}} />
          </div>
        </div>
        <div className="middle">
          <div className="label"onClick={(_) => {passwordRef.current?.focus();}}>
            비밀번호
          </div>
          <div className="input">
            <input ref={passwordRef} type="password" className="textbox" placeholder='비밀번호를 입력해주세요.' value={boardRequest.password} onChange={(e) => {setBoardRequest((prev) => ({...prev, password: e.target.value}))}} />
          </div>
        </div>
        <div className="lower">
          <div className="label"onClick={(_) => {contentsRef.current?.focus();}}>
            내용
          </div>
          <div className="input">
            <textarea ref={contentsRef} className="textbox" rows={5} value={boardRequest.contents} placeholder='내용을 입력해주세요.' onChange={(e) => {setBoardRequest((prev) => ({...prev, contents: e.target.value}))}}/>
          </div>
        </div>
      </div>
      <div className="manipulate">
        <input type="button" value="글쓰기" onClick={handlePost}/>
      </div>
      </div>
      <div className="contents">
      {
        [...new Array(boardVisibleCount).keys()].map((_, index) => {
        const board = boards[boards.length - 1 - index];
        if (!board) {
          return <div key={index} style={{display: "none"}}></div>;
        }
        return <div key={index} className="board">
          <div className="upper">
            <div className="name">
              <div className="text">{board.author}</div>
            </div>
            <div className="controls">
              <span className="edit" onClick={(_) => handleEdit(board)}>수정</span>
              <span className="delete" onClick={(_) => handleDelete(board)}>삭제</span>
            </div>
          </div>
          <div className="lower">
            {board.contents.split("\n").map((it, index)=><p key={index}>{it}</p>)}
          </div>
        </div>;
        })
      }
      <div className="manipulate" style={boardVisibleCount < boards.length ? {} : {display: 'none'}}>
        <input type="button" value="더보기" onClick={handleExpand}/>
      </div>
    </div>
  </div>;
}

export default GuestBook;
