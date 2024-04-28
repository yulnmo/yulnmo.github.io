import React, { useEffect, useState } from 'react';
import BoardExchange, { BoardRequest, BoardResponse } from '../service/BoardExchange';
import AccessExchange, { TokenResponse } from '../service/AccessExchange';

const GuestBook = () => {
  const [boards, setBoards] = useState<Array<BoardResponse>>([]);
  const [boardVisibleCount, setBoardVisibleCount] = useState(0);
  const [accessTokenCache, setAccessTokenCache] = useState('');
  const [boardRequest, setBoardRequest] = useState<BoardRequest>(
    {
        'author': '',
        'contents': '',
        'password': ''
    }
  )

  useEffect(() => {
    init();
  }, []);

  function init() {
    AccessExchange.post(
        {
            requestBody: undefined,
            accessToken: '',
            doOnSuccess: (tokenResponse: TokenResponse) => {
                setAccessTokenCache(tokenResponse.accessToken);
                getBoards(1, tokenResponse.accessToken);
            },
            doOnError: () => {

            }
        }
    );
  }

  function getBoards(retry: number = 1, accessToken: string = '') {
    let token = '';
    if (accessToken.length === 0) {
        token = accessTokenCache;
    } else {
        token = accessToken;
    }

    BoardExchange.get({ 
        requestBody: undefined,
        accessToken: token, 
        doOnSuccess: (list: Array<BoardResponse>) => {
            setBoards(list);
            if (list.length > 5) {
                setBoardVisibleCount(5);
            } else {
                setBoardVisibleCount(list.length);
            }
        },
        doOnError: () => {
            if (retry > 0) {
                AccessExchange.post(
                    {
                        requestBody: undefined,
                        accessToken: '',
                        doOnSuccess: (tokenResponse: TokenResponse) => {
                            setAccessTokenCache(tokenResponse.accessToken);
                            getBoards(retry - 1, tokenResponse.accessToken);
                        },
                        doOnError: () => {

                        }
                    }
                )
            }
        }
    })
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

  function handlePost() {
    AccessExchange.post(
        {
            requestBody: undefined,
            accessToken: '',
            doOnSuccess: (tokenResponse: TokenResponse) => {
                setAccessTokenCache(tokenResponse.accessToken);

                BoardExchange.post(
                    {
                        requestBody: boardRequest,
                        accessToken: tokenResponse.accessToken, 
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
                        },
                        doOnError: () => {}
                    }
                );
            },
            doOnError: () => {}
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

    AccessExchange.post(
        {
            requestBody: undefined,
            accessToken: '',
            doOnSuccess: (tokenResponse: TokenResponse) => {
                setAccessTokenCache(tokenResponse.accessToken);

                BoardExchange.delete(
                    {
                        requestBody: requestBody,
                        accessToken: tokenResponse.accessToken, 
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
            },
            doOnError: () => {}
        }
    );
  }

  return <div className="guest-book">
    <p className="category font-script">
      Guest book
    </p>
    <div className="contents">
      <div className="board">
        <div className="upper">
          <div className="label">
            이름
          </div>
          <div className="input">
            <input type="text" className="textbox" value={boardRequest.author} onChange={(e) => {setBoardRequest((prev) => ({...prev, author: e.target.value}))}} />
          </div>
        </div>
        <div className="middle">
          <div className="label">
            비밀번호
          </div>
          <div className="input">
            <input type="password" className="textbox" value={boardRequest.password} onChange={(e) => {setBoardRequest((prev) => ({...prev, password: e.target.value}))}} />
          </div>
        </div>
        <div className="lower">
          <div className="label">
            내용
          </div>
          <div className="input">
            <textarea className="textbox" rows={5} value={boardRequest.contents} onChange={(e) => {setBoardRequest((prev) => ({...prev, contents: e.target.value}))}}/>
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
        const board = boards[index];
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
            {board.contents}
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
