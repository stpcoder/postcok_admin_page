import React, { useState, useEffect } from 'react'
import './userInfoSettingPage.css';
import { useNavigate } from 'react-router';
import { logos } from 'utils/GetLogo';
import { userInfoButtonList, defaultAPI } from 'utils/GetConstant';
import axios from 'axios';

const buttonListTemp = {1:true, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false, 10:false, 11:false, 12:false};
const groupStock = {'group1': {'cash':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0}};

export default function UserInfoSettingPage() {
  const [selectedGroup, setSelectedGroup] = useState(1);
  const [serverData, setServerData] = useState();
  const [groupNum, setGroupNum] = useState(1);
  const [buttonList, setButtonList] = useState(buttonListTemp);

  useEffect(() => {
    const getGroupNum = async() => {
      const text = defaultAPI + '/teams';
      var tempData = await axios.get(text);
      tempData = tempData.data;
      for (var i = 1; i <= 12; i++) {
        if (i > tempData.length) buttonListTemp[i] = false;
        else {
          const tempText = 'group' + i;
          groupStock[tempText] = tempData[i - 1];
          buttonListTemp[i] = true;
        }
      }
      userInfoButtonList.forEach((typeName) => {
        const inputTag = document.getElementById(typeName);
        inputTag.type = "number";
        inputTag.value = groupStock['group1'][typeName];
      });
      document.getElementsByClassName(1)[0].style.background = '#94A8D6';
      setServerData(tempData);
      setButtonList(buttonListTemp);
      setGroupNum(tempData.length);
      return tempData.length;
    }
    getGroupNum();
  }, []);

  const navigate = useNavigate();
  const goMainPage = () => {
    for (var i = 1; i <= groupNum; i++) {
      const tempText = 'group' + i;
      groupStock[tempText] = {'cash':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0};
    }
    document.getElementsByClassName(selectedGroup)[0].style.background = 'white';
    document.getElementsByClassName(1)[0].style.background = '#94A8D6';
    navigate('/');
  }

  const changeEnd = () => {
    const postTeams = async (j) => {
      const text = defaultAPI + '/teams/' + j;
      const tempText = 'group' + j;
      try {
        await axios.post(text, {
          "cash": Number(groupStock[tempText]["cash"]),
          "bio": Number(groupStock[tempText]["bio"]),
          "electronics": Number(groupStock[tempText]["electronics"]),
          "construction": Number(groupStock[tempText]["construction"]),
          "food": Number(groupStock[tempText]["food"]),
          "broadcast": Number(groupStock[tempText]["broadcast"])
        });
      } catch {
        alert('????????? ?????? ??? ????????? ??????????????????. ?????? ????????? ?????? ???????????????.');
      }
    }

    const deleteData = async () => {
      const text = defaultAPI + '/teams';
      await axios.delete(text);
    }

    deleteData();
    for (var j = 1; j <= groupNum; j++) {
      try {
        postTeams(j);
      } catch {
        break;
      }
    }
    alert('????????? ?????????????????????.');
  }

  const groupClick = e => {
    const group = Number(e.target.className.replace(/[^0-9]/g,''));
    if(group === selectedGroup) return;
    userInfoButtonList.forEach((typeName) => {
      const inputTag = document.getElementById(typeName);
      inputTag.value = groupStock['group' + group][typeName];
    });

    setSelectedGroup(group);
    document.getElementsByClassName(selectedGroup)[0].style.background = 'white';
    document.getElementsByClassName(group)[0].style.background = '#94A8D6';
  }

  const plusGrounpNum = e => {
    const num = groupNum + 1;
    if (num ===  13) {
      alert('????????? ?????? 12??? ????????? ??? ????????????.');
      return;
    }
    groupStock['group' + num] = {'cash':0, 'bio':0, 'construction':0, 'electronics':0, 'food':0, 'broadcast':0}
    buttonListTemp[num] = true;
    setButtonList(buttonListTemp);
    setGroupNum(num);
  }

  const minusGroupNum = e => {
    const num = groupNum;
    if (num === 1) {
      alert('????????? ?????? 1?????? ?????? ??? ????????????.');
      return;
    }
    setGroupNum(num - 1);
    buttonListTemp[num] = false;
    setButtonList(buttonListTemp);

    if (selectedGroup === num) {
      userInfoButtonList.forEach((typeName) => {
        const inputTag = document.getElementById(typeName);
        inputTag.value = groupStock['group' + (num - 1)][typeName];
      });
      setSelectedGroup(num - 1);
      document.getElementsByClassName(selectedGroup)[0].style.background = 'white';
      document.getElementsByClassName(num - 1)[0].style.background = '#94A8D6';
    }
    const tempText = 'group' + num;
    delete groupStock.tempText;
  }

  const onChangeValue = (e) => {
    const text = 'group' + selectedGroup;
    groupStock[text][e.target.id] = Number(e.target.value);
  }

  return (
    <div>
      <div class="frame" id="n3_192">
        <div class="topbar" id="n3_193">
          <div id="n3_190">
            <img src={logos.mainLogo} id="n3_195" alt="mainlogo"/>
          </div>
        </div>
        <div class="group" id="n3_402">
          <img src={logos.userLogo} id="n3_401" alt="userLogo"/>
          <div id="n3_400">????????? ?????? ??????</div>
        </div>

        <div id="n32_1">
          <div id="n31_503">
            <div id="n31_504">
              <div class="1" id="n3_403"onClick={groupClick}>
                <div class="1???" id="n3_410" >1???</div>
              </div>
              {buttonList[2] &&
                <div class="2" id="n3_403"onClick={groupClick}>
                  <div class="2???" id="n3_410" >2???</div>
                </div>
              }
              {buttonList[3] &&
                <div class="3" id="n3_403"onClick={groupClick}>
                  <div class="3???" id="n3_410" >3???</div>
                </div>
              }
              {buttonList[4] &&
                <div class="4" id="n3_403"onClick={groupClick}>
                  <div class="4???" id="n3_410" >4???</div>
                </div>
              }
              {buttonList[5] &&
                <div class="5" id="n3_403"onClick={groupClick}>
                  <div class="5???" id="n3_410" >5???</div>
                </div>
              }
              {buttonList[6] &&
                <div class="6" id="n3_403"onClick={groupClick}>
                  <div class="6???" id="n3_410" >6???</div>
                </div>
              }                
            </div>
            <div id="n31_505">
              {buttonList[7] &&
                <div class="7" id="n3_403"onClick={groupClick}>
                  <div class="7???" id="n3_410">7???</div>
                </div>
              }
              {buttonList[8] &&
                <div class="8" id="n3_403"onClick={groupClick}>
                  <div class="8???" id="n3_410" >8???</div>
                </div>
              }
              {buttonList[9] &&
                <div class="9" id="n3_403"onClick={groupClick}>
                  <div class="9???" id="n3_410" >9???</div>
                </div>
              }
              {buttonList[10] &&
                <div class="10" id="n3_403"onClick={groupClick}>
                  <div class="10???" id="n3_410" >10???</div>
                </div>
              }
              {buttonList[11] &&
                <div class="11" id="n3_403"onClick={groupClick}>
                  <div class="11???" id="n3_410" >11???</div>
                </div>
              }  
              {buttonList[12] &&
                <div class="12" id="n3_403" onClick={groupClick}>
                  <div class="12???" id="n3_410" >12???</div>
                </div>
              }      
            </div>
            <div id="n3_100" onClick={plusGrounpNum}>
                <div id="n3_101">+</div>
            </div>
            <div id="n3_100" onClick={minusGroupNum}>
                <div id="n3_103">-</div>
            </div>
          </div>

          <div id="n3_431">
            <div id="n3_1">
              <div id="n3_445">{selectedGroup}???</div>
              <div id="n3_463">????????????</div>
              <div id="n3_464">????????????</div>
            </div>
            <div id="n3_491">
              <div id="n3_492">
                <input id="cash" class="userInput" onChange={onChangeValue}/>
              </div>
            </div>
            <div id="n3_465">
              <img src={logos.bioLogo} id="n3_466" alt="bioLogo"/>
              <img src={logos.broadLogo} id="n3_467" alt="bioLogo"/>
              <img src={logos.conLogo} id="n3_467" alt="bioLogo"/>
              <img src={logos.elecLogo} id="n3_467" alt="bioLogo"/>
              <img src={logos.foodLogo} id="n3_467" alt="bioLogo"/>
            </div>
            <div id="n3_476">
              <div id="n3_477">??????</div>
              <div id="n3_478">??????</div>
              <div id="n3_478">??????</div>
              <div id="n3_478">??????</div>
              <div id="n3_478">??????</div>
            </div>
            <div id="n3_485">
              <div id="n3_492">
                <input id="bio" class="userInput" onChange={onChangeValue}/>
              </div>
              <div id="n3_493">
                <input id="electronics" class="userInput" onChange={onChangeValue}/>
              </div>
              <div id="n3_493">
                <input id="construction" class="userInput" onChange={onChangeValue}/>
              </div>
              <div id="n3_493">
                <input id="food" class="userInput" onChange={onChangeValue}/>
              </div>
              <div id="n3_493">
                <input id="broadcast" class="userInput" onChange={onChangeValue}/>
              </div>
            </div>
          </div>
        </div>

        <div id="n3_462">
          <div id="n3_448" onClick={changeEnd}>
            <div id="n3_450">????????????</div>
          </div>
          <div id="n3_447" onClick={goMainPage}>
            <div id="n3_449">????????????</div>
          </div>
        </div>
      </div>
    </div>
  )
}