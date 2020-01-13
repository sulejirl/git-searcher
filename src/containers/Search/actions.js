import {
  USER_NAMES_FOUND,
  ON_CLICK_SUGGESTION,
  ON_CLICK_SUGGESTION_SUCCESSS,
  NEXT_PAGE,
  NEXT_REPO_PAGE,
  ONE_USER_NAME_FOUND,
  SEARCH_TERM_RESET
} from './constants';

export function userNamesFound(data) {
  return {
    type:USER_NAMES_FOUND,
    data
  }
}
export function searchTermReset() {
  return {
    type:SEARCH_TERM_RESET,
  }
}
export function oneUserNameFound(data) {
  return {
    type:ON_CLICK_SUGGESTION,
    data
  }
}
export function onClickSuggestion(data) {
  return {
    type:ON_CLICK_SUGGESTION,
    data
  }
}
export function onClickSuggestionSuccess(data) {
  return {
    type:ON_CLICK_SUGGESTION_SUCCESSS,
    data
  }
}
export function nextPage(data) {
  return {
    type:NEXT_PAGE,
    data
  }
}
export function nextRepoPage(data) {
  return {
    type:NEXT_REPO_PAGE,
    data
  }
}
