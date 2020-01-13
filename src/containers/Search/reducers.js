import {
  USER_NAMES_FOUND,
  ON_CLICK_SUGGESTION_SUCCESSS,
  ON_CLICK_SUGGESTION,
  SEARCH_TERM_CHANGED,
  SCROLL_COUNT_CHANGED,
  NEXT_PAGE, REPO_SCROLL_COUNT_CHANGED, NEXT_REPO_PAGE, SEARCH_TERM_RESET
} from './constants'
const initialState = {
  userNames:[],
  repositories: [],
  selectedUser:null,
  userSearched:false,
  repoFound:false,
  page:0,
  repoPage:0,
  searchTerm:'',
}

export default function searchReducer(state = initialState,action) {
  switch (action.type){
    case USER_NAMES_FOUND:
      return{
        ...state,
        userNames: action.data,
        repositories: [],
        userSearched:true,
      }
    case ON_CLICK_SUGGESTION:
      return{
        ...state,
        selectedUser: action.data,
        userSearched: false,
      }
      case ON_CLICK_SUGGESTION_SUCCESSS:
      return{
        ...state,
        repositories: action.data,
        userNames: [],
        userSearched: false,
        repoFound:true,
      }
    case SEARCH_TERM_CHANGED:
      return{
        ...state,
        userSearched: false,
        repoFound:false,
        searchTerm:action.data,
        repoPage: 0,
        page:0,
      }
    case SEARCH_TERM_RESET:
      return{
        ...state,
        userSearched: false,
        repoFound:false,
        searchTerm:'',
        userNames: [],
        repositories: [],
        repoPage: 0,
        page:0,
      }
    case SCROLL_COUNT_CHANGED:
      return{
        ...state,
        page:action.page
      }
    case REPO_SCROLL_COUNT_CHANGED:
      return{
        ...state,
        repoPage:action.page
      }
    case NEXT_PAGE:
      return{
        ...state,
        userNames:[...state.userNames,...action.data],
      }
    case NEXT_REPO_PAGE:
      return{
        ...state,
        repositories:[...state.repositories,...action.data],
      }
    default:
      return state;
  }
}
