import React from "react";

import * as actions from '../../../../core/edit_profile/action/UserAction' ;
import {UserActionTypes} from '../../../../core/edit_profile/action/UserActionType' ;

describe('actions', () => {
  it('should send firstname to store', () => {
    const n = 'firstname'
    const expectedAction = {
      type: UserActionTypes.SET_FIRSTNAME,
      payload : {firstname : n }
    }
    expect(actions.setFirstname(n)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should send lastname to store', () => {
    const n = 'lastname'
    const expectedAction = {
      type: UserActionTypes.SET_LASTNAME,
      payload : {lastname : n }
    }
    expect(actions.setLastname(n)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should send username to store', () => {
    const n = 'username'
    const expectedAction = {
      type: UserActionTypes.SET_USERNAME,
      payload : {username : n }
    }
    expect(actions.setUsername(n)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should send email to store', () => {
    const n = 'email'
    const expectedAction = {
      type: UserActionTypes.SET_EMAIL,
      payload : {email : n }
    }
    expect(actions.setEmail(n)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should send STATE to store', () => {
    const n = {
      firstname: "firstname" ,
      lastname: "lastname" ,
      avatar: "avatar" ,
      username: "username" ,
      email: "email "
    }
    const expectedAction = {
      type: UserActionTypes.SET_STATE,
      payload : {
        firstname: n.firstname ,
        lastname: n.lastname ,
        avatar: n.avatar ,
        username: n.username ,
        email: n.email 
      }
    }
    expect(actions.setState(n)).toEqual(expectedAction)
  })
})