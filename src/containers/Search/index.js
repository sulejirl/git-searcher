import React from 'react';
import TextField from '../../components/Input';
import Suggestion from '../../components/Suggestion';
import {useInputChange} from '../../utils/Hooks/useInputChange';
import {useDispatch, useSelector} from 'react-redux'
import {debounce} from 'lodash'
import {SEARCH_TERM_CHANGED,ON_CLICK_SUGGESTION,SCROLL_COUNT_CHANGED,REPO_SCROLL_COUNT_CHANGED} from './constants'
import CardBoard from "../../components/CardBoard";
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
export const Search = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.Search.searchTerm);
  const userNames = useSelector(state => state.Search.userNames);
  const repositories = useSelector(state => state.Search.repositories);
  const selectedUser = useSelector(state => state.Search.selectedUser);
  const userSearched = useSelector(state => state.Search.userSearched);
  const repoFound = useSelector(state => state.Search.repoFound);
  const scrollCount = useSelector(state => state.Search.page);
  const repoScrollCount = useSelector(state => state.Search.repoPage);

  const handleInputChange = debounce((value) => {
    dispatch({type: SEARCH_TERM_CHANGED, data: value})
  }, 1000)

  const handleScroll = (e) => {
    const element = e.target;
    let currentHeight = Math.trunc(element.scrollTop / (element.clientHeight+40))
    if (scrollCount !== currentHeight && (scrollCount < currentHeight)) {
      dispatch({type: SCROLL_COUNT_CHANGED, page: currentHeight,data:searchTerm})
    }
  }
  const handleRepoScroll = (e) => {
    const element = e.target;
    let currentHeight = Math.trunc(element.scrollTop / (element.clientHeight+40))
    if (repoScrollCount !== currentHeight && (repoScrollCount < currentHeight)) {
      dispatch({type: REPO_SCROLL_COUNT_CHANGED, page: currentHeight,data:selectedUser})
    }
  }
  return (
    <React.Fragment>
      <h1>Git Repository Searcher</h1>
      <TextField name='searchTerm' label={'Type to Search for Users'} variant={'outlined'}onChange={(e) => handleInputChange(e.target.value)}/>
      {userNames.length>0 && (
        <React.Fragment>
          <h3>Suggested Users</h3>
          <div style={{overflowY:'scroll',maxHeight:'400px',width:'30%'}} onScroll={handleScroll}>
            {userNames && userNames.map((item, index) => {
              return (
                <Suggestion onClick={()=>{dispatch({type: ON_CLICK_SUGGESTION, data: item})}}>
                  {item}
                </Suggestion>
              )
            })}
          </div>
        </React.Fragment>
      )}
      {userSearched  && userNames.length === 0 && (
        <React.Fragment>
          <h3>No User Found</h3>
        </React.Fragment>
      )}
      {repositories.length > 0 && (
        <React.Fragment>
          <h3>Repositories of {selectedUser}</h3>
          <div style={{overflowY:'scroll',maxHeight:'400px',width:'30%'}} onScroll={handleRepoScroll}>
            {repositories.map((item,index)=>{
              return(
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <CardBoard onClick={()=>{window.open(item.link,'_blank')}}>
                    <div>
                      {item.name}
                    </div>
                    <div>
                      <VisibilityIcon/>
                      {item.watchers}
                      <StarIcon/>
                      {item.stars}
                    </div>

                  </CardBoard>
                </div>
              )
            })}
          </div>
        </React.Fragment>
      )}
      {repositories && repoFound &&repositories.length === 0 && (
        <React.Fragment>
          <h3>No Repositories found for {selectedUser}</h3>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

