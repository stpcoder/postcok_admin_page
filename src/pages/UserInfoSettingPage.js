import React, { useState, useEffect } from 'react'
import mainLogo from './PoStocklogo.png';
import './userInfoSettingPage.css';
import { useNavigate } from 'react-router';

const stockTypeArr = ['bio', 'construction', 'electronics', 'food', 'broadcast', 'tot'];
const buttonList = {1:true, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false, 10:false, 11:false, 12:false};

export default function UserInfoSettingPage({ groupNumber, setGroupNumber, groupInfo, setGroupInfo }) {
  var groupStock = groupInfo;
  const [selectedGroup, setSelectedGroup] = useState(1);
  const [groupNum, setGroupNum] = useState(groupNumber);
  const [groupStockList, setGroupStockList] = useState(groupStock);
  const [buttonShowList, setButtonShowList] = useState(buttonList);

  useEffect(() => {
    for (var i = 1; i <= groupNumber; i++) {
      buttonList[i] = true;
    }
    setButtonShowList(buttonList);

    stockTypeArr.forEach((typeName) => {
      const inputTag = document.getElementById(typeName);
      inputTag.value = groupStockList['group1'][typeName];
    });
  },[]);

  const navigate = useNavigate();
  const goMainPage = () => {
    const temp = document.getElementsByTagName('input')
    const tempList = Array.prototype.slice.call(temp);
    tempList.forEach(e => {
      e.value = 0;
    });
    setGroupNum(groupNumber);
    setSelectedGroup(1);
    groupStock = groupInfo;
    setGroupStockList(groupInfo);
    for(var i = 1; i <= 12; i++) {
      buttonList[i] = (i <= groupNumber) ? true : false;
    }
    setButtonShowList(buttonList);
    navigate('/');
  }

  const changeEnd = () => {
    setGroupNumber(groupNum);
    setGroupInfo(groupStockList);
    alert('수정이 완료되었습니다.');
    navigate('/');
  }

  const groupClick = e => {
    const group = Number(e.target.className.replace(/[^0-9]/g,''));
    if(group === selectedGroup) return;

    stockTypeArr.forEach((typeName) => {
      const inputTag = document.getElementById(typeName);
      inputTag.value = groupStockList['group' + group][typeName];
    });

    setSelectedGroup(group);
  }

  const plusGrounpNum = e => {
    var num = groupNum + 1;
    if (num ===  13) {
      alert('그룹의 수는 12를 초과할 수 없습니다.');
      return;
    }
    setGroupNum(num);
    buttonList[num] = true;
    setButtonShowList(buttonList);

    const tempText = 'group' + num;
  }

  const minusGroupNum = e => {
    var num = groupNum;
    if (num === 1) {
      alert('그룹의 수는 1보다 작을 수 없습니다.');
      return;
    }
    setGroupNum(num - 1);
    buttonList[num] = false;
    setButtonShowList(buttonList);
    if (selectedGroup === num) setSelectedGroup(num - 1);
  }

  const onChangeValue = e => {
    const text = 'group' + selectedGroup;

    groupStock[text][e.target.id] = Number(e.target.value);

    console.log(groupStock);
    setGroupStockList(groupStock);
  }

  return (
    <div>
      <div class="frame" id="n3_192">
        <div class="topbar" id="n3_193">
          <div class="topbar-background" id="n3_194">
            <img src={mainLogo} id="n3_195" alt="logo"/>
          </div>
        </div>
        <div class="group" id="n3_402">
          <div class="left top rectangle" id="n3_401"></div>
          <div class="left top text" id="n3_400">참가자 정보 수정</div>
        </div>

        <div id="n32_1">
          <div class="left top rectangle" id="n31_503">
            <div className="firstGroupBox" id="n31_504">
              <div class="1" id="n3_403">
                <div class="1조" id="n3_410" onClick={groupClick}>1조</div>
              </div>
              {buttonShowList[2] &&
                <div class="2" id="n3_403"><div class="2조" id="n3_410" onClick={groupClick}>2조</div></div>
              }
              {buttonShowList[3] &&
                <div class="3" id="n3_403"><div class="3조" id="n3_410" onClick={groupClick}>3조</div></div>
              }
              {buttonShowList[4] &&
                <div class="4" id="n3_403"><div class="4조" id="n3_410" onClick={groupClick}>4조</div></div>
              }
              {buttonShowList[5] &&
                <div class="5" id="n3_403"><div class="5조" id="n3_410" onClick={groupClick}>5조</div></div>
              }
              {buttonShowList[6] &&
                <div class="6" id="n3_403"><div class="6조" id="n3_410" onClick={groupClick}>6조</div></div>
              }                
            </div>
            <div className="secondGroupBox" id="n31_505">
              {buttonShowList[7] &&
                <div class="7" id="n3_403"><div class="7조" id="n3_410" onClick={groupClick}>7조</div></div>
              }
              {buttonShowList[8] &&
                <div class="8" id="n3_403"><div class="8조" id="n3_410" onClick={groupClick}>8조</div></div>
              }
              {buttonShowList[9] &&
                <div class="9" id="n3_403"><div class="9조" id="n3_410" onClick={groupClick}>9조</div></div>
              }
              {buttonShowList[10] &&
                <div class="10" id="n3_403"><div class="10조" id="n3_410" onClick={groupClick}>10조</div></div>
              }
              {buttonShowList[11] &&
                <div class="11" id="n3_403"><div class="11조" id="n3_410" onClick={groupClick}>11조</div></div>
              }  
              {buttonShowList[12] &&
                <div class="12" id="n3_403"><div class="12조" id="n3_410" onClick={groupClick}>12조</div></div>
              }      
            </div>
            <div class="plus-button" id="n3_100" onClick={plusGrounpNum}>
                <div class="left top text" id="n3_101">+</div>
            </div>
            <div class="minus-button" id="n3_102" onClick={minusGroupNum}>
                <div class="left top text" id="n3_103">-</div>
            </div>
          </div>

          <div class="left top rectangle" id="n3_431">
            <div id="n3_1">
              <div class="left top text" id="n3_445">{selectedGroup}조</div>
              <div class="left top text" id="n3_463">보유현금</div>
              <div class="left top text" id="n3_464">보유주식</div>
            </div>
            <div class="group" id="n3_491">
              <div class="left top rectangle" id="n3_492">
                <input id="tot" onChange={onChangeValue}/>
              </div>
            </div>
            <div class="group" id="n3_465">
              <div class="left top rectangle" id="n3_466"></div>
              <div class="left top rectangle" id="n3_467"></div>
              <div class="left top rectangle" id="n3_468"></div>
              <div class="left top rectangle" id="n3_469"></div>
              <div class="left top rectangle" id="n3_470"></div>
            </div>
            <div class="group" id="n3_476">
              <div class="left top text" id="n3_477">생명</div>
              <div class="left top text" id="n3_478">전자</div>
              <div class="left top text" id="n3_479">건축</div>
              <div class="left top text" id="n3_480">식품</div>
              <div class="left top text" id="n3_481">방송</div>
            </div>
            <div class="group" id="n3_485">
              <div class="left top rectangle" id="n3_486">
                <input id="bio" onChange={onChangeValue}/>
              </div>
              <div class="left top rectangle" id="n3_498">
                <input id="electronics" onChange={onChangeValue}/>
              </div>
              <div class="left top rectangle" id="n3_495">
                <input id="construction" onChange={onChangeValue}/>
              </div>
              <div class="left top rectangle" id="n3_489">
                <input id="food" onChange={onChangeValue}/>
              </div>
              <div class="left top rectangle" id="n3_489">
                <input id="broadcast" onChange={onChangeValue}/>
              </div>
            </div>
          </div>
        </div>

        <div class="group" id="n3_462">
          <div class="left top rectangle" id="n3_448" onClick={changeEnd}>
            <div class="left top text" id="n3_450">수정완료</div>
          </div>
          <div class="left top rectangle" id="n3_447" onClick={goMainPage}>
            <div class="left top text" id="n3_449">메인화면</div>
          </div>
        </div>
      </div>
    </div>
  )
}
